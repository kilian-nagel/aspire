export const likePost = async (userId: string, postId: string) => {
  const { data, error } = await supabase.from('likes').insert([{ user_id: userId, post_id: postId }]);
  if (error) throw error;
  return data;
};

export const getLikesForPost = async (postId: string) => {
  const { data, error } = await supabase.from('likes').select('*').eq('post_id', postId);
  if (error) throw error;
  return data;
};
