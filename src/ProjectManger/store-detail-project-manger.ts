import { create } from "zustand";

import {
    ProjectManagerDetailRecord,
    ProjectFundingItemRecord,
    ProjectContributorRecord,
    ProjectParticipantRecord,
    ProjectDisciplineRecord,
} from "@/ProjectManger/type-detail-projects-manger"
import { BaseStore, createBaseStore } from "@/_Common/_stores/base-store";

type ProjectManagerExtra = {
    addFunding: (funding: ProjectFundingItemRecord) => void;
    updateFunding: (
        index: number,
        funding: ProjectFundingItemRecord
    ) => void;
    deleteFunding: (index: number) => void;

    addContributor: (contributor: ProjectContributorRecord) => void;
    updateContributor: (contributor: ProjectContributorRecord) => void;
    deleteContributor: (contributorId: string) => void;

    addParticipant: (participant: ProjectParticipantRecord) => void;
    updateParticipant: (participant: ProjectParticipantRecord) => void;
    deleteParticipant: (participantId: string) => void;

    addDiscipline: (discipline: ProjectDisciplineRecord) => void;
    deleteDiscipline: (disciplineId: string) => void;
};

type ProjectManagerState =
    BaseStore<ProjectManagerDetailRecord> &
    ProjectManagerExtra;

export const storeProjectManagerDetail = create<ProjectManagerState>(
    (set, get, api) => ({
        ...createBaseStore<ProjectManagerDetailRecord>()(set, get, api),

        addFunding: (funding) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        funding: [...state.data.funding, funding],
                    },
                };
            }),

        updateFunding: (index, funding) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        funding: state.data.funding.map((x, i) =>
                            i === index ? funding : x
                        ),
                    },
                };
            }),

        deleteFunding: (index) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        funding: state.data.funding.filter(
                            (_, i) => i !== index
                        ),
                    },
                };
            }),

        addContributor: (contributor) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        contributors: [
                            ...state.data.contributors,
                            contributor,
                        ],
                    },
                };
            }),

        updateContributor: (contributor) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        contributors: state.data.contributors.map((x) =>
                            x.id === contributor.id ? contributor : x
                        ),
                    },
                };
            }),

        deleteContributor: (contributorId) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        contributors: state.data.contributors.filter(
                            (x) => x.id !== contributorId
                        ),
                    },
                };
            }),

        addParticipant: (participant) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        participants: [
                            ...state.data.participants,
                            participant,
                        ],
                    },
                };
            }),

        updateParticipant: (participant) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        participants: state.data.participants.map((x) =>
                            x.id === participant.id ? participant : x
                        ),
                    },
                };
            }),

        deleteParticipant: (participantId) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        participants: state.data.participants.filter(
                            (x) => x.id !== participantId
                        ),
                    },
                };
            }),

        addDiscipline: (discipline) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        baseInfo: {
                            ...state.data.baseInfo,
                            disciplines: [
                                ...state.data.baseInfo.disciplines,
                                discipline,
                            ],
                        },
                    },
                };
            }),

        deleteDiscipline: (disciplineId) =>
            set((state) => {
                if (!state.data) return state;

                return {
                    data: {
                        ...state.data,
                        baseInfo: {
                            ...state.data.baseInfo,
                            disciplines:
                                state.data.baseInfo.disciplines.filter(
                                    (x) => x.id !== disciplineId
                                ),
                        },
                    },
                };
            }),
    })
);