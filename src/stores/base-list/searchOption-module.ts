import { StateCreator } from "zustand";
import { SearchOption } from "@/types/query-types";

export type SearchFieldSlice<T extends string> = {
    field: T;
    options: SearchOption<T>[];
    setField: (field: T) => void;
};

export const createSearchFieldSlice = <T extends string>(
    options: SearchOption<T>[],
    defaultField: T
): StateCreator<SearchFieldSlice<T>> => (set) => ({
    field: defaultField,
    options: options,

    setField: (field) =>
        set(() => ({
            field,
        })),
});