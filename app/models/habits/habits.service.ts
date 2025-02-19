"use server";

import {createClient} from "@/utils/supabase/server";
import {SupabaseClient} from '@supabase/supabase-js';
import {Database, Tables} from "@/models/database.types";
import {Habit, HabitCreate} from "@/models/habits/habits.types";

type HabitCategory = Database["public"]["Tables"]["habitCategory"]["Row"];
type HabitFrequency = Database["public"]["Tables"]["habitFrequency"]["Row"];
type HabitCompletion = Database["public"]["Tables"]["habitCompletion"]["Row"];


type HabitWithRelations = Habit & {
    categoryObject: HabitCategory | null;
    frequency: HabitFrequency[]; // Assuming multiple frequencies per habit
    completions: HabitCompletion[]; // Assuming multiple completions per habit
};


export const getUserHabits = async (userId: string): Promise<Habit[]> => {
    const supabase: SupabaseClient<Database> = await createClient();
    const {data, error} = await supabase
        .from('habits')
        .select(`
            *, categoryObject:habitCategory(*), frequency:habitFrequency(*), completions: habitCompletion(*)`).eq("user_id", userId)
        .returns<HabitWithRelations[]>();

    if (error || !data) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data;
};

export const addHabit = async (habit_data: HabitCreate) => {
    const supabase = await createClient();
    const frequency = habit_data?.frequency;
    if (!frequency) throw new Error("Erreur lors de l'ajout, il faut sélectionner au moins un jour.")

    delete habit_data.frequency;

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


    const days_ids = frequency.map(x => x.day);
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

export const getHabitsCategories = async (): Promise<Tables<'habitCategory'>[]> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('habitCategory')
        .select(`*`)
        .returns<Tables<'habitCategory'>[]>();

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data;
};

export const completeHabit = async (habit_id: number) => {
    const supabase = await createClient();

    const {error} = await supabase
        .from('habitCompletion')
        .upsert({habit_id: habit_id})
        .select();

    if (error) throw new Error("Erreur lors de la complétion de l'habitude");
}


export const uncompleteHabit = async (habit_id: number) => {
    const supabase = await createClient();

    let today_at_midnight = new Date();
    today_at_midnight.setHours(0);
    today_at_midnight.setMinutes(0);
    today_at_midnight.setSeconds(0);

    // On ajoute l'habitude et on récupère l'habitude créée.
    const {error} = await supabase
        .from('habitCompletion')
        .delete()
        .eq("habit_id", habit_id)
        .gt("created_at", today_at_midnight.toISOString())

    if (error) throw new Error("Erreur lors de l'invalidation de l'habitude");
}
