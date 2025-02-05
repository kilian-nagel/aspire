"use server";

import {createClient} from "@/utils/supabase/server";

export interface HabitData {
    name: string,
    description: string,
    category: number,
    user_id: string
}

export const getUserHabits = async (userId: string): Promise<Object[]> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('habits')
        .select(`
      *,
    category:habitCategory(*)
    frequency:habitFrequency(*)
    `).is("user_id", userId);

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data;
};

export const addHabit = async (habit_data: HabitData) => {
    const supabase = await createClient();
    console.log(habit_data);
    const {error} = await supabase
        .from('habits')
        .insert([habit_data]);

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const getHabitsCategories = async (): Promise<Object[]> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('habitCategory')
        .select(`*`)

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data;
};
