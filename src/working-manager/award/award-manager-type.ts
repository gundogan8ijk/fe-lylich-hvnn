export interface AwardManagerItemResponse {
    awardId: string;
    awardsName: string;
    awardDate: string;
    isPublic: boolean;
    awardLevel: string;
    confirmedStatus: string;
    awardsDescription: string;
    proofUrl: string;
    lastModify: string;
    createAt: string;
    lecturerId: string;
    lecturerCode: string;
    fullName: string;
    avatarUrl: string | null;
}

export interface AwardDetailManagerResponse {
    awardId: string;
    awardsName: string;
    awardDate: string;
    isPublic: boolean;
    awardLevel: string;
    confirmedStatus: string;
    awardsDescription: string;
    proofUrl: string;
    lastModify: string;
    lecturerId: string;
    lecturerCode: string;
    fullName: string;
    avatarUrl: string | null;
}
