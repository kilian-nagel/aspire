"use client";
import {Habit} from "@/models/habits/habits.types";
import {create} from 'zustand';
import {getAuthenticatedUser} from "@/utils/utils";
import {getUserHabits} from '@/models/habits/habits.service';
import {useEffect} from "react";
import {persist} from 'zustand/middleware';

interface HabitData {
    habits: Habit[] | null,
    loaded: boolean,
    setHabits: (habits: Habit[]) => void,
    loadData: () => void
}

// Create a store
export const habitStore = create<HabitData>()(
    persist(
        (set, get) => ({
            habits: null,
            loaded: false,
            setHabits: (habits: Habit[]) => set({habits}),
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
        }),
        {
            name: 'habit-store', // Name for the persisted data in storage
        }
    )
);

interface props {
    initialData: Habit[]
}

export const HabitsStoreInitializer: React.FC<props> = ({initialData}) => {
    const setHabits = habitStore((state) => state.setHabits);

    useEffect(() => {
        setHabits(initialData);
    }, [initialData, setHabits]);

    return null;
};
