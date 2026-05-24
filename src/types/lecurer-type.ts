import { Gender } from "@/constants/base-constant";
import { Education } from "./educationType";

export type Lecturer = {
    id: string;
    code: string;
    lastName: string;
    firstName: string;
    gender: Gender;
    birthDate: string;

    cccd: string;

    educations: Education[];

    phoneNumber: string;
    address: string;
    email: string;
    website: string;
    avatarUrl: string;
};