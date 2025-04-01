"use server";

import {createClient} from "@/utils/supabase/server";
import {SupabaseClient} from '@supabase/supabase-js';
import {Database, Tables} from "@/models/database.types";
import {Habit, HabitCreate} from "@/models/habits/habits.types";
import {subMonths, startOfDay, formatISO} from "date-fns"
type HabitCategory = Tables<'habitCategory'>;
type HabitFrequency = Tables<'habitFrequency'>;
type HabitCompletion = Tables<'habitCompletion'>;

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

    if (habit_data.id === -1) delete habit_data.id;
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

export const getHabitsCategories = async (): Promise<HabitCategory[]> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('habitCategory')
        .select(`*`)
        .returns<HabitCategory[]>();

    if (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

    return data;
};

export const completeHabit = async (habit_id: number) => {
    const supabase = await createClient();

    const date = startOfDay(new Date());
    const dateStr = formatISO(date);

    const {error} = await supabase
        .from('habitCompletion')
        .insert({habit_id: habit_id, created_at: dateStr})
        .select();

    if (error) throw new Error("Erreur lors de la complétion de l'habitude");
}


export const uncompleteHabit = async (habit_id: number) => {
    const supabase = await createClient();

    const date = startOfDay(new Date());
    const dateStr = formatISO(date);

    // On ajoute l'habitude et on récupère l'habitude créée.
    const {error} = await supabase
        .from('habitCompletion')
        .delete()
        .eq("habit_id", habit_id)
        .eq("created_at", dateStr)

    if (error) throw new Error("Erreur lors de l'invalidation de l'habitude");
}

export const getHabitsCompletions = async (habits_ids: number[]) => {
    const supabase = await createClient();
    const one_month_ago = subMonths(new Date(), 1);

    const {data, error} = await supabase
        .from('habitCompletion')
        .select("*")
        .in("habit_id", habits_ids)
        .gt("created_at", one_month_ago.toISOString())
        .order("created_at", {ascending: true})

    if (error) throw new Error("Erreur lors de la récupération de complétion d'habitudes");

    return data;
}
