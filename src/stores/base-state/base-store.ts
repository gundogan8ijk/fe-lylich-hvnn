import { StateCreator } from "zustand";

export type BaseStore<T extends object> = {
    data: T | null;
    isLoading: boolean;
    setLoading: (v: boolean) => void;
    setData: (data: T) => void;
    setNull: () => void;
    update: (partial: Partial<T>) => void;
    setField: <K extends keyof T>(key: K, value: T[K]) => void;

    updateLevel2: <K1 extends keyof T>(
        key1: K1,
        partialL2: T[K1] extends object ? Partial<T[K1]> : never
    ) => void;
};

export function createBaseStore<T extends object>(
    initial: T | null = null
): StateCreator<BaseStore<T>> {
    return (set) => ({
        data: initial,
        isLoading: false,
        setLoading: (v) => set({ isLoading: v }),
        setData: (data) => set({ data }),
        setNull: () => set({ data: null }),
        update: (partial) =>
            set((state) => ({
                data: state.data ? { ...state.data, ...partial } : null,
            })),
        setField: (key, value) =>
            set((state) => {
                if (!state.data) return state;
                return { data: { ...state.data, [key]: value } };
            }),

        updateLevel2: (key1, partialL2) =>
            set((state) => {
                if (!state.data || !state.data[key1]) return state;
                return {
                    data: {
                        ...state.data,
                        [key1]: {
                            ...(state.data[key1] as object),
                            ...partialL2
                        }
                    }
                };
            }),
    });
}