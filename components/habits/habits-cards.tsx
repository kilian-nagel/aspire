"use client";
import {HabitCard} from "@/components/habits/habit-card";
import {habitStore} from "@/store/habitsStore";
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
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ClipboardList} from "lucide-react";

export const HabitsCards = ({
    habits_type,
    no_complete_action
}: {
    habits_type: Tables<"habitCategory">[];
    no_complete_action?: boolean;
}) => {
    const habits = habitStore((state) => state.habits);
    const habits_filtered_by_completion = filterHabitsByCompletion(habits);
    const [habit_to_edit, set_habit_to_edit] = useState<Habit | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!habits || habits.length === 0) {
        return <Card className="w-full mx-auto border-dashed">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                <CardTitle className="text-xl">No habits yet</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                    <ClipboardList className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardDescription className="text-center max-w-md">
                    You haven&apos;t created any habits to track. Start building better routines by adding your first habit.
                </CardDescription>
            </CardContent>
        </Card>;
    }

    const edit_habit = (habit: Habit) => {
        set_habit_to_edit(habit);
        setIsDialogOpen(true); // Directly open the modal
    };

    const closeModal = () => {
        set_habit_to_edit(null);
        setIsDialogOpen(false);

        setTimeout(() => {
            document.querySelectorAll("*").forEach(el => {
                if (el instanceof HTMLElement) {
                    if (window.getComputedStyle(el).pointerEvents !== "auto") {
                        el.style.pointerEvents = "auto"; // ✅ Safe because we checked
                    }
                }
            });
        }, 400);
    };

    return (
        <>
            { /* Si on affiche toutes les habitudes */ }

            { /* Si on affiche les habitudes de la journée */ }
            { no_complete_action ? 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
                    {
                        habits.map(habit => (
                            <HabitCard
                                edit_habit_function={() => edit_habit(habit)}
                                key={habit.id}
                                no_complete_action={no_complete_action}
                                {...habit}
                            />
                        ))
                    }
                </div>
                    : 
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
            }

            {/* Controlled Modal */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeModal()}>
                <DialogContent className="min-w-[1200px]">
                    <DialogTitle>Edit Habit</DialogTitle>
                    <HabitForm habits_type={habits_type} habit={habit_to_edit} />
                </DialogContent>
            </Dialog>
        </>
    );
};

