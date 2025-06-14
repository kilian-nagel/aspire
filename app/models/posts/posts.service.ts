"use server";

import { createClient } from "@/utils/supabase/server";
import { Post } from "@/models/posts/posts.types";
import { check_if_content_is_unacceptable } from "@/utils/validation";
import { formatISO } from "date-fns";
import {
    LIKES_TABLE,
    POSTS_TABLE,
    SHARES_TABLE,
    USERS_TABLE,
} from "@/utils/constants";

export const createPost = async (post: {
    userId: string;
    chatId: number;
    content: string;
    id?: number;
}): Promise<null> => {
    if (check_if_content_is_unacceptable(post.content)) {
        throw Error("Post contains inappropriate content");
    }

    const supabase = await createClient();
    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .insert([post])
        .single();
    if (error) throw error;
    return data;
};

export const modifyPost = async (post: {
    userId: string;
    content: string;
    postId: number;
}): Promise<null> => {
    if (check_if_content_is_unacceptable(post.content)) {
        throw Error("Post contains inappropriate content");
    }

    const supabase = await createClient();
    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .update({ content: post.content })
        .eq("id", post.postId)
        .is("postId", null)
        .single();
    if (error) throw error;
    return data;
};

export const deletePost = async (postId: number) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .delete()
        .eq("id", postId);
    if (error) throw error;
    return data;
};

export const getPostsForChat = async (
    chatId: number,
    lastTimeStamp: string | null = null,
    window: number = 20,
) => {
    const supabase = await createClient();
    let query = supabase
        .from("posts")
        .select(
            `
      *,
      user:${USERS_TABLE}(*),         
      likes:${LIKES_TABLE}(*),        
      shares:${SHARES_TABLE}(*),      
      comments:${POSTS_TABLE}(*)`,
        ) // Correctly fetch related comments
        .eq("chatId", chatId)
        .order("created_at", { ascending: false });

    if (lastTimeStamp) {
        console.log("lastTimeStamp", lastTimeStamp);
        const lastTimeStampISO = formatISO(new Date(lastTimeStamp));
        query = query.lt("created_at", lastTimeStampISO);
    }

    const { data, error } = await query.limit(window);

    if (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data.map((post: Post) => ({
        ...post,
        numberOfLikes: post.likes.length,
        numberOfShares: post.comments.length,
    }));
};

// Fetch all posts with associated likes, shares, and users
export const getAllPosts = async (
    lastTimeStamp: string | null = null,
    window: number = 20,
): Promise<Post[]> => {
    const supabase = await createClient();

    const query = supabase
        .from(POSTS_TABLE)
        .select(
            `
      *,
      user:${USERS_TABLE}(*),         
      likes:${LIKES_TABLE}(*),        
      shares:${SHARES_TABLE}(*),      
      comments:${POSTS_TABLE}(*)  
    `,
        )
        .order("created_at", { ascending: false })
        .is("postId", null);

    if (lastTimeStamp) {
        query.lt("created_at", lastTimeStamp);
    }

    const { data, error } = await query.limit(window);

    if (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data.map((post: Post) => ({
        ...post,
        numberOfLikes: post.likes.length,
        numberOfShares: post.comments.length,
    }));
};

export const getPost = async (id: number): Promise<Post> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .select(
            `
            *,
            user:${USERS_TABLE}(*),         
            likes:${LIKES_TABLE}(*),        
            shares:${SHARES_TABLE}(*),      
            comments:${POSTS_TABLE}(*)  
            `,
        )
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

    // Transform data into a type-safe structure
    return {
        ...data,
        numberOfLikes: data.likes.length,
        numberOfShares: data.comments.length,
    };
};
