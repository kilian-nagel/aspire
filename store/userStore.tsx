"use client";
import { User } from "@/models/users/users.types"
import { create } from 'zustand';
import { getAuthenticatedUser } from "@/utils/utils";
import { getFullUser } from '@/models/users/users.service';
import { useEffect } from "react";

interface UserData {
    user: User | null,
    setUser: (user: User) => void;
    loadData: () => void,
    loaded: boolean
}

// Create a store
export const userStore = create<UserData>((set, get) => ({
  user: null as User | null,
  loaded: false, // Add a loaded flag
  setUser: (user: User | null) => set({ user }),
  loadData: async () => {
    const { user, loaded } = get();

    // Avoid re-fetching data if already loaded
    if (loaded || user) return user;

    // Fetch authenticated user
    const authUser = await getAuthenticatedUser();
    if (!authUser) return null;

    // Fetch full user data
    const userData = await getFullUser(authUser.id);
    if (userData) {
      set({ user: userData, loaded: true }); // Update both user and loaded flag
    }

    return userData;
  },
}));

interface props {
    initialData: User
}

export const ClientStoreInitializer:React.FC<props> = ({initialData}) => {
  const setUserData = userStore((state) => state.setUser);

  useEffect(() => {
    setUserData(initialData);
  }, [initialData, setUserData]);

  return null;
};
