"use server";

import { SHARES_TABLE } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";

export const sharePost = async (
    userId: string,
    postId: string,
): Promise<null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(SHARES_TABLE)
        .insert([{ user_id: userId, post_id: postId }]);
    if (error) throw error;
    return data;
};
