import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum Language {
    EN = "en",
    SV = "sv",
    FI = "fi"
}

export interface LanguageStore {
    lang: Language;
    setLang: (lang: Language) => void;
}

export const useLangStore = create<LanguageStore>()(persist(
    (set) => ({
    lang: Language.EN,
    setLang: (lang) => set({lang})
}),
{
    name: "lang-store",
    storage: createJSONStorage(() => localStorage),
}) 
)
