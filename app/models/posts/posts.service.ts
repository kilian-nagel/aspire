export const createPost = async (post: { userId: string; chatId: string | null; content: string }) => {
  const { data, error } = await supabase.from('posts').insert([post]).single();
  if (error) throw error;
  return data;
};

export const getPostsForChat = async (chatId: string) => {
  const { data, error } = await supabase.from('posts').select('*').eq('chat_id', chatId);
  if (error) throw error;
  return data;
};

