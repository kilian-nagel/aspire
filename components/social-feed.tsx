"use client";
import {Post} from "@/components/post/post";
import {cn} from "@/lib/utils"; // Your `cn` utility
import {Post as PostModel} from "@/models/posts/posts.types";
import {postStore} from "@/store/postStore";
import {useEffect, useRef} from "react";

interface props {
    className?: string
    posts: PostModel[]
}

export function SocialFeed({className}: props) {
    const posts = postStore((state) => state.posts);
    const load_posts_data = postStore((state) => state.loadData);
    const element = useRef<HTMLDivElement|null>(null) 

    useEffect(()=>{
        document.addEventListener("scroll", event => {
            const body_height = document.querySelector("body")?.clientHeight;
            const footer_height = document.querySelector("footer")?.clientHeight;
            const feed_height = element.current?.clientHeight;
            
            if(body_height && footer_height && feed_height){
                const space_between_header_and_feeed = body_height - footer_height - feed_height;
                const bottom_footer_pos = feed_height + space_between_header_and_feeed;

                if(Math.abs(bottom_footer_pos - window.scrollY) > 100){
                    load_posts_data();
                }
            }
        });
    },[])

    return (
        <div ref={element} className={cn("flex flex-col gap-6", className)}>
            {posts?.length}
            {posts?.map((post, i) => (
                <Post key={i} {...post} />))}
        </div>
    );
}


