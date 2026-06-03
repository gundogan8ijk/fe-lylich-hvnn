import { StateCreator } from "zustand";

export type BaseStore<T extends object> = {
    // ── DATA ──────────────────────────────────────────────
    data: T | null;
    setData: (data: T) => void;
    setNull: () => void;
    update: (partial: Partial<T>) => void;
    setField: <K extends keyof T>(key: K, value: T[K]) => void;
    setNullField: <K extends keyof T>(key: K) => void;
    updateLevel2: <K1 extends keyof T>(
        key1: K1,
        partialL2: T[K1] extends object ? Partial<T[K1]> : never
    ) => void;

    // ── LOADING ───────────────────────────────────────────
    isLoading: boolean;
    isAdding: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    setLoading: (v: boolean) => void;
    setAdding: (v: boolean) => void;
    setUpdating: (v: boolean) => void;
    setDeleting: (v: boolean) => void;

    // ── MODAL ─────────────────────────────────────────────
    openModals: Set<string>;
    openModal: (name: string) => void;
    closeModal: (name: string) => void;
    toggleModal: (name: string) => void;
    isModalOpen: (name: string) => boolean;
    closeAllModals: () => void;
};

export function createBaseStore<T extends object>(
    initial: T | null = null
): StateCreator<BaseStore<T>> {
    return (set, get) => ({
        // ── DATA ──────────────────────────────────────────────
        data: initial,
        setData: (data) => set({ data }),
        setNull: () => set({ data: null }),
        update: (partial) =>
            set((s) => ({ data: s.data ? { ...s.data, ...partial } : null })),
        setField: (key, value) =>
            set((s) => s.data ? { data: { ...s.data, [key]: value } } : s),
        setNullField: (key) =>
            set((s) => s.data ? { data: { ...s.data, [key]: null } } : s),
        updateLevel2: (key1, partialL2) =>
            set((s) => {
                if (!s.data || !s.data[key1]) return s;
                return { data: { ...s.data, [key1]: { ...(s.data[key1] as object), ...partialL2 } } };
            }),

        // ── LOADING ───────────────────────────────────────────
        isLoading: false,
        isAdding: false,
        isUpdating: false,
        isDeleting: false,
        setLoading: (v) => set({ isLoading: v }),
        setAdding: (v) => set({ isAdding: v }),
        setUpdating: (v) => set({ isUpdating: v }),
        setDeleting: (v) => set({ isDeleting: v }),

        // ── MODAL ─────────────────────────────────────────────
        openModals: new Set<string>(),
        openModal: (name) =>
            set((s) => ({ openModals: new Set(s.openModals).add(name) })),
        closeModal: (name) =>
            set((s) => {
                const next = new Set(s.openModals);
                next.delete(name);
                return { openModals: next };
            }),
        toggleModal: (name) =>
            set((s) => {
                const next = new Set(s.openModals);
                next.has(name) ? next.delete(name) : next.add(name);
                return { openModals: next };
            }),
        isModalOpen: (name) => get().openModals.has(name),
        closeAllModals: () => set({ openModals: new Set() }),
    });
}