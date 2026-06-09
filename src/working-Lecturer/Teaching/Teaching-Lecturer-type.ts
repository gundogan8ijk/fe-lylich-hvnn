export interface TechinhInternalResponse {
    courseId: string;
    name: string;
}

export interface TechinhExternalResponse {
    techinhExternalId: string;
    name: string;
}

export interface GetDetailTeachingSubjectResponse {
    departmentId?: string;
    departmentCode?: string;
    departmentName?: string;
    disciplineAmount?: number;
    membersAmount?: number;
    departmentFoundedAt?: string;
    joinedAt?: string;
    position?: string;
    lecturerId: string;
    lecturerCode: string;
    fullName: string;
    birthDate: string;
    disciplineId?: string;
    code?: string;
    disciplineName?: string;
    disciplineMembersAmount?: number;
    techinhInternal?: TechinhInternalResponse[];
    techinhExternal: TechinhExternalResponse[];
    departmentAvatarUrl?: string;
    avatarLecturerUrl?: string;
    maxtechingInternal?: number;
    maxtechingExteranl?: number;
}

export interface DisciplineCourseDto {
    courseId: string;
    courseCode: string;
    courseName: string;
}
