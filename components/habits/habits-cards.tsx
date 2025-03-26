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
    const [habit_to_edit, set_habit_to_edit] = useState<Habit | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!habits || habits.length === 0) {
        return <p>No habits...</p>;
    }

    const edit_habit = (habit: Habit) => {
        set_habit_to_edit(habit);
        setIsDialogOpen(true); // Directly open the modal
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
                {habits_filtered_by_completion.uncompleted.map(habit => (
                    <HabitCard
                        edit_habit_function={() => edit_habit(habit)}
                        key={habit.id}
                        no_complete_action={no_complete_action}
                        {...habit}
                    />
                ))}
                {habits_filtered_by_completion.completed.map(habit => (
                    <HabitCard
                        edit_habit_function={() => edit_habit(habit)}
                        key={habit.id}
                        completed={true}
                        no_complete_action={no_complete_action}
                        {...habit}
                    />
                ))}
            </div>

            {/* Controlled Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="min-w-[1200px]">
                    <DialogTitle>Edit Habit</DialogTitle>
                    <HabitForm habits_type={habits_type} habit={habit_to_edit} />
                </DialogContent>
            </Dialog>
        </>
    );
};

