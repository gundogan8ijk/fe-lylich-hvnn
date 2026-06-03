import { Gender } from "@/_constants/base-constant";
import { AwardLecturer } from "@/Award-Lecturer/Award-Lecturer-type";
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
    awards: AwardLecturer[];

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