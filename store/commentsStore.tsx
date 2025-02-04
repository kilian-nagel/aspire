
"use client";
import {Post} from "@/models/posts/posts.types"
import {create} from 'zustand';
import {getAuthenticatedUser} from "@/utils/utils";
import {getCommentsForPost} from '@/models/comments/comments.service';
import {getMainChat} from '@/models/chats/chats.service';
import {useEffect} from "react";
import {persist} from 'zustand/middleware';

interface PostData {
    postId: number | null,
    comments: Post[] | null,
    setComments: (comments: Post[]) => void;
    setPostId: (postId: number) => void;
    loadData: (id: number) => void,
    reloadData: () => void,
    loaded: boolean,
    hasHydrated: boolean
}

// Create a store
export const commentsStore = create<PostData>()(
    persist(
        (set, get) => ({
            postId: null,
            comments: null,
            loaded: false,
            hasHydrated: false,
            setComments: (comments: Post[] | null) => set({comments}),
            setPostId: (postId: number) => set({postId}),
            loadData: async (id: number) => {
                const {comments, loaded} = get();
                if (loaded) return comments;
                const commentsData = await getCommentsForPost(id);

                if (commentsData) {
                    set({comments: comments, loaded: true});
                }

                return commentsData;
            },
            reloadData: async () => {
                const {postId} = get();

                if (!postId) return;
                const commentsData = await getCommentsForPost(postId);

                if (commentsData) {
                    set({comments: commentsData, loaded: true});
                }
            },
        }),
        {
            name: 'post-storage',
        }
    )
);

interface props {
    initialData: Post[],
    postId: number
}

export const CommentStoreInitializer: React.FC<props> = ({initialData, postId}) => {
    const setCommentsData = commentsStore((state) => state.setComments);
    const setPostId = commentsStore((state) => state.setPostId);

    setPostId(postId);
    setCommentsData(initialData);

    return null;
};

