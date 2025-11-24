import { create } from "zustand";
import type { userType } from "@/types/userResponse.type";

type authStore = {
  user: userType | null;
  initial: boolean;
  token: string | null;

  setInitial: (state: boolean) => void;
  setUser: (data: userType | null) => void;
  setAccessToken: (token: string | null) => void;
  logOut: () => void;
};

export const useUserStore = create<authStore>()((set) => ({
  user: null,
  initial: false,
  token: null,

  setInitial: (state) => set({ initial: state }),
  setUser: (data) => set({ user: data }),
  setAccessToken: (token) => set({ token }),
  logOut: () => set({ user: null, token: null }),
}));
