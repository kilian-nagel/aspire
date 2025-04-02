import {Tables} from "@/models/database.types";
import {Habit} from "@/models/habits/habits.types";
import {differenceInDays, formatISO, isAfter, isEqual, startOfDay, getDay, subDays, format, getMonth, getYear, getDaysInMonth, getDate} from 'date-fns';

type HabitCompletion = Tables<'habitCompletion'>;

export interface HabitInfo extends Omit<Tables<'habitCompletion'>, 'performance' | 'habit_id'> {
    name: string,
    category: string,
    days_has_to_be_completed: number[]

    streak: number,
    max_completions: number,
    total_completions: number,
    completion_rate: number,
    monthlyData: {day: number, completed: number}[]

    lastWeek: Boolean[],
    last_completion_date: Date,
}

interface habitsByCompletion {
    completed: Habit[],
    uncompleted: Habit[]
}

export const dateEqualByDayPrecision = (date1: Date, date2: Date) => {
    return Boolean(date1 &&
        date1.getDay() === date2.getDay() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear());
}

export const filterHabitsByCompletion = (data: Habit[] | null): habitsByCompletion => {
    if (!data) return {completed: [], uncompleted: []};

    const now = (new Date());
    const today = (now.getDay() + 6) % 7;
    let filtered_habits = data.filter(habit => {
        const habit_days = habit?.frequency ? habit.frequency.map(freq => freq.day) : [];
        return habit_days.includes(today);
    });

    let habits: {completed: Habit[], uncompleted: Habit[]} = {completed: [], uncompleted: []}

    // On filtre les habitudes en fonction de si elles ont été complétées.
    filtered_habits.map(habit => {
        // On récupère la date de complétion de l'habitude la plus récente.
        let last_habit_completion = habit?.completions?.length > 0 ? new Date(habit.completions[habit?.completions?.length - 1]?.created_at) : null;

        // Si la dernière complétion est aujourd'hui alors cela signifie que l'habitude a été effectué aujourd'hui
        // On ajoute l'habitude aux habitudes complétées pour la journée.
        if (last_habit_completion && dateEqualByDayPrecision(last_habit_completion, now)) {
            habits.completed.push(habit);
        } else {
            habits.uncompleted.push(habit);
        }
    });

    return habits;
};

export class HabitCompletionService {
    private today: Date;
    private completionsByHabit: Record<number, Set<string>> = {};

    constructor(
        private habits: Habit[],
        private habitsCompletions: HabitCompletion[]
    ) {
        this.today = new Date();
        this.groupCompletionsByHabit();
    }

    // Pour chaque id d'habitude on va récupérer les complétions associées (sous forme set avec la date de complétion en string)
    private groupCompletionsByHabit(): void {
        for (const completion of this.habitsCompletions) {
            const habitId = completion.habit_id;
            const completionDateStr = formatISO(startOfDay(new Date(completion.created_at)));

            if (!this.completionsByHabit[habitId]) {
                this.completionsByHabit[habitId] = new Set();
            }
            this.completionsByHabit[habitId].add(completionDateStr);
        }
    }

    public getHabitsCompletionData(): Record<string, HabitInfo> {
        const habitsWithInfos: Record<string, HabitInfo> = this.initializeHabits();
        this.computeStreaksAndLastWeek(habitsWithInfos);
        this.calculateCompletionRates(habitsWithInfos);
        this.calculateMonthlyData(habitsWithInfos);
        this.assignHabitDetails(habitsWithInfos);
        return habitsWithInfos;
    }

    private initializeHabits(): Record<string, HabitInfo> {
        return this.habits.reduce((acc, habit) => {
            acc[habit.id] = HabitCompletionService.initializeHabitInfo(new Date(), habit);
            return acc;
        }, {} as Record<string, HabitInfo>);
    }

    // Initialise les infos d'une habitude
    private static initializeHabitInfo(completionDate: Date, habit: Habit): HabitInfo {
        return {
            id: habit.id,
            lastWeek: Array(7).fill(false),
            streak: 0,
            total_completions: 0,
            max_completions: 0,
            last_completion_date: completionDate,
            completion_rate: 0,
            name: habit.name,
            category: habit.categoryObject.name,
            created_at: habit.created_at,
            days_has_to_be_completed: [],
            monthlyData: []
        };
    }

