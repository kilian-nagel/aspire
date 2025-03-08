import HabitDashboard from "@/components/habits-dashboard";
import {getHabitsCompletions, getUserHabits} from "@/models/habits/habits.service";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("sign-in");
    }

    const habits = await getUserHabits(user?.id);
    const habits_completions = getHabitsCompletions(habits.map(habit => habit.id));

    return (
        <HabitDashboard />
    )
}
