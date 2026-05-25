import { SelectionOption } from "@/_types/base-type/query-types";
import { StateCreator } from "zustand";

export type SelectionSlice<T extends string> = {
    field: T;
    options: SelectionOption<T>[];
    setField: (field: T) => void;
};

export const createSearchFieldSlice = <T extends string>(
    options: SelectionOption<T>[],
    defaultField: T
): StateCreator<SelectionSlice<T>> => (set) => ({
    field: defaultField,
    options: options,

    setField: (field) =>
        set(() => ({
            field,
        })),
});