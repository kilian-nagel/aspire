"use server";

import {createClient} from "@/utils/supabase/server";
import {PartialUser, User} from "@/models/users/users.types";

export const createUser = async (user: PartialUser) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from('users').insert([user]);
    if (error) throw error;
    return data;
};

export const getFullUser = async (id: string): Promise<User> => {
    const supabase = await createClient();
    const {data, error} = await supabase.from('users')
        .select("*, likes:likes(*)").eq("id", id).single();

    if (error) throw error;
    return data;
};
