import { Gender } from "@/_constants/base-constant";
import { AwardLecturer } from "@/working-Lecturer/profile/Award/Award-Lecturer-type";
import { EducationLecturer } from "@/working-Lecturer/profile/Educaion/Eduction-Lecturer-type";

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

