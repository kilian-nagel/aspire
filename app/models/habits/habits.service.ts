"use server";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/models/database.types";
import { Habit, HabitCreate, HabitInfo } from "@/models/habits/habits.types";
import { subMonths, startOfDay, formatISO } from "date-fns";
import {
    HABITS_TABLE,
    HABIT_CATEGORY_TABLE,
    HABIT_FREQUENCY_TABLE,
    HABIT_COMPLETION_TABLE,
} from "@/utils/constants";
import { HabitCompletionService } from "./habits.utils";

type HabitCategory = Tables<typeof HABIT_CATEGORY_TABLE>;
type HabitFrequency = Tables<typeof HABIT_FREQUENCY_TABLE>;
type HabitCompletion = Tables<typeof HABIT_COMPLETION_TABLE>;

export type HabitWithRelations = Habit & {
    categoryObject: HabitCategory;
    frequency: HabitFrequency[];
    completions: HabitCompletion[];
    total_completions: number;
};

export const getUserHabits = async (
    userId: string,
): Promise<HabitWithRelations[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("habits")
        .select(
            `
            *, categoryObject:${HABIT_CATEGORY_TABLE}(*), frequency:${HABIT_FREQUENCY_TABLE}(*), completions: ${HABIT_COMPLETION_TABLE}(*)`,
        )
        .eq("user_id", userId)
        .returns<HabitWithRelations[]>();

    if (error || !data) {
        console.error("Error fetching posts:", error);
        throw error;
    }

    // Transform data into a type-safe structure
    return data;
};

export const getHabitStats = async (habitId: number): Promise<HabitInfo> => {
    const supabase = await createClient();
    // Récupération de l'habitude et ses complétions
    const habit_raw = await supabase
        .from(HABITS_TABLE)
        .select(
            `*, categoryObject:${HABIT_CATEGORY_TABLE}(*), frequency:${HABIT_FREQUENCY_TABLE}(*), completions: ${HABIT_COMPLETION_TABLE}(*)`,
        )
        .eq("id", habitId)
        .single();
    const habit = habit_raw.data;

    // On récupère les stats de l'habitude
    const habits_completions_service = new HabitCompletionService(
        [habit],
        habit.completions,
    );

    return habits_completions_service.getHabitInfos(habitId);
};

export const addHabit = async (habit_data: HabitCreate): Promise<void> => {
    const supabase = await createClient();
    const frequency = habit_data?.frequency;
    if (!frequency)
        throw new Error(
            "Erreur lors de l'ajout, il faut sélectionner au moins un jour.",
        );

    if (habit_data.id === -1) delete habit_data.id;
    delete habit_data.frequency;

    // On ajoute l'habitude et on récupère l'habitude créée.
    const { error, data } = await supabase
        .from(HABITS_TABLE)
        .upsert(habit_data)
        .select();

    if (error) {
        throw new Error("Error while inserting an habit.");
    }

    // On associe l'id de l'habitude crée à ses fréquences de répétition.
    frequency.map((freq) => (freq.id = data[0].id));

    // On insère les fréquences de répétition de l'habitude.
    const response = await supabase
        .from(HABIT_FREQUENCY_TABLE)
        .upsert(frequency);

    if (response.error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

    const days_ids = frequency.map((x) => x.day);
    const response2 = await supabase
        .from(HABIT_FREQUENCY_TABLE)
        .delete()
        .eq("id", data[0].id)
        .not("day", "in", `(${days_ids.join(",")})`);

    if (response2.error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const deleteHabit = async (habit_id: number): Promise<void> => {
    const supabase = await createClient();
    const { error } = await supabase
        .from(HABITS_TABLE)
        .delete()
        .eq("id", habit_id);

    if (error) {
        throw new Error("Error while delete an habit.");
    }
};

export const getHabitsCategories = async (): Promise<HabitCategory[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(HABIT_CATEGORY_TABLE)
        .select(`*`)
        .returns<HabitCategory[]>();

    if (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }

    return data;
};

export const completeHabit = async (habit_id: number): Promise<void> => {
    const supabase = await createClient();

    const date = startOfDay(new Date());
    const dateStr = formatISO(date);
    const habitStats = await getHabitStats(habit_id);

    let updateHabitMaxStreakRequest;
    if (habitStats.streak > habitStats.max_completions_streak) {
        updateHabitMaxStreakRequest = supabase
            .from(HABITS_TABLE)
            .update({ max_completions_streak: habitStats.streak })
            .eq("id", habit_id);
    }

    const completeHabitRequest = supabase
        .from(HABIT_COMPLETION_TABLE)
        .insert({ habit_id: habit_id, created_at: dateStr })
        .select();

    // Exécution parallèle
    await Promise.all([updateHabitMaxStreakRequest, completeHabitRequest]);
};

export const uncompleteHabit = async (habit_id: number): Promise<void> => {
    const supabase = await createClient();

    const date = startOfDay(new Date());
    const dateStr = formatISO(date);

    // On ajoute l'habitude et on récupère l'habitude créée.
    const { error } = await supabase
        .from(HABIT_COMPLETION_TABLE)
        .delete()
        .eq("habit_id", habit_id)
        .eq("created_at", dateStr);

    if (error) throw new Error("Erreur lors de l'invalidation de l'habitude");
};

export const getHabitsCompletions = async (
    habits_ids: number[],
): Promise<HabitCompletion[]> => {
    const supabase = await createClient();
    const one_month_ago = subMonths(new Date(), 1);

    const { data, error } = await supabase
        .from(HABIT_COMPLETION_TABLE)
        .select("*")
        .in("habit_id", habits_ids)
        .gt("created_at", one_month_ago.toISOString())
        .order("created_at", { ascending: true });

    if (error)
        throw new Error(
            "Erreur lors de la récupération de complétion d'habitudes",
        );

    return data;
};
