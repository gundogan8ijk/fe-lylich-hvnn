import { create } from 'zustand';
import { AwardManagerItemResponse, AwardDetailManagerResponse } from './award-manager-type';

interface AwardListManagerStore {
    data: AwardManagerItemResponse[];
    isLoading: boolean;
    setData: (data: AwardManagerItemResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const storeAwardListManager = create<AwardListManagerStore>()((set) => ({
    data: [],
    isLoading: false,
    setData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
}));

interface AwardDetailManagerStore {
    data: AwardDetailManagerResponse | null;
    isLoading: boolean;
    setData: (data: AwardDetailManagerResponse | null) => void;
    setLoading: (loading: boolean) => void;
}

export const storeAwardDetailManager = create<AwardDetailManagerStore>()((set) => ({
    data: null,
    isLoading: false,
    setData: (data) => set({ data }),
    setLoading: (isLoading) => set({ isLoading }),
}));
