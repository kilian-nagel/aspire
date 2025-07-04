"use server";

import { createClient } from "@/utils/supabase/server";
import { Post, PostsQueryType } from "@/models/posts/posts.types";
import { check_if_content_is_unacceptable } from "@/utils/validation";
import { formatISO } from "date-fns";
import {
    LIKES_TABLE,
    POSTS_TABLE,
    SHARES_TABLE,
    USERS_TABLE,
} from "@/utils/constants";

interface getPostsProps {
    postQuery: {
        type: PostsQueryType;
        id: number | string;
    };
    lastTimeStamp?: string | null;
    window?: number;
}

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

/*
 Obtention de posts pour un certain type de données (Chat, User, ou alors aucune donnée spécifique (All))
 */
export const getPosts = async ({
    postQuery,
    lastTimeStamp = null,
    window = 20,
}: getPostsProps) => {
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
        .order("created_at", { ascending: false });

    if (postQuery.type === PostsQueryType.Chat) {
        query.eq("chatId", postQuery.id);
    } else if (postQuery.type === PostsQueryType.User) {
        query.eq("userId", postQuery.id);
    }

    if (lastTimeStamp) {
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
    };
};
