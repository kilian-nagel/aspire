"use client";
import {HabitCard} from "@/components/habits/habit-card";
import {habitStore} from "@/store/habitsStore";
import {Button} from "@/components/ui/button";
import {HabitForm} from "@/components/habits/habit-form";
import {Tables} from "@/models/database.types";
import {filterHabitsByCompletion} from "@/models/habits/habits.utils";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"
import {useRef, useState} from "react";

let Habit: Tables<'habits'>;

export const HabitsCards = ({habits_type}) => {
    const dialog_btn = useRef(null);
    const habits = habitStore((store) => store.habits);
    const habits_filtered_by_completion = filterHabitsByCompletion(habits);
    const [habit_to_edit, set_habit_to_edit] = useState<null | typeof Habit>(null);

    if (!habits) {
        return (<p>No habits...</p>)
    }

    const edit_habit = (habit: typeof Habit) => {
        if (dialog_btn.current) {
            set_habit_to_edit(habit);
            dialog_btn.current.click();
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
                {habits_filtered_by_completion.uncompleted.map(habit => <HabitCard edit_habit_function={() => edit_habit(habit)} key={habit.id} {...habit} />)}
                {habits_filtered_by_completion.completed.map(habit => <HabitCard edit_habit_function={() => edit_habit(habit)} key={habit.id} completed={true} {...habit} />)}
            </div>

            {/* Edit habit button */}
            <Dialog >
                <DialogTrigger asChild className="absolute hidden">
                    <Button ref={dialog_btn} variant="outline">New Habit</Button>
                </DialogTrigger>
                <DialogContent className="min-w-[1200px]">
                    <DialogTitle></DialogTitle>
                    <HabitForm habits_type={habits_type} habit={habit_to_edit} />
                </DialogContent>
            </Dialog>
        </>
    )
}
