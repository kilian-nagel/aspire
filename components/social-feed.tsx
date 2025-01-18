import React from "react";
import { Post } from "@/components/post";
import { cn } from "@/lib/utils"; // Your `cn` utility

interface props {
    className?: string
}

export function SocialFeed({className}: props) {
  const posts = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/images/john-avatar.jpg",
        date: "January 16, 2025",
      },
      content: {
        text: "Loving the new UI improvements! Here's a quick shot from my latest project 🚀",
        image: "/images/project-screenshot.jpg",
      },
      meta: {
        likes: 124,
        comments: 36,
        shares: 12,
      },
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "/images/jane-avatar.jpg",
        date: "January 15, 2025",
      },
      content: {
        text: "Exploring the beauty of the mountains 🏔️. Nature is truly healing.",
        image: "/images/mountains.jpg",
      },
      meta: {
        likes: 342,
        comments: 89,
        shares: 45,
      },
    },
    {
      id: 3,
      user: {
        name: "Alex Johnson",
        avatar: "/images/alex-avatar.jpg",
        date: "January 14, 2025",
      },
      content: {
        text: "When your code finally works and all the tests pass 😅🙌",
        image: "/images/test-pass-meme.jpg",
      },
      meta: {
        likes: 210,
        comments: 44,
        shares: 18,
      },
    },
  ];
  return (
    <div className={cn("flex flex-col gap-6",className)}>
        {posts.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
}

