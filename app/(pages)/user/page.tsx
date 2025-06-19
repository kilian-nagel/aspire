
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import UserProfile from "@/components/user/profil-detail";
import { getFullUser } from "@/app/models/users/users.service";
import { getPosts } from "@/app/models/posts/posts.service";
import { getUserHabits } from "@/app/models/habits/habits.service";
import { PostsQueryType } from "@/app/models/posts/posts.types";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("sign-in");
    }

    const user_data = await getFullUser(user.id);


    const habits_promise = getUserHabits(user?.id);

    const posts_promise = getPosts({
        postQuery: {
            type:PostsQueryType.User,
            id: user_data.id
        }
    });

    await Promise.all([habits_promise, posts_promise]);
    const posts = await posts_promise;
    const habits = await habits_promise;

    return (
        <>
            <UserProfile user={user_data} posts={posts} habits={habits}/> 
        </>
    )
}
