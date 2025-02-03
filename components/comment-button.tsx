"use client";
import React from "react";
import {MessageCircle} from "lucide-react";
import {Post as PostModel} from "@/models/posts/posts.types";
import {PostDialog} from "@/components/new-post"

export function CommentButton(post: PostModel) {
    return (
        <span className="flex gap-1 items-center">
            <PostDialog {...{action_type: "comment", ...post}}>
                <span className="flex gap-1 items-center">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments.length}
                </span>
            </PostDialog>
        </span>
    );
}

