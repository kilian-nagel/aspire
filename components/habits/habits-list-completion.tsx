"use client";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CheckCircle2, XCircle} from "lucide-react";
import {HabitInfo} from "@/models/habits/habits.utils";

interface HabitListProps {
    habits: HabitInfo[];
    selectedDay: number;
    selectedHabit: HabitInfo;
    setSelectedHabit: (habit: HabitInfo) => void;
}

const HabitList = ({habits, selectedDay, selectedHabit, setSelectedHabit}: HabitListProps) => {
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
                    {habits.map((habit) => (
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
                                    {habit.lastWeek[selectedDay] ? (
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    ) : (
                                        <XCircle className="h-6 w-6 text-red-500" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default HabitList;

