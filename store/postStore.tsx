"use client";
import { Post } from "@/models/posts/posts.types"
import { create } from 'zustand';
import { getAuthenticatedUser } from "@/utils/utils";
import { getPostsForChat } from '@/models/posts/posts.service';
import { getMainChat } from '@/models/chats/chats.service';
import { useEffect } from "react";

interface PostData {
    posts: Post[] | null,
    setPosts: (posts: Post[]) => void;
    loadData: () => void,
    reloadData: () => void,
    loaded: boolean
}

// Create a store
export const postStore = create<PostData>((set, get) => ({
  posts: null as Post[] | null,
  loaded: false, // Add a loaded flag
  setPosts: (posts: Post[] | null) => set({ posts }),
  loadData: async () => {
    const { posts, loaded } = get();

    // Avoid re-fetching data if already loaded
    if (loaded) return posts;

    // Fetch authenticated post
    const authUser = await getAuthenticatedUser();
    if (!authUser) return null;

    const chat = await getMainChat();

    // Fetch full post data
    const postsData = await getPostsForChat(chat.id);
    if (postsData) {
      set({ posts: postsData, loaded: true }); // Update both post and loaded flag
    }

    return postsData;
  },
  reloadData: async () => {
    const authUser = await getAuthenticatedUser();
    if (!authUser) return;

    const chat = await getMainChat();
    const postsData = await getPostsForChat(chat.id);

    if (postsData) {
      set({ posts: postsData, loaded: true });
    }
    const { posts, loaded } = get();
    console.log(posts);
  },
}));

interface props {
    initialData: Post[]
}

export const PostStoreInitializer:React.FC<props> = ({initialData}) => {
  const setPostsData = postStore((state) => state.setPosts);

  useEffect(() => {
    setPostsData(initialData);
  }, [initialData, setPostsData]);

  return null;
};

