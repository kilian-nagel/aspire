import {Tables} from "@/models/database.types";
import {Habit} from "@/models/habits/habits.types";
import {differenceInDays, formatISO, isAfter, isEqual, startOfDay, getDay, subDays, subMonths, getMonth, getYear, getDaysInMonth, getDate} from 'date-fns';

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

            // On initialise les données nécessaires.
            const completionDates = this.completionsByHabit[habitId] || new Set();
            let streak = 0;
            let lastCompletionDate: Date | null = null;
            let lastWeek = Array(7).fill(false);
            let habit_creation_date = formatISO(startOfDay(habit.created_at));
            let habit_existed = true;

            // On traverse chaque jour du mois pour calculer la streak de l'habitude
            for (let i = 0; i <= 30; i++) {
                // S'il n'y a aucune complétion alors le reste est inutile
                if (completionDates.size === 0) break;

                // On récupère la string du jour  
                const date = startOfDay(subDays(this.today, i));
                const dateStr = formatISO(date);

                if (habit_existed && !isAfter(dateStr, habit.created_at) && !isEqual(dateStr, habit_creation_date)) habit_existed = false;

                const habit_should_have_been_done = habit.frequency?.some(freq => {
                    return freq.day === getDay(date)
                }) && habit_existed;

                if (habit_existed && habit_should_have_been_done) {
                    habitInfo.max_completions++;
                }

                // Si la date du jour est existante parmi les dates de complétions de l'habitude
                if (completionDates.has(dateStr)) {
                    // Si seulement 1 jour écoulé depuis la dernière complétion on augmente la streak sinon on la set à 1.
                    streak = lastCompletionDate && differenceInDays(lastCompletionDate, date) === 1 ? streak + 1 : 1;
                    lastCompletionDate = date;
                    habitInfo.total_completions++;
                } else if (habit_should_have_been_done) {
                    // Si la date du jour n'est pas existant parmi les dates de complétions et qu'elle devait être complétée ce jour là alors on reset la streak.
                    streak = 0;
                    continue;
                }

                // On set l'activité de l'habitude
                if (i < 7) {
                    lastWeek[6 - i] = completionDates.has(dateStr);
                }
            }

            habitInfo.streak = streak;
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
            const monthlyData: {day: number; completed: number}[] = Array.from({length: daysInMonth}, (_, i) => ({
                day: (i + 1),
                completed: 0
            }));

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
        for (const habit of this.habits) {
            const habitInfo = habitsWithInfos[habit.id];
            if (!habitInfo) continue;

            habitInfo.days_has_to_be_completed = habit?.frequency ? habit.frequency.map(freq => freq.day) : [];
        }
    }
}

