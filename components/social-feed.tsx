"use client";
import {Post} from "@/components/post/post";
import {cn} from "@/lib/utils";
import {Post as PostModel} from "@/models/posts/posts.types";
import {postStore} from "@/store/postStore";
import {useEffect, useRef} from "react";
import {Skeleton} from "@/components/ui/skeleton"

interface props {
    className?: string
    posts: PostModel[]
}

export function SocialFeed({className}: props) {
    const posts = postStore((state) => state.posts);
    const load_posts_data = postStore((state) => state.loadData);
    const posts_loading = postStore((state) => state.requestOngoing);
    const element = useRef<HTMLDivElement|null>(null) 

    useEffect(()=>{
        function fetchPostsOnBottomReach(){
            const body_height = document.querySelector("body")?.clientHeight;
            const footer_height = document.querySelector("footer")?.clientHeight;
            const feed_height = element.current?.clientHeight;
            
            if(body_height && footer_height && feed_height){
                const space_between_header_and_feeed = body_height - footer_height - feed_height;
                const bottom_feed_pos = feed_height + space_between_header_and_feeed;

                // Si la position du scroll est proche du bas du feed de posts alors on doit charger de nouveaux posts.
                if(Math.abs(bottom_feed_pos - window.scrollY) > 250){
                    load_posts_data();
                }
            }
        }

        document.addEventListener("scroll", fetchPostsOnBottomReach);
        return () => {
            document.removeEventListener("scroll", fetchPostsOnBottomReach);
        }
    },[])

    return (
        <div ref={element} className={cn("flex flex-col gap-6", className)}>
            {posts?.map((post, i) => (
                <Post key={i} {...post} />))}

            {
                posts_loading ? <div><Skeleton className="w-full h-[240px]"></Skeleton></div> : <span></span>
            }
        </div>
    );
}


