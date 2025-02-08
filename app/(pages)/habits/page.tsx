import {Button} from "@/components/ui/button"
import {HabitForm} from "@/components/habits/habit-form"
import {getHabitsCategories, getUserHabits} from "@/models/habits/habits.service"
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {HabitsStoreInitializer} from "@/store/habitsStore";
import {HabitsCards} from "@/components/habits/habits-cards";
import {useRef} from "react";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"

export default async function page() {

    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }
    const habits_type = await getHabitsCategories();
    const habits = await getUserHabits(user.id);
    return (
        <div>
            <div className="flex justify-between items-end mb-10">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Manage habits</h1>
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

            <HabitsCards habits_type={habits_type} />
        </div>
    );
}
