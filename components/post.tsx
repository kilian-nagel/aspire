import { cn } from "@/lib/utils"; // Your `cn` utility
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Heart, Share, MessageCircle} from "lucide-react";

type PostCardProps = {
  post: {
    id: number;
    user: {
      name: string;
      avatarUrl?: string;
      date: string;
    };
    content: {
      text: string;
    };
    meta: {
      likes: number;
      comments: number;
      shares: number;
    };
  };
  className?: string; // Custom CSS class support
};

export function Post({ post, className }: PostCardProps) {
  return (
    <Card key={post.id} className={cn(className)}>
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{post.user.name}</CardTitle>
            <CardDescription className="text-sm text-gray-400">{post.user.date}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-200">{post.content.text}</p>
      </CardContent>
      <CardContent className="flex gap-4">
        <span className="flex gap-1 items-center">
          <Heart className="h-4 w-4" />
          {post.meta.likes}
        </span>
        <span className="flex gap-1 items-center">
          <MessageCircle className="h-5 w-5" />
          {post.meta.comments}
        </span>
        <span className="flex gap-1 items-center">
          <Share className="h-4 w-4" />
          {post.meta.shares}
        </span>
      </CardContent>
    </Card>
  );
}

