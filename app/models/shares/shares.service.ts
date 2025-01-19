"use server";

import { createClient } from "@/utils/supabase/server";

export const sharePost = async (userId: string, postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('shares').insert([{ user_id: userId, post_id: postId }]);
  if (error) throw error;
  return data;
};
