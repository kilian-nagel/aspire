import {PostDetail} from "@/components/postDetail";
import {getPost} from "@/models/posts/posts.service";
import {getCommentsForPost} from "@/models/comments/comments.service";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {getFullUser} from "@/models/users/users.service";
import {ClientStoreInitializer} from "@/store/userStore";
import {PostDetailStoreInitializer} from "@/store/postDetailStore";
import {CommentStoreInitializer} from "@/store/commentsStore";
import {Comments} from "@/components/comments";

type Params = Promise<{slug: string}>

export default async function Page(props: {params: Params}) {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }
    const user_data = await getFullUser(user.id)

    // On récupère les paramètre url
    const slug = decodeURIComponent((await props.params).slug);
    const url_params = new URLSearchParams(slug);

    // On récupère les paramètres : id du post et type de post (commentaire ou post normal).
    const post_id = parseInt(url_params.get("id") ?? "");
    if (!post_id) return;

    const post = await getPost(post_id);

    return (
        <>
            <ClientStoreInitializer initialData={user_data} />
            <PostDetailStoreInitializer initialData={post} />
            <CommentStoreInitializer postId={post.id} />
            <div>
                <PostDetail key={post.id}></PostDetail>
                <Comments />
            </div>
        </>
    );
}
