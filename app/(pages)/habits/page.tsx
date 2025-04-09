import {Button} from "@/components/ui/button"
import {HabitForm} from "@/components/habits/habit-form"
import {getHabitsCategories, getUserHabits} from "@/models/habits/habits.service"
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {HabitsStoreInitializer} from "@/store/habitsStore";
import {HabitsCards} from "@/components/habits/habits-cards";
import {getFullUser} from "@/models/users/users.service";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default async function page() {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/sign-in");
    }

    const userData = await getFullUser(user.id);
    if (!userData) {
        return redirect("/sign-in");
    }

    const habits_type = await getHabitsCategories();
    const habits = await getUserHabits(user.id);
    return (
        <div>
            <div className="flex justify-between items-center gap-10">

                <div className="flex gap-10 items-center mb-10">
                    <div className="flex flex-col gap-3">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Hello, {userData.username}</h1>
                        <p>Ready to crush your goals ?</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">New Habit</Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-[1200px]">
                        <DialogTitle></DialogTitle>
                        <HabitForm habits_type={habits_type} />
                    </DialogContent>
                </Dialog>
            </div>

            <HabitsStoreInitializer initialData={habits} />

            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-2 mb-5">
                    <TabsTrigger value="all">All habits</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                </TabsList>

                <TabsContent className="w-full" value="all">
                    <HabitsCards no_complete_action={true} habits_type={habits_type} />
                </TabsContent>

                <TabsContent value="today">
                    <HabitsCards habits_type={habits_type} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
