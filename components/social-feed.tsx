"use client";
import { Post } from "@/components/post";
import { cn } from "@/lib/utils"; // Your `cn` utility
import { Post as PostModel } from "@/models/posts/posts.types"; 

interface props {
    className?: string
    posts: PostModel[]
}

export function SocialFeed({className, posts}: props) {
  return (
    <div className={cn("flex flex-col gap-6",className)}>
        {posts.map((post, i) => (
        <Post key={i} {...post}/>))}
    </div>
  );
}

