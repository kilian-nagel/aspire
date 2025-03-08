import HabitDashboard from "@/components/habits-dashboard";
import {getHabitsCompletions, getUserHabits} from "@/models/habits/habits.service";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {getHabitsCompletionData} from "@/models/habits/habits.utils";
import {HabitsStoreInitializer} from "@/store/habitsStore";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("sign-in");
    }

    const habits = await getUserHabits(user?.id);
    const habits_completions = await getHabitsCompletions(habits.map(habit => habit.id));
    const habits_completions_stats = Object.values(getHabitsCompletionData(habits, habits_completions));

    return (
        <>
            <HabitDashboard habits={habits_completions_stats} />
            <HabitsStoreInitializer initialData={habits} />
        </>
    )
}
