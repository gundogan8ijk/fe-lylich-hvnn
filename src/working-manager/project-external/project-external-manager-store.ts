import { create } from "zustand";
import { ProjectExternalMangerItemResponse, ProjectExternalManagerDetailResponse } from "./project-external-manager-type";

interface ProjectExternalListMangerStore {
    data: ProjectExternalMangerItemResponse[];
    loading: boolean;
    setData: (data: ProjectExternalMangerItemResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const storeProjectExternalListManger = create<ProjectExternalListMangerStore>()((set) => ({
    data: [],
    loading: false,
    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
}));

interface ProjectExternalDetailManagerStore {
    data: ProjectExternalManagerDetailResponse | null;
    isLoading: boolean;
    setData: (data: ProjectExternalManagerDetailResponse | null) => void;
    setLoading: (loading: boolean) => void;
}

export const storeProjectExternalDetailManager = create<ProjectExternalDetailManagerStore>()((set) => ({
    data: null,
    isLoading: false,
    setData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
}));
