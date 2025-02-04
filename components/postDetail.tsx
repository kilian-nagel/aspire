"use client";
import {Post} from "@/components/post/post";
import {postDetailStore} from "@/store/postDetailStore";

export function PostDetail() {
    const post = postDetailStore((state) => state.post);

    if (!post) return (<></>);
    return (<Post {...post}></Post>)
}
