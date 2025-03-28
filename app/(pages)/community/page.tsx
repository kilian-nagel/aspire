import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {SocialFeed} from "@/components/social-feed"
import {getAllPosts} from "@/models/posts/posts.service";
import {PostDialog} from "@/components/post/post-dialog";
import {getFullUser} from "@/models/users/users.service";
import {ClientStoreInitializer} from "@/store/userStore";
import {PostStoreInitializer} from "@/store/postStore";
import {PostEvent} from "@/handlers/post-reducer";

export default async function Page() {
    const supabase = await createClient();
    const posts = await getAllPosts();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const user_data = await getFullUser(user.id);

    return (
        <div className="flex-1 flex relative flex-col gap-12">
            <ClientStoreInitializer initialData={user_data} />
            <PostStoreInitializer initialData={posts} />
            <div className="w-[100%]">
                <div className="flex justify-between items-end gap-3">
                    <div>
                        <h2 className="mt-5 text-left scroll-m-20 text-4xl font-semibold">
                            Recent chats
                        </h2>

                        <p className="leading-7 pb-2 mt-2">
                            Get to know the community.
                        </p>
                    </div>
                    <div className="pb-2">
                        <PostDialog {...{action_type: PostEvent.create, content: ""}} />
                    </div>
                </div>

                <SocialFeed posts={posts} className="mt-4" />
            </div>
        </div>
    );
}
