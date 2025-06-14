"use client";
import {Post} from "@/models/posts/posts.types"
import {create} from 'zustand';
import {getAuthenticatedUser} from "@/utils/utils";
import {getPostsForChat} from '@/models/posts/posts.service';
import {getMainChat} from '@/models/chats/chats.service';
import {useEffect} from "react";
import {merge_data} from "@/utils/object";

interface PostData {
    posts: Post[] | null,
    setPosts: (posts: Post[]) => void;
    loadData: () => void,
    reloadData: () => void,
    loaded: boolean,
    hasHydrated: boolean,
    requestOngoing: boolean,
    lastRequestTime: string | null,
    lastTimeStamp: string|null
}

// Create a store
export const postStore = create<PostData>()(
        (set, get) => ({
            posts: null,
            loaded: false,
            requestOngoing: false,
            hasHydrated: false,
            lastTimeStamp: null,
            lastRequestTime: null,
            setPosts: (posts: Post[] | null) => {
                set({posts})
            },
            setLoaded: (loaded: boolean) => {
                set({loaded:loaded});
            },
            loadData: async () => {
                const {posts, lastTimeStamp, lastRequestTime} = get();

                const now = (new Date()).getTime();
                const lastRequestTimeMs = (new Date(lastRequestTime ?? '')).getTime();

                if(lastRequestTime && ((now - lastRequestTimeMs) < 1000)) return;
                set({requestOngoing: true, lastRequestTime: (new Date()).toString()});
                
                const authUser = await getAuthenticatedUser();
                if (!authUser){
                    return null
                };

                try {
                    const chat = await getMainChat();
                    let postsData = await getPostsForChat(chat.id, lastTimeStamp);

                    const timestamps = postsData.map(post => new Date(post.created_at).getTime()).sort((a, b) => a-b);
                    if(timestamps.length > 0){
                        set({lastTimeStamp: new Date(timestamps[0]).toString()})
                    }

                    const merged_posts = merge_data<Post>(posts ?? [], postsData);
                    set({
                        posts: [...merged_posts], 
                        loaded: true, 
                        requestOngoing: false
                    });
                    return postsData;
                } catch (err){
                }

            },
            reloadData: async () => {
                const authUser = await getAuthenticatedUser();
                if (!authUser) return;

                const chat = await getMainChat();
                const postsData = await getPostsForChat(chat.id);
                const postsDataFiltered = postsData.filter(data => data.postId === null)

                if (postsData) {
                    set({posts: postsDataFiltered, loaded: true});
                }
            },
        }),
);

interface props {
    initialData: Post[]
}

export const PostStoreInitializer: React.FC<props> = ({initialData}) => {
    const setPostsData = postStore((state) => state.setPosts);
    const loadPostsData = postStore((state) => state.loadData);

    useEffect(() => {
        setPostsData(initialData);
        if(!initialData){
            // If not initial data that means we need to reload posts data manually.
            loadPostsData();
        }
    }, [initialData, setPostsData]);

    return null;
};

