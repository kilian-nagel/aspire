"use server";

import { createClient } from "@/utils/supabase/server";

export const likePost = async (userId: string, postId: number) => {
  const supabase = await createClient();

    const { data, error } = await supabase
    .from('likes') // Replace 'likes' with your table name
    .select('*')
    .eq("userId", userId)
    .eq("postId", postId);

    console.log(data);
};


export const getLikesForPost = async (postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('likes').select('*').eq('postId', postId);
  if (error) throw error;
  return data;
};
