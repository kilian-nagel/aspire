"use server";

import { createClient } from "@/utils/supabase/server";

export const addComment = async (userId: string, postId: number, content: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('comments').insert([{ user_id: userId, post_id: postId, content }]);
  if (error) throw error;
  return data;
};

export const modifyComment = async (commentId: number, content: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('comments').update({content:content}).eq("id", commentId);
  if (error) throw error;
  return data;
};

export const getCommentsForPost = async (postId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('comments')
  .select('*, users:users(*)')
  .eq('postId', postId);
  if (error) throw error;
  return data;
};

