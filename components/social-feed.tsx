"use client";
import {Post} from "@/components/post/post";
import {cn} from "@/lib/utils"; // Your `cn` utility
import {Post as PostModel} from "@/models/posts/posts.types";
import {postStore} from "@/store/postStore";

interface props {
    className?: string
    posts: PostModel[]
}

export function SocialFeed({className}: props) {
    const posts = postStore((state) => state.posts);
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            {posts?.map((post, i) => (
                <Post key={i} {...post} />))}
        </div>
    );
}

