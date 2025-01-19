"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@/models/users/users.types";

export const createUser = async (user: User) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('users').insert([user]);
    if (error) throw error;
    return data;
};

export const getFullUser = async (id: string): Promise<User> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('users').select("*").eq("id",id).single();
    if (error) throw error;
    return data;
};
