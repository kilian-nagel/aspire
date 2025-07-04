"use client"
import {Calendar} from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {get_habits_for_selected_day} from "@/models/habits/habits.utils";
import { HabitInfo } from "@/models/habits/habits.types";

interface Last7DaysProps {
    last7Days: {date: Date; formattedDate: string; fullDate: string; index: number}[];
    selectedDay: number;
    setSelectedDay: (index: number) => void;
    habits: HabitInfo[];
}

const Last7Days = ({last7Days, selectedDay, setSelectedDay, habits}: Last7DaysProps) => {
    const habits_completions = last7Days.map((_, index) => {
        const habits_for_selected_day = get_habits_for_selected_day(habits, last7Days[index].index, last7Days[index].date);

        const total_habits_completed = habits_for_selected_day.filter(h => {
            const reversed_week = [...h.lastWeek].reverse();
            return reversed_week[index];
        });

        return {
            completed: total_habits_completed.length,
            total: habits_for_selected_day.length
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Last 7 Days
                </CardTitle>
                <CardDescription>Click on a day to see your habits</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2">
                    {last7Days.map((day, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedDay === index ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                                    }`}
                                onClick={() => setSelectedDay(index)}
                            >
                                <span className="text-sm font-medium">{day.formattedDate}</span>
                                <span className="text-xs mt-1">{day.fullDate}</span>
                                <div className="mt-2 flex">
                                    <Badge variant="secondary" className="text-xs">
                                        {habits_completions[index].completed}/
                                        {habits_completions[index].total}
                                    </Badge>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default Last7Days;

