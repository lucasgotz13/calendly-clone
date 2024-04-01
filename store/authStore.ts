import { create } from "zustand"

type State = {
  username: string
  password: string
  isUserValid: boolean | null
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  setIsUserValid: (isUserValid: boolean | null) => void
}

export const useAuthStore = create<State>((set) => ({
  username: "",
  password: "",
  isUserValid: null,
  setUsername: (username: string) => set({ username }),
  setPassword: (password: string) => set({ password }),
  setIsUserValid: (isUserValid: boolean | null) => set({ isUserValid })
}))
