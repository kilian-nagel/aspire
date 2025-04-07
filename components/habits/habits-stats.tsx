import {format, subDays} from "date-fns";
import {CheckCheck, CheckCircle2, Circle, TrendingUp} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Progress} from "@/components/ui/progress";
import {HabitInfo} from "@/models/habits/habits.utils";

const round = (n: number) => Math.round(n * 100) / 100;

export default function HabitStats({selectedHabit}: {selectedHabit: HabitInfo}) {
    if (!selectedHabit?.lastWeek) return;
    const reversed_week_copy = [...selectedHabit.lastWeek];
    const reversed_week = reversed_week_copy.reverse();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{selectedHabit.name} Stats</CardTitle>
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
                                            <span className="text-2xl font-bold">
                                                {round(selectedHabit.completion_rate * 100)}%
                                            </span>
                                        </div>
                                        <Progress value={round(selectedHabit.completion_rate * 100)} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Last Week</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between">
                                        {
                                            reversed_week.map((completed, i) => {
                                                return (
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
                                                )
                                            })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="trends">
                        <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2 flex items-center">
                                <TrendingUp className="mr-2 h-5 w-5" />
                                Monthly Insights
                            </h3>
                            <p className="text-muted-foreground">
                                {selectedHabit.name} was completed on{" "}
                                {selectedHabit.monthlyData.filter((d) => d.completed === 1).length} out of{" "}
                                {selectedHabit.max_completions} days this month.{" "}
                                {round(selectedHabit.completion_rate * 100) > 80
                                    ? "You're doing great! Keep up the good work."
                                    : round(selectedHabit.completion_rate * 100) >= 50
                                        ? "You're making progress. Try to be more consistent."
                                        : "You need to improve consistency with this habit."}
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

