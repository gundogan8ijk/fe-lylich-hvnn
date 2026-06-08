import { create } from 'zustand';
import { BackgroundLecturerResponse } from './Background-ser';

interface BackgroundStore {
    background: BackgroundLecturerResponse | null;
    isLoading: boolean;
    setBackground: (data: BackgroundLecturerResponse | null) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useBackgroundStore = create<BackgroundStore>((set) => ({
    background: null,
    isLoading: false,
    setBackground: (data) => set({ background: data }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));
