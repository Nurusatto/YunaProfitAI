import { create } from "zustand";
import type { userType } from "@/types/userResponse.type";

type authStore = {
  user: userType | null;
  isInitialized: boolean;
  token: string | null;

  setIsInitialized: (state: boolean) => void;
  setUser: (data: userType | null) => void;
  setAccessToken: (token: string | null) => void;
  logOut: () => void;
};

export const useUserStore = create<authStore>()((set) => ({
  user: null,
  isInitialized: false,
  token: null,

  setIsInitialized: (state) => set({ isInitialized: state }),
  setUser: (data) => set({ user: data }),
  setAccessToken: (token) => set({ token }),
  logOut: () => set({ user: null, token: null }),
}));
