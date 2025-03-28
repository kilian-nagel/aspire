"use client";
import {Post} from "@/models/posts/posts.types"
import {create} from 'zustand';
import {getAuthenticatedUser} from "@/utils/utils";
import {getPostsForChat} from '@/models/posts/posts.service';
import {getMainChat} from '@/models/chats/chats.service';
import {useEffect} from "react";
import {persist} from 'zustand/middleware';

interface PostData {
    posts: Post[] | null,
    setPosts: (posts: Post[]) => void;
    loadData: () => void,
    reloadData: () => void,
    loaded: boolean,
    hasHydrated: boolean
}

// Create a store
export const postStore = create<PostData>()(
    persist(
        (set, get) => ({
            posts: null,
            loaded: false,
            hasHydrated: false,
            setPosts: (posts: Post[] | null) => set({posts}),
            loadData: async () => {
                const {posts, loaded} = get();

                if (loaded) return posts;

                const authUser = await getAuthenticatedUser();
                if (!authUser) return null;

                const chat = await getMainChat();
                let postsData = await getPostsForChat(chat.id);

                if (postsData) {
                    set({posts: postsData, loaded: true});
                }

                return postsData;
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
        {
            name: 'post-storage',
        }
    )
);

interface props {
    initialData: Post[]
}

export const PostStoreInitializer: React.FC<props> = ({initialData}) => {
    const setPostsData = postStore((state) => state.setPosts);

    useEffect(() => {
        setPostsData(initialData);
    }, [initialData, setPostsData]);

    return null;
};

