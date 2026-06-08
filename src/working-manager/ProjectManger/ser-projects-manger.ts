import { api } from "@/_Common/_services/axios-service-config"
import { ApiResponse } from "@/_Common/_types/result-typeConfig"
import { ProjectManagerDetailRecord } from "@/working-manager/ProjectManger/type-detail-projects-manger"
import { fail, success } from "@/_lib/response-helper"
import axios from "axios"
import { MangerProjectItems, MangerProjectItemsList } from "./type-list-projects-manger"
import { ConfirmedStatus } from "@/_constants/base-constant"

export {
    //comon
    deleteManagerProjectApi,
    //list
    createProjectApi, getMangerProjectListApi,
    //detail
    getProjectManagerDetailApi, updateConfirmedProjectDetailApi, updateBaseInfoProjectMangerApi,
    addDisciplinesByMangerApi, deleteDisciplineByManagerApi, updateTimeEndProjectMangerApi,
    updateTimeAndLevelProjectMangerApi,
    
    // new manager APIs
    updateProjectStatusApi,
    hideProjectMangerApi,
    updateProjectEvaluationApi,
    updateCertificateUrlApi,
    deleteCertificateUrlApi,
    updateDetailUrlApi,
    deleteDetailUrlApi,
    addContributorByManagerApi,
    deleteContributorByManagerApi,
    addParticipantByManagerApi,
    updateParticipantByManagerApi,
    deleteParticipantByManagerApi,
    addFundingByManagerApi,
    deleteFundingByManagerApi
}

export type CreateProjectForm = {
    Title: string
    Describe: string
    Level: string
    DisciplineIds: string[]
    LeaderId: string | null
    StartDate: string
    EndDate: string
}

