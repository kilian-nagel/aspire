"use client";
import {Habit} from "@/models/habits/habits.types";
import {create} from 'zustand';
import {getAuthenticatedUser} from "@/utils/utils";
import {getUserHabits, HabitWithRelations} from '@/models/habits/habits.service';
import {useEffect} from "react";

interface HabitData {
    habits: HabitWithRelations[] | null,
    loaded: boolean,
    setHabits: (habits: HabitWithRelations[]) => void,
    loadData: () => void
}

// Create a store
export const habitStore = create<HabitData>()(
    (set, get) => ({
        habits: null,
        loaded: false,
        setHabits: (habits: HabitWithRelations[]) => set({habits}),
        loadData: async () => {

            // Fetch authenticated habit
            const authUser = await getAuthenticatedUser();
            if (!authUser) return null;

            // Fetch full habit data
            const habitData = await getUserHabits(authUser.id);
            if (habitData) {
                set({habits: habitData, loaded: true}); // Update both user and loaded flag
            }

            return habitData;
        },
    })
);

interface props {
    initialData: HabitWithRelations[]
}

export const HabitsStoreInitializer: React.FC<props> = ({initialData}) => {
    const setHabits = habitStore((state) => state.setHabits);
    const loadHabitsData = habitStore((state) => state.loadData);

    useEffect(() => {
        setHabits(initialData);
        loadHabitsData();
    }, [initialData, setHabits]);

    return null;
};
