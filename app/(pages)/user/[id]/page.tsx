import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import UserProfile from "@/components/user/profil-detail";
import { getFullUser } from "@/app/models/users/users.service";
import { getPosts } from "@/app/models/posts/posts.service";
import { getUserHabits } from "@/app/models/habits/habits.service";
import { PostsQueryType } from "@/app/models/posts/posts.types";

export default async function Page(props: {params}) {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("sign-in");
    }

    // On récupère les paramètre url
    const id = decodeURIComponent((await props.params).id);
    const url_params = new URLSearchParams(id);

    // On récupère les paramètres : id du post et type de post (commentaire ou post normal).
    const user_id = url_params.get("id") ?? "";
    if (!user_id) return;

    const user_data = await getFullUser(user_id);

    const habits_promise = getUserHabits(user_data.id);
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
