import { create } from "zustand";
import { Lecturer } from "@/_types/lecurer-type";
import { BaseStore, createBaseStore } from "../base-state/base-store";
import { Education } from "@/_types/educationType";

type LecturerExtra = {
    addEducation: (edu: Education) => void;
    updateEducation: (edu: Education) => void;
    deleteEducation: (educationId: string) => void;
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

    updateEducation: (edu) =>
        set((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    educations: state.data.educations.map((x) =>
                        x.id === edu.id ? edu : x
                    ),
                },
            };
        }),

    deleteEducation: (educationId) =>
        set((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    educations: state.data.educations.filter(
                        (x) => x.id !== educationId
                    ),
                },
            };
        }),
}));