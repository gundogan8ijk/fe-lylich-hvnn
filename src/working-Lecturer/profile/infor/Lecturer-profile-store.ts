import { create } from "zustand";
import { EducationLecturer } from "@/working-Lecturer/profile/Educaion/Eduction-Lecturer-type";
import { BaseStore, createBaseStore } from "@/_Common/_stores/base-store";
import { LecturerProfile } from "./Profile-lecurer-type";
import { AwardLecturer } from "@/working-Lecturer/profile/Award/Award-Lecturer-type";

type LecturerProfileExtra = {
    // --- Education Actions ---
    addEducation: (edu: EducationLecturer) => void;
    updateEducation: (edu: EducationLecturer) => void;
    deleteEducation: (educationId: string) => void;

    // --- Award Actions ---
    addAward: (award: AwardLecturer) => void;
    updateAward: (award: AwardLecturer) => void;
    deleteAward: (awardId: string) => void;
};

type LecturerProfileState = BaseStore<LecturerProfile> & LecturerProfileExtra;

export const storeLecturerProfile = create<LecturerProfileState>((set, get, api) => ({
    ...createBaseStore<LecturerProfile>()(set, get, api),

    // ==========================================
    // EDUCATION HANDLERS
    // ==========================================
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

    // ==========================================
    // AWARD HANDLERS
    // ==========================================
    addAward: (award) =>
        set((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    awards: [...(state.data.awards || []), award], // Thêm phòng hờ nếu mảng awards ban đầu bị undefined
                },
            };
        }),

    updateAward: (award) =>
        set((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    awards: (state.data.awards || []).map((x) =>
                        x.id === award.id ? award : x
                    ),
                },
            };
        }),

    deleteAward: (awardId) =>
        set((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    awards: (state.data.awards || []).filter(
                        (x) => x.id !== awardId
                    ),
                },
            };
        }),
}));