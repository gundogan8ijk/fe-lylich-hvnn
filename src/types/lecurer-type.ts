export type Education = {
    educationId:string;
    graduatedAt: string;
    status: EducationStatus;
    trainingName: string;
    degreeName: string;
};

export type Gender = "Male" | "Female";
export type EducationStatus = "Pending" | "Verified" | "Cancelled";

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