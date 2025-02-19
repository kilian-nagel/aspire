import {Tables} from "@/models/database.types";

export type HabitFrequencyCreate = Omit<Tables<'habitFrequency'>, 'created_at'>;

export interface Habit extends Tables<'habits'> {
    frequency?: Tables<'habitFrequency'>[];
    categoryObject: Tables<'habitCategory'>;
    completions: Tables<'habitCompletion'>[];
}

export interface HabitCreate extends Omit<Tables<'habits'>, 'created_at'> {
    frequency?: Omit<Tables<'habitFrequency'>, 'created_at'>[];
}

