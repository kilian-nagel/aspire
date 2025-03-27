"use client";
import React from "react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {Share} from "lucide-react";
import {Post as PostModel} from "@/models/posts/posts.types";
import {userStore} from "@/store/userStore";
import {LikeButton} from "@/components/buttons/like-button";
import {CommentButton} from "@/components/buttons/comment-button";
import {timeAgo} from "@/utils/dates";
import {Button} from "@/components/ui/button"
import {PostDialog} from "@/components/post/post-dialog";
import {deletePost} from "@/models/posts/posts.service";
import {useToast} from "@/hooks/use-toast";
import {postStore} from "@/store/postStore";
import {useRouter} from "next/navigation";
import {PostEvent} from "@/handlers/post-reducer";
import clsx from "clsx";
import DOMPurify from 'dompurify';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Post(post: PostModel) {
    const router = useRouter();

    const {user} = userStore();
    const {toast} = useToast();

    if (!user) return;

    // Clic sur l'un des éléments du post à l'exception des (actions (dropdown) etc..)
    const handle_click_on_post = () => {
        router.push(`/community/post/id=${post.id}`);
    }

    const handle_action = async () => {
        await deletePost(post.id);
        postStore.getState().reloadData();
        toast({title: "Success", description: "Post deleted with succes"})
    }

    return (
        <Card key={post.id} className={clsx("group hover:bg-[#111111]", {is_comment: "border-none"})}>
            <CardHeader>
                <div className="flex gap-4 items-center">
                    <Avatar onClick={handle_click_on_post}>
                        <AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div onClick={handle_click_on_post}>
                        <CardTitle className="text-lg font-semibold">{post.user.username}</CardTitle>
                        <CardDescription className="text-sm text-gray-400">{timeAgo(post.created_at)}</CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className={user.id !== post.userId ? "hidden" : ""}>...</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 flex flex-col">
                            <PostDialog className="p-2 hover:cursor-pointer" content={post.content} action_type={PostEvent.update} id={post.id} />
                            <Button className="text-left" variant="ghost" onClick={handle_action}>Delete</Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 cursor-pointer" onClick={handle_click_on_post}>
                <p className="text-gray-200" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content)}}></p>
            </CardContent>


            <CardContent className="flex gap-4 group-hover:bg-[#111111]">
                <LikeButton {...post} ></LikeButton>
                <CommentButton {...post}></CommentButton>
                <span className="flex gap-1 items-center">
                    <Share className="h-4 w-4" />
                    {post.shares.length}
                </span>
            </CardContent>
        </Card >
    );
}

