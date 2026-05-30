import { Gender } from "@/constants/base-constant";
import { EducationLecturer } from "@/Educaion-Lecturer/Eduction-Lecturer-type";

export type LecturerProfile = {
    id: string;
    code: string;
    lastName: string;
    firstName: string;
    gender: Gender;
    birthDate: string;

    cccd: string;

    educations: EducationLecturer[];

    phoneNumber: string;
    address: string;
    email: string;
    website: string;
    avatarUrl: string;
};

export type LecturersNameItems = {
    id: string;
    code: string;
    name:string;
};