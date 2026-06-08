import { create } from 'zustand';
import { BackgroundByManagerResponse } from './lecturer-manger-type';

interface LecturerDetailManagerStore {
    background: BackgroundByManagerResponse | null;
    isLoading: boolean;
    setBackground: (data: BackgroundByManagerResponse | null) => void;
    setIsLoading: (loading: boolean) => void;
}

export const useLecturerDetailManagerStore = create<LecturerDetailManagerStore>((set) => ({
    background: null,
    isLoading: false,
    setBackground: (data) => set({ background: data }),
    setIsLoading: (loading) => set({ isLoading: loading }),
}));
