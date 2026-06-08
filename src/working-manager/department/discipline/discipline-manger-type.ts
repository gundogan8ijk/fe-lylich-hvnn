export interface DisciplineDetailPublic {
    disciplineId: string;
    disciplineName: string;
    disciplineDescribe: string;
    isPublish: boolean;
    createdAt: string;
    totalCredits: number;
    coreDepartmentId: string;
    code: string;
    name: string; // Department name
    memberAmount: number;
    courseAmount: number;
}

export interface CourseRecord {
    id: string;
    name: string;
    code: string;
}

export interface Pagination {
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
}

export interface CourseListResponse {
    items: CourseRecord[];
    pagination: Pagination;
}

export interface MembersRecord {
    id: string;
    fullName: string;
    lecturerCode: string;
    disciplineName: string;
    position: string;
    joinedAt: string;
    avatarUrl: string | null;
}

export interface MemberListResponse {
    items: MembersRecord[];
    pagination: Pagination;
}

export interface AddCourseRequest {
    name: string;
    describe: string;
    theory: number;
    practice: number;
}

