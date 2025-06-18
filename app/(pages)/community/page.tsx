import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {SocialFeed} from "@/components/social-feed"
import {getPosts} from "@/models/posts/posts.service";
import { PostsQueryType } from "@/app/models/posts/posts.types";        
import {PostDialog} from "@/components/post/post-dialog";
import {getFullUser} from "@/models/users/users.service";
import {ClientStoreInitializer} from "@/store/userStore";
import {PostStoreInitializer} from "@/store/postStore";
import {PostEvent} from "@/handlers/post-reducer";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const posts_promise = getPosts({
        postQuery: {    
            type:PostsQueryType.All,
            id:-1
        }
    });
    const user_data_promise = getFullUser(user.id);

    await Promise.all([posts_promise, user_data_promise]);
    const posts = await posts_promise;
    const user_data = await user_data_promise;

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
