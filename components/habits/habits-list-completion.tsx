"use client";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CheckCircle2, XCircle} from "lucide-react";
import {HabitInfo} from "@/models/habits/habits.types";

interface HabitListProps {
    habits: HabitInfo[];
    selectedDay: number;
    selectedHabit: HabitInfo;
    setSelectedHabit: (habit: HabitInfo) => void;
}

const HabitList = ({habits, selectedDay, selectedHabit, setSelectedHabit}: HabitListProps) => {
    if (!selectedHabit?.lastWeek) return;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Habits for today</CardTitle>
                <CardDescription>
                    {habits.filter((h) => h.lastWeek[selectedDay]).length} of {habits.length} habits completed
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">

                    {habits.map((habit) => {
                        // Create a new reversed array for each habit
                        const reversedLastWeek = [...habit.lastWeek].reverse();

                        return (
                            <div
                                key={habit.id}
                                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedHabit.id === habit.id ? "border-primary" : "border-border"
                                    }`}
                                onClick={() => setSelectedHabit(habit)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">{habit.name}</h3>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={"secondary"}>{habit.category}</Badge>
                                        {reversedLastWeek[selectedDay] ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <XCircle className="h-6 w-6 text-red-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default HabitList;
