import { Pagination } from "@/_Common/_types/pagination-typeConfig";

// ── Activities ────────────────────────────────────────────

export interface PublicActivityItem {
    id: string;
    title: string;
    description: string | null;
    date: string | null;
    type: string;
}

export interface PublicActivitiesResponse {
    items: PublicActivityItem[];
    pagination: Pagination;
}

// ── Awards ────────────────────────────────────────────────

export interface PublicAwardItem {
    awardId: string;
    awardName: string;
    awardLevel: string;
    awardDate: string;
    lecturerId: string;
    lecturerName: string;
    avatarUrl: string | null;
}

export interface PagedAwardsResponse {
    items: PublicAwardItem[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}
