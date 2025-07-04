
"use client";
import {Post} from "@/models/posts/posts.types"
import {create} from 'zustand';
import {getCommentsForPost} from '@/models/comments/comments.service';
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
    postId: number,
    comments: Post[]
}

export const CommentStoreInitializer: React.FC<props> = ({postId, comments}) => {
    const setComments = commentsStore((state) => state.setComments);
    setComments(comments);
    return null;
};

