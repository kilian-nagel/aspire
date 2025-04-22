"use server";

import { createClient } from "@/utils/supabase/server";
import { PartialUser, User } from "@/models/users/users.types";
import { USERS_TABLE, LIKES_TABLE } from "@/utils/constants";

export const createUser = async (user: PartialUser) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from(USERS_TABLE).insert([user]);
    if (error) throw error;
    return data;
};

export const getFullUser = async (id: string): Promise<User> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(USERS_TABLE)
        .select(`*, likes:${LIKES_TABLE}(*)`)
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
};
