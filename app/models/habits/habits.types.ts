import { Tables } from "@/models/database.types";
export type HabitFrequencyCreate = Omit<Tables<"habitFrequency">, "created_at">;

type HabitCompletion = Tables<typeof HABIT_COMPLETION_TABLE>;

export interface Habit extends Tables<"Habits"> {
    frequency?: Tables<"habitFrequency">[];
    categoryObject?: Tables<"habitCategory">;
    completions?: Tables<"habitCompletion">[];
}

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
    total_completions: number;
    completion_rate: number;
    monthlyData: { day: number; completed: number }[];

    lastWeek: boolean[];
    last_completion_date: Date;
}
