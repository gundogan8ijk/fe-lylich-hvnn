import { BaseSlice, createBaseSlice } from "../_stores/base-list/base-module";
import { create } from "zustand";
import { ProjectLecturerItems } from "./projects-lecturer-list-type";

type ProjectLecturerListExtra = {
    clear: () => void;
};

export type ProjectLecturerListStore = BaseSlice<ProjectLecturerItems> & ProjectLecturerListExtra;

export const storeProjectLecturerList =
    create<ProjectLecturerListStore>()(
        (set, get, api) => ({
            ...createBaseSlice<ProjectLecturerItems>()(set, get, api),

            clear: () => {
                set({
                    data: []
                });
            }
        })
    );