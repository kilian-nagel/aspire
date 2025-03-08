"use client"

import {useState} from "react"
import {format, subDays} from "date-fns"
import {Calendar, CheckCheck, CheckCircle2, Circle, TrendingUp, XCircle} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/chart"
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from "recharts";

// Sample data for habits
const habits = [
    {
        id: 1,
        name: "Morning Meditation",
        description: "15 minutes of mindfulness",
        category: "Wellness",
        streak: 5,
        completionRate: 85,
        lastWeek: [true, true, true, false, true, true, false],
        monthlyData: [
            {day: "1", completed: 1},
            {day: "2", completed: 1},
            {day: "3", completed: 1},
            {day: "4", completed: 0},
            {day: "5", completed: 1},
            {day: "6", completed: 1},
            {day: "7", completed: 0},
            {day: "8", completed: 1},
            {day: "9", completed: 1},
            {day: "10", completed: 1},
            {day: "11", completed: 1},
            {day: "12", completed: 0},
            {day: "13", completed: 1},
            {day: "14", completed: 1},
            {day: "15", completed: 1},
            {day: "16", completed: 0},
            {day: "17", completed: 1},
            {day: "18", completed: 1},
            {day: "19", completed: 1},
            {day: "20", completed: 1},
            {day: "21", completed: 0},
            {day: "22", completed: 1},
            {day: "23", completed: 1},
            {day: "24", completed: 1},
            {day: "25", completed: 1},
            {day: "26", completed: 1},
            {day: "27", completed: 0},
            {day: "28", completed: 1},
            {day: "29", completed: 1},
            {day: "30", completed: 1},
        ],
    },
    {
        id: 2,
        name: "Read 30 Pages",
        description: "Daily reading habit",
        category: "Learning",
        streak: 12,
        completionRate: 92,
        lastWeek: [true, true, true, true, true, true, false],
        monthlyData: [
            {day: "1", completed: 1},
            {day: "2", completed: 1},
            {day: "3", completed: 1},
            {day: "4", completed: 1},
            {day: "5", completed: 1},
            {day: "6", completed: 1},
            {day: "7", completed: 0},
            {day: "8", completed: 1},
            {day: "9", completed: 1},
            {day: "10", completed: 1},
            {day: "11", completed: 1},
            {day: "12", completed: 1},
            {day: "13", completed: 1},
            {day: "14", completed: 1},
            {day: "15", completed: 1},
            {day: "16", completed: 1},
            {day: "17", completed: 1},
            {day: "18", completed: 1},
            {day: "19", completed: 1},
            {day: "20", completed: 1},
            {day: "21", completed: 0},
            {day: "22", completed: 1},
            {day: "23", completed: 1},
            {day: "24", completed: 1},
            {day: "25", completed: 1},
            {day: "26", completed: 1},
            {day: "27", completed: 1},
            {day: "28", completed: 1},
            {day: "29", completed: 1},
            {day: "30", completed: 0},
        ],
    },
    {
        id: 3,
        name: "Workout",
        description: "30 minutes exercise",
        category: "Fitness",
        streak: 3,
        completionRate: 70,
        lastWeek: [false, true, false, true, false, true, false],
        monthlyData: [
            {day: "1", completed: 0},
            {day: "2", completed: 1},
            {day: "3", completed: 0},
            {day: "4", completed: 1},
            {day: "5", completed: 0},
            {day: "6", completed: 1},
            {day: "7", completed: 0},
            {day: "8", completed: 1},
            {day: "9", completed: 0},
            {day: "10", completed: 1},
            {day: "11", completed: 0},
            {day: "12", completed: 1},
            {day: "13", completed: 0},
            {day: "14", completed: 1},
            {day: "15", completed: 0},
            {day: "16", completed: 1},
            {day: "17", completed: 0},
            {day: "18", completed: 1},
            {day: "19", completed: 0},
            {day: "20", completed: 1},
            {day: "21", completed: 0},
            {day: "22", completed: 1},
            {day: "23", completed: 0},
            {day: "24", completed: 1},
            {day: "25", completed: 0},
            {day: "26", completed: 1},
            {day: "27", completed: 0},
            {day: "28", completed: 1},
            {day: "29", completed: 0},
            {day: "30", completed: 1},
        ],
    },
    {
        id: 4,
        name: "Drink 8 Glasses of Water",
        description: "Stay hydrated",
        category: "Health",
        streak: 15,
        completionRate: 95,
        lastWeek: [true, true, true, true, true, true, true],
        monthlyData: [
            {day: "1", completed: 1},
            {day: "2", completed: 1},
            {day: "3", completed: 1},
            {day: "4", completed: 1},
            {day: "5", completed: 1},
            {day: "6", completed: 1},
            {day: "7", completed: 1},
            {day: "8", completed: 1},
            {day: "9", completed: 1},
            {day: "10", completed: 1},
            {day: "11", completed: 1},
            {day: "12", completed: 1},
            {day: "13", completed: 1},
            {day: "14", completed: 1},
            {day: "15", completed: 1},
            {day: "16", completed: 0},
            {day: "17", completed: 1},
            {day: "18", completed: 1},
            {day: "19", completed: 1},
            {day: "20", completed: 1},
            {day: "21", completed: 1},
            {day: "22", completed: 1},
            {day: "23", completed: 1},
            {day: "24", completed: 1},
            {day: "25", completed: 1},
            {day: "26", completed: 1},
            {day: "27", completed: 1},
            {day: "28", completed: 1},
            {day: "29", completed: 1},
            {day: "30", completed: 1},
        ],
    },
]

