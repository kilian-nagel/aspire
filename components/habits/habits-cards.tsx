"use client";
import {HabitCard} from "@/components/habits/habit-card";
import {habitStore} from "@/store/habitsStore";

export const HabitsCards = () => {
    const habits = habitStore((store) => store.habits);

    if (!habits) {
        return (<p>No habits...</p>)
    }
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
            {habits.map(habit => <HabitCard key={habit.id} {...habit} />)}
        </div>
    )
}
