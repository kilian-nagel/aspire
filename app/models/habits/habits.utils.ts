import {Tables} from "@/models/database.types";
import {Habit} from "@/models/habits/habits.types";
import {differenceInDays, differenceInSeconds, subDays, subMonths, getMonth, getYear, getDaysInMonth, getDate} from 'date-fns';

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

type HabitCompletion = Tables<'habitCompletion'>;

export const getHabitsCompletionData = (habits: Habit[], habits_completions: HabitCompletion[]): Record<string, HabitInfo> => {
    const habitsWithInfos: Record<string, HabitInfo> = {};
    const today = new Date();
    const lastMonth = subMonths(today, 1);

    console.log(habits);

    for (const completion of habits_completions) {
        const habitId = completion.habit_id;
        const completionDate = new Date(completion.created_at);

        if (!habitsWithInfos[habitId]) {
            habitsWithInfos[habitId] = initializeHabitInfo(completionDate, habitId);
        }

        updateHabitInfo(habitsWithInfos[habitId], completionDate, today);
    }

    calculateCompletionRates(habits, habitsWithInfos, lastMonth, today);
    calculateMonthlyData(habitsWithInfos, habits_completions, today);
    getDaysHabitHasToBeCompleted(habits, habitsWithInfos);


    return habitsWithInfos;
};

const initializeHabitInfo = (completionDate: Date, habitId: number): HabitInfo => ({
    id: habitId,
    lastWeek: Array(7).fill(false),
    streak: 0,
    total_completions: 0,
    last_completion_date: completionDate,
    name: ""
});

const updateHabitInfo = (habitInfo: HabitInfo, completionDate: Date, today: Date): void => {
    habitInfo.total_completions++;

    if (differenceInDays(habitInfo.last_completion_date, completionDate) > 1) {
        habitInfo.streak = 1;
    } else {
        habitInfo.streak++;
    }

    habitInfo.last_completion_date = completionDate;

    updateLastWeekCompletion(habitInfo, completionDate, today);
};

const updateLastWeekCompletion = (habitInfo: HabitInfo, completionDate: Date, today: Date): void => {
    if (differenceInDays(today, completionDate) < 7) {
        const daysAgo = Math.floor(differenceInSeconds(today, completionDate) / 86400);
        habitInfo.lastWeek[6 - daysAgo] = true;
    }
};

const calculateCompletionRates = (
    habits: Habit[],
    habitsWithInfos: Record<string, HabitInfo>,
    lastMonth: Date,
    today: Date
): void => {
    const daysSinceLastMonth = differenceInDays(today, lastMonth);

    for (const habit of habits) {
        const habitInfo = habitsWithInfos[habit.id];
        if (!habitInfo) continue;

        habitInfo.name = habit.name;
        habitInfo.completion_rate = Math.round((habitInfo.total_completions / daysSinceLastMonth) * 100) / 100;
    }
};

const calculateMonthlyData = (
    habitsWithInfos: Record<string, HabitInfo>,
    habits_completions: HabitCompletion[],
    today: Date
): void => {
    const currentMonth = getMonth(today);
    const currentYear = getYear(today);
    const daysInMonth = getDaysInMonth(today);

    for (const habitId in habitsWithInfos) {
        const habitInfo = habitsWithInfos[habitId];
        const monthlyData: {day: string; completed: number}[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
            monthlyData.push({day: day.toString(), completed: 0});
        }

        for (const completion of habits_completions) {
            const completionDate = new Date(completion.created_at);
            if (getMonth(completionDate) === currentMonth && getYear(completionDate) === currentYear) {
                const day = getDate(completionDate) - 1;
                monthlyData[day].completed++;
            }
        }

        habitInfo.monthlyData = monthlyData;
    }
};

const getDaysHabitHasToBeCompleted = (
    habits: Habit[],
    habitsWithInfos: Record<string, HabitInfo>,
): void => {

    for (const habit of habits) {
        const habitInfo = habitsWithInfos[habit.id];
        if (!habitInfo) continue;

        const days_habit_has_to_be_completed = habit?.frequency?.map(freq => freq.day);
        habitInfo.days_has_to_be_completed = days_habit_has_to_be_completed;
    }
};
