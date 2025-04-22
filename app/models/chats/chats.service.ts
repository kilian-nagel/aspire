import { Chat } from "@/models/chats/chats.types";
import { createClient } from "@/utils/supabase/client";

const CHATS_TABLE = "chats";

/**
 * @param userId - Identifiant de l'user, dont on récupère les likes.
 * @returns Une promesse qui qui se résoud par un tableau de Likes, sinon une erreur.
 **/
export const getMainChat = async (): Promise<Chat> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from(CHATS_TABLE)
        .select("*")
        .eq("isGlobal", true)
        .limit(1)
        .single();

    if (error) throw error;
    return data;
};
