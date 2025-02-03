"use client";
import React from "react";
import {MessageCircle} from "lucide-react";
import {Post} from "@/models/posts/posts.types";
import {PostDialog} from "@/components/post/post-dialog"
import {PostEvent} from "@/handlers/post-reducer";

export function CommentButton(post: Post) {
    return (
        <span className="flex gap-1 items-center">
            <PostDialog {...{action_type: PostEvent.createComment, ...post}}>
                <span className="flex gap-1 items-center">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments.length}
                </span>
            </PostDialog>
        </span>
    );
}

