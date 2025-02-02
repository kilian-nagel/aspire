"use server";

import {createClient} from "@/utils/supabase/server";

export const addComment = async (userId: string, postId: number, content: string, chatId = 1) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from('posts').insert([{userId: userId, postId: postId, content, chatId: chatId}]);
    if (error) throw error;
    return data;
};

export const modifyComment = async (postId: number, content: string) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from('posts').update({content: content}).eq("id", postId).neq("postId", null);
    if (error) throw error;
    return data;
};

export const getCommentsForPost = async (postId: number) => {
    const supabase = await createClient();

    const {data, error} = await supabase.from('posts')
        .select('*, user:users(*), likes:likes(*), shares:shares(*), comments:comments(*)')
        .eq("postId", postId);
    if (error) throw error;
    return data;
};

