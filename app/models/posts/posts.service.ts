"use server";

import { createClient } from "@/utils/supabase/server";
import { Post } from "@/models/posts/posts.types";
import { Like } from "@/models/likes/likes.types";
import { Share } from "@/models/shares/shares.types";
import { User } from "@/models/users/users.types";

export const createPost = async (post: { userId: string; chatId: number; content: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('posts').insert([post]).single();
  if (error) throw error;
  return data;
};

export const getPostsForChat = async (chatId: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('posts').select('*').eq('chatId', chatId);
  if (error) throw error;
  return data;
};

// Fetch all posts with associated likes, shares, and users
export const getAllPosts = async (): Promise<Post[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      user:users(*),         
      likes:likes(*),        
      shares:shares(*),      
      comments:comments(*)  
    `);

  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }

  // Transform data into a type-safe structure
  return data.map((post: any) => ({
      id: post.id,
      userId: post.userId,
      chatId: post.chatId,
      content: post.content,
      createdAt: post.created_at,
      numberOfLikes: post.likes.length,
      numberOfShares: post.comments.length,
      user: post.user,
      likes: post.likes || [],
      shares: post.shares || [],
      comments: post.comments || [],
  }));
};
