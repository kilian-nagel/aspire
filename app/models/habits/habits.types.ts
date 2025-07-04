import { Tables } from "@/models/database.types";
export type HabitFrequencyCreate = Omit<Tables<"habitFrequency">, "created_at">;
import { HABIT_COMPLETION_TABLE } from "@/utils/constants";

type HabitCompletion = Tables<typeof HABIT_COMPLETION_TABLE>;

export type Habit = Tables<"habits">;
export type HabitCategory = Tables<"habitCategory">;

export interface HabitCreate
    extends Omit<Tables<"habits">, "created_at" | "id"> {
    id?: number;
    frequency?: Omit<Tables<"habitFrequency">, "created_at">[];
}

export interface HabitInfo
    extends Omit<HabitCompletion, "performance" | "habit_id"> {
    name: string;
    category: string;
    days_has_to_be_completed: number[];

    streak: number;
    max_completions: number;
    max_streak?: number | null;
    max_completions_streak: number;
    total_completions: number;
    completion_rate: number;
    monthlyData: { day: number; completed: number }[];

    lastWeek: boolean[];
    last_completion_date: Date;
}
