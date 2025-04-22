"use server";

import { createClient } from "@/utils/supabase/server";
import {
    POSTS_TABLE,
    USERS_TABLE,
    LIKES_TABLE,
    SHARES_TABLE,
} from "@/utils/constants";

export const addComment = async ({
    userId,
    postId,
    content,
    chatId = 1,
}: {
    userId: string;
    postId: number;
    content: string;
    chatId?: number;
}) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .insert([{ userId: userId, postId: postId, content, chatId: chatId }]);
    if (error) throw error;
    return data;
};

export const modifyComment = async (postId: number, content: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .update({ content: content })
        .eq("id", postId)
        .neq("postId", null);
    if (error) throw error;
    return data;
};

export const getCommentsForPost = async (postId: number) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from(POSTS_TABLE)
        .select(
            `*, user:${USERS_TABLE}(*), likes:${LIKES_TABLE}(*), shares:${SHARES_TABLE}(*), comments:${POSTS_TABLE}(*)`,
        )
        .eq("postId", postId);
    if (error) throw error;
    return data;
};
