import { api } from "@/_Common/_services/axios-service-config";
import axios from "axios";

export interface BackgroundLecturerResponse {
    lecturerId: string;
    code: string;
    fullName: string;
    gender: string;
    birthDate: string;
    phoneNumber: string | null;
    address: string | null;
    email: string | null;
    avatarUrl: string | null;
    department: DepartmentRecord;
    discipline: DisciplineRecord;
    educations: EducationRecord[];
    awards: AwardRecord[];
    teachingSubjects: TeachingSubjectRecord[];
    teachingExternalSubjects: TeachingExternalSubjectRecord[];
    books: BookRecord[];
    articles: ArticleRecord[];
    projectExternals: ProjectExternalRecord[];
    projects: ProjectRecord[];
}

export interface DepartmentRecord {
    departmentId: string;
    departmentName: string;
    departmentCode: string;
}

export interface DisciplineRecord {
    disciplineId: string;
    disciplineCode: string;
    disciplineName: string;
}

export interface EducationRecord {
    educationId: string;
    graduatedAt: string;
    trainingName: string;
    majorName: string;
}

export interface AwardRecord {
    awardId: string;
    awardsName: string;
    awardDate: string;
    level: string;
}

export interface TeachingSubjectRecord {
    courseId: string;
    name: string;
}

export interface TeachingExternalSubjectRecord {
    courseId: string;
    name: string;
}

export interface BookRecord {
    bookId: string;
    title: string;
    publishYear: string;
}

export interface ArticleRecord {
    articleId: string;
    title: string;
    publishedAt: string;
}

export interface ProjectExternalRecord {
    projectId: string;
    title: string;
    code: string;
    level: string;
    completionAt: string;
    evaluation: string;
}

export interface ProjectRecord {
    projectId: string;
    title: string;
    code: string;
    level: string;
    completionAt: string;
    evaluation: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export const getBackground = async (): Promise<BackgroundLecturerResponse | null> => {
    try {
        const response = await api.get<BackgroundLecturerResponse>("/lecturer/background");
        if (response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API Error: ", error.response?.data);
        }
        return null;
    }
};
