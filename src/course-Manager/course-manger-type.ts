import { MembersRecord } from "../discipline-Manager/discipline-manger-type";

export interface Credits {
    total: number;
    theory: number;
    practice: number;
}

export interface CourseDetailPublic {
    courseId: string;
    name: string;
    code: string;
    describe: string;
    ispublic: boolean;
    createdAt: string;
    credits: Credits;
    disciplineId: string;
    departmentId: string;
    techchinhs: MembersRecord[];
}
