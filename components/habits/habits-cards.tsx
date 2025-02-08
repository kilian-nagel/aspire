"use client";
import {HabitCard} from "@/components/habits/habit-card";
import {habitStore} from "@/store/habitsStore";
import {Button} from "@/components/ui/button";
import {HabitForm} from "@/components/habits/habit-form";
import {Tables} from "@/models/database.types";

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
    const [habit_to_edit, set_habit_to_edit] = useState<null | typeof Habit>(null);

    if (!habits) {
        return (<p>No habits...</p>)
    }

    console.log(habits_type);


    const edit_habit = (habit: typeof Habit) => {
        if (dialog_btn.current) {
            set_habit_to_edit(habit);
            dialog_btn.current.click();
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
                {habits.map(habit => <HabitCard is_selected={habit_to_edit?.id} edit_habit_function={edit_habit} key={habit.id} {...habit} />)}
            </div>
            <Dialog >
                <DialogTrigger asChild className="absolute hidden">
                    <Button ref={dialog_btn} variant="outline">New Habit</Button>
                </DialogTrigger>
                <DialogContent className="min-w-[1200px]">
                    <DialogTitle></DialogTitle>
                    <HabitForm habits_type={habits_type} />
                </DialogContent>
            </Dialog>
        </>
    )
}
