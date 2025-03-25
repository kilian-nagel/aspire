"use client";
import {HabitCard} from "@/components/habits/habit-card";
import {habitStore} from "@/store/habitsStore";
import {Button} from "@/components/ui/button";
import {HabitForm} from "@/components/habits/habit-form";
import {Tables} from "@/models/database.types";
import {Habit} from "@/models/habits/habits.types";
import {filterHabitsByCompletion} from "@/models/habits/habits.utils";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog";
import {useState} from "react";

export const HabitsCards = ({
    habits_type,
    no_complete_action
}: {
    habits_type: Tables<"habitCategory">[];
    no_complete_action?: boolean;
}) => {
    const {habits} = habitStore();
    const habits_filtered_by_completion = filterHabitsByCompletion(habits);
    console.log(habits_filtered_by_completion.completed);
    const habit_to_edit = habits_filtered_by_completion.completed[0];
    console.log(habit_to_edit);

    if (!habits || habits.length === 0) {
        return <p>No habits...</p>;
    }

    const edit_habit = (habit: Habit) => {
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
                {habits_filtered_by_completion.uncompleted.map(habit => (
                    <HabitCard
                        edit_habit_function={() => edit_habit(habit)}
                        key={habit.id}
                        {...habit}
                    />
                ))}
                {habits_filtered_by_completion.completed.map(habit => (
                    <HabitCard
                        edit_habit_function={() => edit_habit(habit)}
                        key={habit.id}
                        completed={true}
                        {...habit}
                    />
                ))}
            </div>

            {JSON.stringify(habit_to_edit)}

            {/* Controlled Modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">New Habit</Button>
                </DialogTrigger>
                <DialogContent className="min-w-[1200px]">
                    <DialogTitle></DialogTitle>
                    <HabitForm habits_type={habits_type} habit={habit_to_edit} />
                </DialogContent>
            </Dialog>
        </>
    );
};

