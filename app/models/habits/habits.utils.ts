import {Tables} from "@/models/database.types";
import {Habit} from "@/models/habits/habits.types";

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
