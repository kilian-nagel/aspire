"use client";
import React, {useState, useEffect} from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Share, MessageCircle} from "lucide-react";
import { Post as PostModel } from "@/models/posts/posts.types";
import { userStore } from "@/store/userStore";
import { LikeButton } from "@/components/like-button";
import { timeAgo } from "@/utils/dates"; 
import { Button } from "@/components/ui/button"
import { PostDialog } from "@/components/new-post";
import { deletePost } from "@/models/posts/posts.service";
import { useToast } from "@/hooks/use-toast";
import { postStore } from "@/store/postStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Post(post: PostModel) {

  const { user, loadData } = userStore();

  useEffect(() => {
    // Load user data on component mount
    loadData();
  }, [loadData]);

  const { toast } = useToast();

  if(!user) return;
  const handle_action = async () => {
    await deletePost(post.id); 
    postStore.getState().reloadData();
    toast({title:"Success", description:"Post deleted with succes"}) 
  }

  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{post.user.username}</CardTitle>
            <CardDescription className="text-sm text-gray-400">{timeAgo(post.createdAt)}</CardDescription>
          </div>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 flex flex-col">
                        <PostDialog className="p-2 hover:cursor-pointer" content={post.content} action_type="edit" id={post.id} />
                    <Button className="text-left" variant="ghost" onClick={handle_action}>Delete</Button>
              </DropdownMenuContent>
         </DropdownMenu>
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

