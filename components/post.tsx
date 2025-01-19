import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Heart, Share, MessageCircle} from "lucide-react";
import { Post as PostModel } from "@/models/posts/posts.types";


export function Post({ id, content, createdAt, user, likes, comments, shares}: PostModel) {
  return (
    <Card key={id}>
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{user.username}</CardTitle>
            <CardDescription className="text-sm text-gray-400">{createdAt}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-200">{content}</p>
      </CardContent>
      <CardContent className="flex gap-4">
        <span className="flex gap-1 items-center">
          <Heart className="h-4 w-4" />
          {likes.length}
        </span>
        <span className="flex gap-1 items-center">
          <MessageCircle className="h-5 w-5" />
          {comments.length}
        </span>
        <span className="flex gap-1 items-center">
          <Share className="h-4 w-4" />
          {shares.length}
        </span>
      </CardContent>
    </Card>
  );
}

