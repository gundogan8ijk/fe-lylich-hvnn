import type { StateCreator } from "zustand";

type Slice<T> = StateCreator<T, [], [], T>;

export const composeSlices = <T>(
    ...slices: Slice<T>[]
): StateCreator<T, [], [], T> =>
(set, get, api) =>
    Object.assign(
        {},
        ...slices.map((slice) => slice(set, get, api))
    ) as T;