    private computeStreaksAndLastWeek(habitsWithInfos: Record<string, HabitInfo>): void {
        // On calcule la streak et l'activité durant la semaine liée à une habitude
        for (const habit of this.habits) {
            const habitId = habit.id;
            const habitInfo = habitsWithInfos[habitId];

            if (!habitInfo) continue;

            const completionDates = this.completionsByHabit[habitId] || new Set();
            let streak = 0;
            let lastCompletionDate: Date | null = null;
            let lastWeek = Array(7).fill(false);
            let habit_creation_date = formatISO(startOfDay(habit.created_at));
            let habit_existed = false;

            let currentStreak = 0; // Track the longest streak
            let hasMissedDay = false;

            for (let i = 30; i >= 0; i--) { // Traversing from oldest to newest
                const date = startOfDay(subDays(this.today, i));
                const dateStr = formatISO(date);

                if (!habit_existed && (isAfter(dateStr, habit_creation_date) || isEqual(dateStr, habit_creation_date))) {
                    habit_existed = true;
                }

                const habit_should_have_been_done = habit.frequency?.some(freq => freq.day === getDay(date));

                if (habit_existed && habit_should_have_been_done) {
                    habitInfo.max_completions++;
                }

                if (completionDates.has(dateStr)) {
                    currentStreak++; // Increase streak if completed
                    lastCompletionDate = date;
                    habitInfo.total_completions++;
                    hasMissedDay = false; // Reset miss flag
                } else if (habit_should_have_been_done) {
                    hasMissedDay = true;
                    currentStreak = 0; // Reset streak if a required completion is missing
                }

                if (i < 7) {
                    lastWeek[i] = completionDates.has(dateStr);
                }
            }

            habitInfo.streak = currentStreak;
            habitInfo.last_completion_date = lastCompletionDate || new Date();
            habitInfo.lastWeek = lastWeek;
        }
    }

    private calculateCompletionRates(habitsWithInfos: Record<string, HabitInfo>): void {
        for (const habit of this.habits) {
            const habitInfo = habitsWithInfos[habit.id];
            if (!habitInfo) continue;

            habitInfo.name = habit.name;

            habitInfo.completion_rate = Math.round((habitInfo.total_completions / habitInfo.max_completions) * 100) / 100;

        }
    }

    private calculateMonthlyData(habitsWithInfos: Record<string, HabitInfo>): void {
        const currentMonth = getMonth(this.today);
        const currentYear = getYear(this.today);
        const daysInMonth = getDaysInMonth(this.today);

        for (const habitId in habitsWithInfos) {
            const habitInfo = habitsWithInfos[habitId];

            // On initalisee un tableau qui contiendra des objects indiquant si l'habitude a été complétée lors d'un certain jour du mois
            const monthlyData: {day: number; completed: number}[] = Array.from({length: daysInMonth}, (_, i) => ({
                day: (i + 1),
                completed: 0
            }));

            // S'il y a eu complétion de l'habitude on met l'attribut completed du jour correspondant à 1
            for (const completion of this.habitsCompletions) {
                const completionDate = new Date(completion.created_at);
                if (getMonth(completionDate) === currentMonth && getYear(completionDate) === currentYear) {
                    monthlyData[getDate(completionDate) - 1].completed++;
                }
            }

            habitInfo.monthlyData = monthlyData;
        }
    }

    private assignHabitDetails(habitsWithInfos: Record<string, HabitInfo>): void {
        // Pour chaque habitude on doit récupérer les jours durant lesquelles l'habitude devait être effectuée.
        for (const habit of this.habits) {
            const habitInfo = habitsWithInfos[habit.id];
            if (!habitInfo) continue;

            habitInfo.days_has_to_be_completed = habit?.frequency ? habit.frequency.map(freq => freq.day) : [];
        }
    }
}


// Récupère les données concernant les 7 derniers jours de la semaine
export const getLast7Days = () => {
    return Array.from({length: 7}, (_, i) => {
        const date = subDays(new Date(), 6 - i)

        const dayIndex = (getDay(date) + 6) % 7;
        // On récupère l'index du jour en fonction d'ou il se trouve dans la semaine (0 = Lundi, 1 = Mardi etc..)

        return {
            date,
            formattedDate: format(date, "EEE"),
            fullDate: format(date, "MMM d"),
            index: dayIndex
        }
    })
}

// Récupère les habitudes qui doivent être affichées en fonction du jour sélectionnée
export const get_habits_for_selected_day = (habits: HabitInfo[], selectedDay: number, date: Date) => {
    const habits_selected_day = habits.filter(h => {
        // Il faut que ce soit un jour l'habitude devait être effectuée, et que l'habitude existait lors de la date sélectionnée.


        // On compare les dates sans prendre en compte l'heure
        let date_formatted = startOfDay(date);
        let date_created_at_formatted = startOfDay(h.created_at);

        return h.days_has_to_be_completed.includes(selectedDay) &&
            (isEqual(date_formatted, date_created_at_formatted) || isAfter(date_formatted, date_created_at_formatted));
    });
    return habits_selected_day;
}

// Arrondir à 2 décimales près
export const round = (n: number) => {
    return Math.round(n * 100) / 100
}
