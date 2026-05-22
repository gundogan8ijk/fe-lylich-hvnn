import { create } from "zustand";
import { Lecturer, Education } from "@/types/lecurer-type";
import { BaseStore, createBaseStore } from "../base-state/base-store";

type LecturerExtra = {
    addEducation: (edu: Education) => void;
};

type LecturerState = BaseStore<Lecturer> & LecturerExtra;

export const storeLecturer = create<LecturerState>((set, get, api) => ({
    ...createBaseStore<Lecturer>()(set, get, api),

    addEducation: (edu) =>
        set((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    educations: [...state.data.educations, edu],
                },
            };
        }),
}));