const createProjectApi = async (form: CreateProjectForm): Promise<ApiResponse<MangerProjectItems>> => {
    try {
        const detailUrl = "/research-projects/create"
        const res = await api.post(detailUrl, form);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


const deleteManagerProjectApi = async (
    id: string
): Promise<ApiResponse<void>> => {
    try {
        const url = `/research-projects/management/${id}`;
        const res = await api.delete(url);
        return success(res.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


const getProjectManagerDetailApi = async (
    id: string
): Promise<ApiResponse<ProjectManagerDetailRecord>> => {
    try {
        const response = await api.get(
            `/manager/projects/${id}`
        );
        const dto = response.data;
        const record: ProjectManagerDetailRecord = {
            id: dto.id,
            code: dto.code,
            confirmed: dto.confirmedStatus,
            status: dto.projectStatus,
            creator: dto.lecturerCreateName || "Quản trị viên",
            level: dto.level,
            lastModify: dto.lastModify,
            evaluation: dto.evaluation,
            certificateUrl: dto.certificateUrl,
            detailUrl: dto.detailUrl,
            isPublic: dto.isPublic,
            baseInfo: {
                title: dto.title,
                describe: dto.describe,
                timeRange: dto.timeStart && dto.timeEnd ? {
                    start: dto.timeStart,
                    end: dto.timeEnd
                } : null,
                disciplines: (dto.disciplines || []).map((d: { id: string; code: string; name: string }) => ({
                    id: d.id,
                    code: d.code,
                    name: d.name
                }))
            },
            contributors: (dto.contributors || []).map((c: { id: string; code: string; fullName: string; status: string; joinedAt: string }) => ({
                id: c.id,
                code: c.code,
                name: c.fullName,
                status: c.status,
                joinedAt: c.joinedAt
            })),
            participants: (dto.participants || []).map((p: { id: string; fullName: string; joinedAt: string; role: string; email: string }) => ({
                id: p.id,
                name: p.fullName,
                joinedAt: p.joinedAt,
                role: p.role,
                email: p.email
            })),
            funding: (dto.fundings || []).map((f: { source: string; description: string; amount: number }) => ({
                source: f.source,
                description: f.description,
                amount: f.amount
            })),
            permissions: {
                canUpdateBase: dto.isManagerCreate && dto.confirmedStatus?.toLowerCase() === "draft",
                canTogglePublic: dto.confirmedStatus?.toLowerCase() !== "draft",
                canUpdateTimeAndLevel: dto.confirmedStatus?.toLowerCase() === "cancelled" || dto.projectStatus?.toLowerCase() === "pending" || (dto.isManagerCreate && dto.confirmedStatus?.toLowerCase() === "draft"),
                canUpdateConfirmed: dto.lecturerCreateId 
                    ? dto.confirmedStatus?.toLowerCase() === "pending" 
                    : dto.confirmedStatus?.toLowerCase() === "draft",
                canUpdateStatus: dto.confirmedStatus?.toLowerCase() === "verified" || dto.projectStatus?.toLowerCase() === "inprogress" || dto.projectStatus?.toLowerCase() === "underreview",
                canUpdateTimeEnd: dto.projectStatus?.toLowerCase() === "inprogress" && dto.confirmedStatus?.toLowerCase() !== "cancelled",
                canUpdateEvaluation: dto.projectStatus?.toLowerCase() === "completed" && dto.evaluation?.toLowerCase() === "notset",
                canUpdateCertificateUrl: dto.evaluation?.toLowerCase() !== "notset" && dto.evaluation?.toLowerCase() !== "fail",
                canUpdateDetailUrl: dto.evaluation?.toLowerCase() !== "notset" && dto.evaluation?.toLowerCase() !== "fail",
                canUpdateFunding: dto.projectStatus?.toLowerCase() === "pending" || dto.projectStatus?.toLowerCase() === "inprogress",
                canUpdateContributors: dto.projectStatus?.toLowerCase() === "pending" || dto.projectStatus?.toLowerCase() === "inprogress",
                canDeleteProject: dto.isManagerCreate && (dto.confirmedStatus?.toLowerCase() === "draft" || dto.confirmedStatus?.toLowerCase() === "cancelled"),
                maxFunding: dto.maxFundings || 4,
                maxContributors: dto.maxContributors || 5,
                maxParticipants: dto.maxParticipants || 5,
                maxDisciplines: dto.maxDisciplines || 4
            }
        };

        return success(record);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const getMangerProjectListApi = async (params?: URLSearchParams)
    : Promise<ApiResponse<MangerProjectItemsList>> => {
    try {
        const detailUrl = "/research-projects/manger"
        const response = await api.get(detailUrl, {
            params: params
        });

        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateConfirmedProjectDetailApi = async (id: string, confirmed: { confirmedStatus: ConfirmedStatus })
    : Promise<ApiResponse<null>> => {
    try {
        // Correct backend put route is verify/reject instead of confirmed-status
        const action = confirmed.confirmedStatus === "Verified" ? "verify" : "reject";
        const detailUrl = `/manager/projects/${id}/${action}`;
        const response = await api.put(detailUrl, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


export type UpdateBaseInfoProjectMangerForm = {
    Title: string
    Describe: string
    Level: string
    StartDate: string
    EndDate: string
}

const updateBaseInfoProjectMangerApi = async (id: string, form: { Title: string; Describe: string }): Promise<ApiResponse<null>> => {
    try {
        const detailUrl = `/research-projects/${id}/base-info`;
        const response = await api.put(detailUrl, form);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateTimeAndLevelProjectMangerApi = async (id: string, form: { Level: string; StartDate: string; EndDate: string }): Promise<ApiResponse<null>> => {
    try {
        const detailUrl = `/manager/projects/${id}/time-level`;
        const response = await api.put(detailUrl, form);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const addDisciplinesByMangerApi = async (id: string, disciplineIds: string[]): Promise<ApiResponse<null>> => {
    try {
        const url = `/research-projects/${id}/disciplines`;
        const response = await api.put(url, { disciplineIds });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};


const deleteDisciplineByManagerApi = async (
    id: string,
    disciplineId: string
): Promise<ApiResponse<null>> => {
    try {
        const url = `/research-projects/${id}/disciplines/${disciplineId}`;
        const response = await api.delete(url);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateTimeEndProjectMangerApi = async (id: string, timeEnd: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.patch(`/research-projects/${id}/time-end`, { TimeEnd: timeEnd });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateProjectStatusApi = async (id: string, status: string): Promise<ApiResponse<null>> => {
    try {
        let path = "";
        if (status === "InProgress") path = "in-process";
        else if (status === "UnderReview") path = "under-review";
        else if (status === "Completed") path = "completed";
        else if (status === "Cancelled") path = "cancelled";
        
        const response = await api.put(`/manager/projects/${id}/status/${path}`, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateProjectEvaluationApi = async (id: string, evaluation: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/manager/projects/${id}/evaluation`, { evaluation });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateCertificateUrlApi = async (id: string, certificateUrl: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/manager/projects/${id}/certificate-url`, { certificateUrl });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteCertificateUrlApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/manager/projects/${id}/certificate-url`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateDetailUrlApi = async (id: string, detailUrl: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/manager/projects/${id}/detail-url`, { detailUrl });
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteDetailUrlApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/manager/projects/${id}/detail-url`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export type AddContributorByManagerForm = {
    LecturerId: string
    Status: string
    JoinedAt: string
}

const addContributorByManagerApi = async (id: string, form: AddContributorByManagerForm): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/manager/projects/${id}/contributors`, form);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteContributorByManagerApi = async (id: string, contributorId: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/manager/projects/${id}/contributors/${contributorId}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export type AddParticipantByManagerForm = {
    FullName: string
    Role: string
    Email?: string | null
}

const addParticipantByManagerApi = async (id: string, form: AddParticipantByManagerForm): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/manager/projects/${id}/participants`, form);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const updateParticipantByManagerApi = async (id: string, participantId: string, form: AddParticipantByManagerForm): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/manager/projects/${id}/participants/${participantId}`, form);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteParticipantByManagerApi = async (id: string, participantId: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/manager/projects/${id}/participants/${participantId}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

export type AddFundingByManagerForm = {
    Source: string
    Description: string
    Amount: number
}

const addFundingByManagerApi = async (id: string, form: AddFundingByManagerForm): Promise<ApiResponse<null>> => {
    try {
        const response = await api.post(`/manager/projects/${id}/fundings`, form);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const deleteFundingByManagerApi = async (id: string, source: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete(`/manager/projects/${id}/fundings/${source}`);
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};

const hideProjectMangerApi = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.put(`/lecturer/projects/${id}/hide`, {});
        return success(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            return fail(data?.message || data?.detail, data?.errors);
        }
        return fail();
    }
};
