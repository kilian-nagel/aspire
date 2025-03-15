"use client"
import {Calendar} from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {HabitInfo, get_habits_for_selected_day} from "@/models/habits/habits.utils";

interface Last7DaysProps {
    last7Days: {date: Date; formattedDate: string; fullDate: string; index: number}[];
    selectedDay: number;
    setSelectedDay: (index: number) => void;
    habits: HabitInfo[];
}

const Last7Days = ({last7Days, selectedDay, setSelectedDay, habits}: Last7DaysProps) => {
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
                    {last7Days.map((day, index) => (
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
                                    {get_habits_for_selected_day(habits, last7Days[index].index, last7Days[index].date).filter((h) => h.lastWeek[index]).length}/
                                    {get_habits_for_selected_day(habits, last7Days[index].index, last7Days[index].date).length}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Last7Days;

