import { create } from "zustand";

type User = {
    id: string;
    email: string;
};

type UserState = {
    user: User | null;
    fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    fetchUser: async () => {
        try {
            const res = await fetch("/api/users/me");
            if (res.ok) {
                const data = await res.json();
                set({ user: data });
            } else {
                set({ user: null });
            }
        } catch {
            set({ user: null });
        }
    },
}));