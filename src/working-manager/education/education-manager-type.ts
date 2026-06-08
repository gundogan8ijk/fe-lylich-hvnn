export type EducationManagerItemResponse = {
    educationId: string;
    graduatedAt: string;
    isPublic: boolean;
    degree: string;
    confirmedStatus: string;
    trainingName: string;
    majorName: string;
    proofUrl: string;
    lastModify: string;
    lecturerId: string;
    lecturerCode: string;
    fullName: string;
    avatarUrl: string | null;
};

export type EducationManagerDetailResponse = {
    educationId: string;
    graduatedAt: string;
    isPublic: boolean;
    confirmedStatus: string;
    degree: string;
    trainingName: string;
    majorName: string;
    proofUrl: string;
    lastModify: string;
    createdAt: string;
    lecturerId: string;
    lecturerCode: string;
    fullName: string;
    cccd: string;
    avatarUrl: string | null;
};
