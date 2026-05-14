// base.slice.ts
import type { StateCreator } from "zustand";

export type BaseState<T> = {
    data: T[];
    selectedItem: T | null;
    selectedItems: T[];
    loading: boolean;
    submitting: boolean;
    deleting: boolean;
    error: string | null;
};

export type BaseActions<T> = {
    setData: (value: T[]) => void;
    appendData: (value: T[]) => void;
    prependData: (value: T[]) => void;
    addItem: (item: T) => void;
    updateItem: (
        predicate: (item: T) => boolean,
        updater: Partial<T> | ((item: T) => T),
    ) => void;
    removeItem: (predicate: (item: T) => boolean) => void;

    setSelectedItem: (item: T | null) => void;
    setSelectedItems: (items: T[]) => void;
    toggleSelectItem: (item: T, key: keyof T) => void;
    clearSelection: () => void;

    setLoading: (v: boolean) => void;
    setSubmitting: (v: boolean) => void;
    setDeleting: (v: boolean) => void;
    setError: (v: string | null) => void;

    reset: () => void;
};

export type BaseSlice<T> = BaseState<T> & BaseActions<T>;

export const createBaseSlice =
<T>(): StateCreator<BaseSlice<T>, [], [], BaseSlice<T>> =>
(set, get) => ({
    data: [],
    selectedItem: null,
    selectedItems: [],
    loading: false,
    submitting: false,
    deleting: false,
    error: null,

    setData: (value) => set({ data: value }),

    appendData: (value) =>
        set((s) => ({ data: [...s.data, ...value] })),

    prependData: (value) =>
        set((s) => ({ data: [...value, ...s.data] })),

    addItem: (item) =>
        set((s) => ({ data: [item, ...s.data] })),

    updateItem: (predicate, updater) =>
        set((s) => ({
            data: s.data.map((item) =>
                predicate(item)
                    ? typeof updater === "function"
                        ? updater(item)
                        : { ...item, ...updater }
                    : item
            ),
        })),

    removeItem: (predicate) =>
        set((s) => ({
            data: s.data.filter((item) => !predicate(item)),
        })),

    setSelectedItem: (item) => set({ selectedItem: item }),
    setSelectedItems: (items) => set({ selectedItems: items }),

    toggleSelectItem: (item, key) =>
        set((s) => {
            const exists = s.selectedItems.some(
                (i) => i[key] === item[key]
            );

            return {
                selectedItems: exists
                    ? s.selectedItems.filter((i) => i[key] !== item[key])
                    : [...s.selectedItems, item],
            };
        }),

    clearSelection: () =>
        set({ selectedItem: null, selectedItems: [] }),

    setLoading: (v) => set({ loading: v }),
    setSubmitting: (v) => set({ submitting: v }),
    setDeleting: (v) => set({ deleting: v }),
    setError: (v) => set({ error: v }),

    reset: () => {
        const state = get();
        set({
            ...state,
            data: [],
            selectedItem: null,
            selectedItems: [],
            loading: false,
            submitting: false,
            deleting: false,
            error: null,
        });
    },
});