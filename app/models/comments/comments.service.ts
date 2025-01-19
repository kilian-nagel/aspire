"use server";

import { createClient } from "@/utils/supabase/server";

export const addComment = async (userId: string, postId: string, content: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('comments').insert([{ user_id: userId, post_id: postId, content }]);
  if (error) throw error;
  return data;
};

export const getCommentsForPost = async (postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
  if (error) throw error;
  return data;
};

