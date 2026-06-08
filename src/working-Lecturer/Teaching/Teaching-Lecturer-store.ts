import { create } from "zustand";
import { GetDetailTeachingSubjectResponse, DisciplineCourseDto } from "./Teaching-Lecturer-type";

interface TeachingStore {
    data: GetDetailTeachingSubjectResponse | null;
    disciplineCourses: DisciplineCourseDto[];
    isLoading: boolean;
    isSubmitting: boolean;

    setData: (data: GetDetailTeachingSubjectResponse | null) => void;
    setDisciplineCourses: (courses: DisciplineCourseDto[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useTeachingStore = create<TeachingStore>((set) => ({
    data: null,
    disciplineCourses: [],
    isLoading: false,
    isSubmitting: false,

    setData: (data) => set({ data }),
    setDisciplineCourses: (disciplineCourses) => set({ disciplineCourses }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
