import { create } from "zustand";
import { EducationManagerItemResponse, EducationManagerDetailResponse } from "./education-manager-type";

interface EducationListManagerStore {
    data: EducationManagerItemResponse[];
    loading: boolean;
    setData: (data: EducationManagerItemResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const storeEducationListManager = create<EducationListManagerStore>()((set) => ({
    data: [],
    loading: false,
    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
}));

interface EducationDetailManagerStore {
    data: EducationManagerDetailResponse | null;
    isLoading: boolean;
    setData: (data: EducationManagerDetailResponse | null) => void;
    setLoading: (loading: boolean) => void;
}

export const storeEducationDetailManager = create<EducationDetailManagerStore>()((set) => ({
    data: null,
    isLoading: false,
    setData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
}));
