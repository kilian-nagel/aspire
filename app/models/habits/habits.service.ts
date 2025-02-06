"use server";

import {createClient} from "@/utils/supabase/server";
import {SupabaseClient} from '@supabase/supabase-js';
import {Habit} from "@/models/habits/habits.types";
import {Database, Tables, Enums} from "@/models/database.types";

let habit: Tables<'habits'>;

export const getUserHabits = async (userId: string): Promise<typeof habit[]> => {
    const supabase: SupabaseClient<Database> = await createClient();
    const {data, error} = await supabase
        .from('habits')
        .select(`
      *`).eq("user_id", userId);

    if (error || !data) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data;
};

export const addHabit = async (habit_data: typeof habit) => {
    const supabase = await createClient();
    const frequency = habit_data?.frequency;
    delete habit_data?.frequency;

    // On ajoute l'habitude et on récupère l'habitude créée.
    const {error, data} = await supabase
        .from('habits')
        .insert(habit_data)
        .select();

    if (error) {
        throw new Error("Error while inserting an habit.")
    }

    // On associe l'id de l'habitude crée à ses fréquences de répétition.
    frequency.map(freq => freq.id = data[0].id);

    // On insère les fréquences de répétition de l'habitude.
    const response = await supabase
        .from("habitFrequency")
        .insert(frequency);

    if (response.error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const getHabitsCategories = async (): Promise<typeof habit[]> => {
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
