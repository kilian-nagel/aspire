"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Heart, Share, MessageCircle} from "lucide-react";
import { Post as PostModel } from "@/models/posts/posts.types";
import { userStore } from "@/store/userStore";
import { LikeButton } from "@/components/like-button";

export function Post(post: PostModel) {
  const user_store = userStore();
  user_store.loadData();
  const user_info = user_store.user;

  if(!user_info) return;

  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{post.user.username}</CardTitle>
            <CardDescription className="text-sm text-gray-400">{post.createdAt}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-200">{post.content}</p>
      </CardContent>
      <CardContent className="flex gap-4">
        <LikeButton {...post} ></LikeButton>
        <span className="flex gap-1 items-center">
          <MessageCircle className="h-5 w-5" />
          {post.comments.length}
        </span>
        <span className="flex gap-1 items-center">
          <Share className="h-4 w-4" />
          {post.shares.length}
        </span>
      </CardContent>
    </Card>
  );
}

