import { create } from "zustand";

type State = {
    date: Date | undefined;
    name: string | undefined;
    email: string | undefined;
    subject: string | undefined;
    time: string | undefined;
    setDate: (date: Date | undefined) => void;
    setName: (name: string | undefined) => void;
    setEmail: (email: string | undefined) => void;
    setSubject: (subject: string | undefined) => void;
    setTime: (time: string | undefined) => void;
};

export const useCalendarStore = create<State>((set) => ({
    date: new Date(),
    name: "",
    email: "",
    subject: "",
    time: "",
    setDate: (date: Date | undefined) => set({ date }),
    setName: (name: string | undefined) => set({ name }),
    setEmail: (email: string | undefined) => set({ email }),
    setSubject: (subject: string | undefined) => set({ subject }),
    setTime: (time: string | undefined) => set({ time }),
}));