// Generate last 7 days
const getLast7Days = () => {
    return Array.from({length: 7}, (_, i) => {
        const date = subDays(new Date(), 6 - i)
        return {
            date,
            formattedDate: format(date, "EEE"),
            fullDate: format(date, "MMM d"),
        }
    })
}

export default function HabitDashboard() {
    const [selectedDay, setSelectedDay] = useState(6) // Default to today (last day in the array)
    const [selectedHabit, setSelectedHabit] = useState(habits[0])
    const last7Days = getLast7Days()

    const handleDayClick = (index: number) => {
        setSelectedDay(index)
    }

    const handleHabitClick = (habit: (typeof habits)[0]) => {
        setSelectedHabit(habit)
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold">Statistics</h1>

                {/* Last 7 Days View */}
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
                                    onClick={() => handleDayClick(index)}
                                >
                                    <span className="text-sm font-medium">{day.formattedDate}</span>
                                    <span className="text-xs mt-1">{day.fullDate}</span>
                                    <div className="mt-2 flex">
                                        {habits.filter((h) => h.lastWeek[index]).length > 0 && (
                                            <Badge variant="secondary" className="text-xs">
                                                {habits.filter((h) => h.lastWeek[index]).length}/{habits.length}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Habits for Selected Day */}
                <Card>
                    <CardHeader>
                        <CardTitle>Habits for {last7Days[selectedDay].fullDate}</CardTitle>
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
                                    onClick={() => handleHabitClick(habit)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">{habit.name}</h3>
                                            <p className="text-sm text-muted-foreground">{habit.description}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge variant="outline">{habit.category}</Badge>
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

                {/* Habit Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedHabit.name} Stats</CardTitle>
                        <CardDescription>{selectedHabit.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="overview">
                            <TabsList className="mb-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="trends">Trends</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center">
                                                <CheckCheck className="mr-2 h-4 w-4 text-primary" />
                                                <span className="text-2xl font-bold">{selectedHabit.streak} days</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold">{selectedHabit.completionRate}%</span>
                                                </div>
                                                <Progress value={selectedHabit.completionRate} className="h-2" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">Last Week</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between">
                                                {selectedHabit.lastWeek.map((completed, i) => (
                                                    <div key={i} className="flex flex-col items-center">
                                                        <div className="text-xs text-muted-foreground mb-1">
                                                            {format(subDays(new Date(), 6 - i), "E")}
                                                        </div>
                                                        {completed ? (
                                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                        ) : (
                                                            <Circle className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="trends">
                                <div className="h-[300px]">
                                    <ChartContainer
                                        config={{
                                            completed: {
                                                label: "Completed",
                                                color: "hsl(var(--primary))",
                                            },
                                        }}
                                    >
                                        <LineChart
                                            accessibilityLayer
                                            data={selectedHabit.monthlyData}
                                            margin={{top: 5, right: 10, left: 0, bottom: 0}}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickFormatter={(value) => value} />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => (value === 0 ? "No" : "Yes")}
                                                domain={[0, 1]}
                                                ticks={[0, 1]}
                                            />
                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                        labelFormatter={(value) => `Day ${value}`}
                                                        valueFormatter={(value) => (value === 0 ? "Not Completed" : "Completed")}
                                                    />
                                                }
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="completed"
                                                stroke="var(--color-completed)"
                                                strokeWidth={2}
                                                dot={{r: 4}}
                                                activeDot={{r: 6}}
                                            />
                                        </LineChart>
                                    </ChartContainer>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium mb-2 flex items-center">
                                        <TrendingUp className="mr-2 h-5 w-5" />
                                        Monthly Insights
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {selectedHabit.name} was completed on{" "}
                                        {selectedHabit.monthlyData.filter((d) => d.completed === 1).length} out of 30 days this month.
                                        {selectedHabit.completionRate > 80
                                            ? " You're doing great! Keep up the good work."
                                            : selectedHabit.completionRate > 50
                                                ? " You're making progress. Try to be more consistent."
                                                : " You need to improve consistency with this habit."}
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


