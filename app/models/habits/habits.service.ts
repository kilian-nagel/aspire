"use server";

import {createClient} from "@/utils/supabase/server";
import {SupabaseClient} from '@supabase/supabase-js';
import {Database, Tables} from "@/models/database.types";

let habit: Tables<'habits'>;

export const getUserHabits = async (userId: string): Promise<typeof habit[]> => {
    const supabase: SupabaseClient<Database> = await createClient();
    const {data, error} = await supabase
        .from('habits')
        .select(`
            *, category:habitCategory(*), frequency:habitFrequency(*)`).eq("user_id", userId);

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
        .upsert(habit_data)
        .select();


    if (error) {
        throw new Error("Error while inserting an habit.")
    }

    // On associe l'id de l'habitude crée à ses fréquences de répétition.
    frequency.map(freq => freq.id = data[0].id);


    // On insère les fréquences de répétition de l'habitude.
    const response = await supabase
        .from("habitFrequency")
        .upsert(frequency);

    if (response.error) {
        console.error('Error fetching posts:', error);
        throw error;
    }


    const days_ids = frequency.map(x => x["day"]);
    const response2 = await supabase
        .from("habitFrequency")
        .delete()
        .eq("id", data[0].id)
        .not("day", "in", `(${days_ids.join(",")})`);


    if (response2.error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const deleteHabit = async (habit_id: number) => {
    const supabase = await createClient();
    const {error} = await supabase
        .from('habits')
        .delete()
        .eq("id", habit_id);


    if (error) {
        throw new Error("Error while delete an habit.")
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
