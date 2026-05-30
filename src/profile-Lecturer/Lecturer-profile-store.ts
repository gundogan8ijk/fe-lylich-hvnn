import { create } from "zustand";
import { EducationLecturer } from "@/Educaion-Lecturer/Eduction-Lecturer-type";
import { BaseStore, createBaseStore } from "@/_stores/base-store";
import { LecturerProfile } from "./Profile-lecurer-type";

type LecturerProfileExtra = {
    addEducation: (edu: EducationLecturer) => void;
    updateEducation: (edu: EducationLecturer) => void;
    deleteEducation: (educationId: string) => void;
};

type LecturerProfileState = BaseStore<LecturerProfile> & LecturerProfileExtra;

export const storeLecturerProfile = create<LecturerProfileState>((set, get, api) => ({
    ...createBaseStore<LecturerProfile>()(set, get, api),

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