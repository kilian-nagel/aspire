"use client";
import React from "react";
import { Heart } from "lucide-react";
import { Post as PostModel } from "@/models/posts/posts.types";
import { userStore } from "@/store/userStore";
import { likePost } from "@/models/likes/likes.service"

export function LikeButton(post:PostModel) {
    const user_store = userStore();
    const user = user_store.user;
    if(!user) return;

    let post_belong_to_user = user.likes.map((post_user) => {
        if(post_user.id === post.id) return true;
    })

    const like_action = () => {
        console.log("liked");
        likePost(user.id, post.id);
    }

    return (
        <span className="flex gap-1 items-center" onClick={like_action}>
          <Heart className="h-4 w-4" />
          {post.likes.length}
        </span>
    );
}
