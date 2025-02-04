"use client";
import {Post} from "@/models/posts/posts.types"
import {create} from 'zustand';
import {getPost} from '@/models/posts/posts.service';
import {useEffect} from "react";
import {persist} from 'zustand/middleware';

interface PostData {
    post: Post | null,
    setPost: (post: Post) => void;
    loadData: (id: number) => void,
    reloadData: () => void,
    loaded: boolean,
    hasHydrated: boolean
}

// Create a store
export const postDetailStore = create<PostData>()(
    persist(
        (set, get) => ({
            post: null,
            loaded: false,
            hasHydrated: false,
            setPost: (post: Post | null) => set({post}),
            loadData: async (id) => {
                const {post, loaded} = get()
                if (loaded) return post;

                const postsData = await getPost(id);

                if (postsData) {
                    set({post: postsData, loaded: true});
                }

                return postsData;
            },
            reloadData: async () => {
                const {post} = get();
                if (!post?.id) return;
                const postsData = await getPost(post.id);
                if (postsData) {
                    set({post: postsData, loaded: true});
                }
            },
        }),
        {
            name: 'post-storage',
        }
    )
);

interface props {
    initialData: Post
}

export const PostDetailStoreInitializer: React.FC<props> = ({initialData}) => {
    const setPostsData = postDetailStore((state) => state.setPost);

    useEffect(() => {
        setPostsData(initialData);
    }, [initialData, setPostsData]);

    return null;
};

