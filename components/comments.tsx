"use client";
import {commentsStore} from "@/store/commentsStore";
import {Post} from "@/components/post/post";

export function Comments() {
    const posts = commentsStore((state) => state.comments);
    return (
        <div>
            {
                posts?.map((post) => (
                    <Post key={post.id} {...post} />
                ))
            }
        </div>
    );
}
