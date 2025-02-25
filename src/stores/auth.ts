import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthStoreState {
	authenticated: boolean;
	setAuthenticated: (authenticated: boolean) => void;
	token?: string;
	setToken: (token: string | undefined) => void;
}

export const useAuthStore = create<AuthStoreState>()(
	persist(
		(set) => ({
			authenticated: false,
			setAuthenticated: (authenticated) => set({ authenticated }),
			token: undefined,
			setToken: (token) => set({ token }),
		}),
		{
			name: "auth-store",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
