/**
 * @file crud.module.ts
 *
 * Module UI state cho CRUD — drawer, modal, deleteModal.
 * Dùng cho: màn hình có create / edit / delete với drawer hoặc modal.
 *
 * Yêu cầu kết hợp: base.module (cần selectedItem)
 */

import type { StoreApi } from "zustand";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type DrawerMode = "create" | "edit" | "view";

export type CRUDState = {
    isDrawerOpen: boolean;
    isModalOpen: boolean;
    isDeleteModalOpen: boolean;
    drawerMode: DrawerMode;
};

/**
 * CRUDActions<T> dùng selectedItem từ base.module.
 * Khi openDrawer/openModal/openDeleteModal truyền item vào,
 * nó sẽ set selectedItem — yêu cầu store phải include base.module.
 */
export type CRUDActions<T> = {
    openDrawer: (mode: DrawerMode, item?: T | null) => void;
    closeDrawer: () => void;
    openModal: (item?: T | null) => void;
    closeModal: () => void;
    openDeleteModal: (item?: T | null) => void;
    closeDeleteModal: () => void;
    resetUI: () => void;
};

export type CRUDSlice<T> = CRUDState & CRUDActions<T>;

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════════════════════════════

export function crudInitial(): CRUDState {
    return {
        isDrawerOpen: false,
        isModalOpen: false,
        isDeleteModalOpen: false,
        drawerMode: "create",
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLICE FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * set được cast về StoreApi<CRUDState & { selectedItem: T | null; selectedItems: T[]; error: string | null }>
 * vì crud cần ghi vào selectedItem (của base) khi open drawer/modal.
 */
type CRUDSetState<T> = StoreApi<
    CRUDState & { selectedItem: T | null; selectedItems: T[]; error: string | null }
>["setState"];

export function createCRUDSlice<T>(
    set: CRUDSetState<T>,
): CRUDActions<T> {
    return {
        openDrawer: (mode, item = null) =>
            set({ isDrawerOpen: true, drawerMode: mode, selectedItem: item }),

        closeDrawer: () =>
            set({ isDrawerOpen: false, selectedItem: null }),

        openModal: (item = null) =>
            set({ isModalOpen: true, selectedItem: item }),

        closeModal: () =>
            set({ isModalOpen: false, selectedItem: null }),

        openDeleteModal: (item = null) =>
            set({ isDeleteModalOpen: true, selectedItem: item }),

        closeDeleteModal: () =>
            set({ isDeleteModalOpen: false, selectedItem: null }),

        resetUI: () =>
            set({
                isDrawerOpen: false,
                isModalOpen: false,
                isDeleteModalOpen: false,
                drawerMode: "create",
                selectedItem: null,
                selectedItems: [],
                error: null,
            }),
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE
// ═══════════════════════════════════════════════════════════════════════════════

export const crudModule = {
    initial: crudInitial,
    createSlice: createCRUDSlice,
};