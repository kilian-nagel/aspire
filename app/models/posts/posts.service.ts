"use server";

import {createClient} from "@/utils/supabase/server";
import {Post} from "@/models/posts/posts.types";

export const createPost = async (post: {userId: string; chatId: number; content: string}) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from('posts').insert([post]).single();
    if (error) throw error;
    return data;
};

export const modifyPost = async (post: {userId: string, content: string, postId: number}) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from('posts').update({content: post.content}).eq("id", post.postId).is("postId", null).single();
    if (error) throw error;
    return data;
};

export const deletePost = async (postId: number) => {
    const supabase = await createClient();

    const {data, error} = await supabase.from('posts').delete().eq("id", postId);
    if (error) throw error;
    return data;
};

export const getPostsForChat = async (chatId: number) => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('posts')
        .select(`
      *,
      user:users(*),         
      likes:likes(*),        
      shares:shares(*),      
      comments:posts(*)`) // Correctly fetch related comments
        .eq('chatId', chatId)

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data.map((post: any) => ({
        ...post,
        numberOfLikes: post.likes.length,
        numberOfShares: post.comments.length,
    }));
};

// Fetch all posts with associated likes, shares, and users
export const getAllPosts = async (): Promise<Post[]> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('posts')
        .select(`
      *,
      user:users(*),         
      likes:likes(*),        
      shares:shares(*),      
      comments:posts(*)  
    `).is("postId", null);

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data.map((post: any) => ({
        ...post,
        numberOfLikes: post.likes.length,
        numberOfShares: post.comments.length,
    }));
};


export const getPost = async (id: number): Promise<Post> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('posts')
        .select(`
            *,
            user:users(*),         
            likes:likes(*),        
            shares:shares(*),      
            comments:posts(*)  
            `)
        .eq("id", id)
        .single();

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return {
        ...data,
        numberOfLikes: data.likes.length,
        numberOfShares: data.comments.length,
    };
};
