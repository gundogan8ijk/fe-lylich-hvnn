import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { notify } from "@/_components/utils/Notify";
import { toSearchParams } from "@/_lib/query-options-toUrl-helper";
import { 
    addDisciplinesByMangerApi, 
    createProjectApi, 
    CreateProjectForm, 
    deleteDisciplineByManagerApi, 
    deleteManagerProjectApi, 
    getMangerProjectListApi, 
    getProjectManagerDetailApi, 
    updateBaseInfoProjectMangerApi, 
    UpdateBaseInfoProjectMangerForm, 
    updateConfirmedProjectDetailApi, 
    updateTimeEndProjectMangerApi,
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
    AddContributorByManagerForm,
    deleteContributorByManagerApi,
    addParticipantByManagerApi,
    AddParticipantByManagerForm,
    updateParticipantByManagerApi,
    deleteParticipantByManagerApi,
    addFundingByManagerApi,
    AddFundingByManagerForm,
    deleteFundingByManagerApi
} from "./project-list-service";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { storeProjectMangerList } from "./project-list-store";
import { storeProjectManagerDetail } from "./../project-detail/project-detail-store";
import { ConfirmedStatus } from "@/_constants/base-constant";

export {
    //list
    getMangerProjectListAction, createProjectListAction, deleteMangerProjectListAction,
    //chi tiet manger
    getProjectManagerDetailAction, deleteMangerProjectDetailAction, updateConfirmedProjectDetailAction,
    updateBaseInfoProjectMangerAction, addDisciplinesByMangerAction, deleteDisciplineByManagerAction,
    updateTimeEndProjectMangerAction,
    
    // new manager hook actions
    updateProjectStatusAction,
    hideProjectMangerAction,
    updateProjectEvaluationAction,
    updateCertificateUrlAction,
    deleteCertificateUrlAction,
    updateDetailUrlAction,
    deleteDetailUrlAction,
    addContributorByManagerAction,
    deleteContributorByManagerAction,
    addParticipantByManagerAction,
    updateParticipantByManagerAction,
    deleteParticipantByManagerAction,
    addFundingByManagerAction,
    deleteFundingByManagerAction
}


async function getMangerProjectListAction() {

    const { setLoading, setPagination, setData, query } = storeProjectMangerList.getState();
    setLoading(true);

    const url = toSearchParams(query);

    const res = await getMangerProjectListApi(url);
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);

}


async function createProjectListAction(form: CreateProjectForm): Promise<boolean> {

    const res = await createProjectApi(form);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    }
    else if (res.code === 1 && res.data) {
        notify.success("đăng kí đề tài thành công");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return true;
}

async function deleteMangerProjectListAction(id: string) {
    const { removeItemById } = storeProjectMangerList.getState();

    const res = await deleteManagerProjectApi(id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    }
    else if (res.code === 1) {
        removeItemById(id);
        notify.success("Xóa đề tài thành công");
    }
}

async function getProjectManagerDetailAction(id: string) {
    const { setLoading, setData, setNull } = storeProjectManagerDetail.getState();

    setLoading(true);

    const res = await getProjectManagerDetailApi(id);

    if (res.code === 1 && res.data) setData(res.data);
    else setNull();

    setLoading(false);
}

async function deleteMangerProjectDetailAction() {
    const { data, setDeleting } = storeProjectManagerDetail.getState();
    if (!data) return;

    setDeleting(true);
    const res = await deleteManagerProjectApi(data.id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setDeleting(false);
    }
    else if (res.code === 1) {
        notify.success("Xóa đề tài thành công");
        setTimeout(() => {
            window.location.href = "/manager/research-projects";
        }, 200);
    }
}


async function updateConfirmedProjectDetailAction(confirmedStatus: ConfirmedStatus) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);
    const res = await updateConfirmedProjectDetailApi(data.id, { confirmedStatus });

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Thay đổi trạng thái xác thực đề tài thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function updateBaseInfoProjectMangerAction(form: UpdateBaseInfoProjectMangerForm) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    let hasError = false;
    let errorMsg = "Có lỗi xảy ra khi cập nhật";
    let errorDetails: Record<string, string[]> | undefined = undefined;

    if (data.permissions.canUpdateBase) {
        const baseRes = await updateBaseInfoProjectMangerApi(data.id, { Title: form.Title, Describe: form.Describe });
        if (baseRes.code === -1) {
            hasError = true;
            errorMsg = baseRes.message;
            errorDetails = baseRes.errors;
        }
    }

    if (!hasError && data.permissions.canUpdateTimeAndLevel) {
        const timeLevelRes = await updateTimeAndLevelProjectMangerApi(data.id, { Level: form.Level, StartDate: form.StartDate, EndDate: form.EndDate });
        if (timeLevelRes.code === -1) {
            hasError = true;
            errorMsg = timeLevelRes.message;
            errorDetails = timeLevelRes.errors;
        }
    }

    if (hasError) {
        notify.error(getAllErrorMessage(errorMsg, errorDetails));
        setUpdating(false);
    } else {
        notify.success("Cập nhật thông tin đề tài thành công");

        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function addDisciplinesByMangerAction(disciplineIds: string[]) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await addDisciplinesByMangerApi(data.id, disciplineIds);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Cập nhật lĩnh vực nghiên cứu thành công");

        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function deleteDisciplineByManagerAction(disciplineId: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await deleteDisciplineByManagerApi(data.id, disciplineId);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Xóa lĩnh vực nghiên cứu thành công");

        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }

    setUpdating(false);
}


async function updateTimeEndProjectMangerAction(timeEnd: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);

    const res = await updateTimeEndProjectMangerApi(data.id, timeEnd);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Cập nhật ngày kết thúc thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }

    setUpdating(false);
}

async function updateProjectStatusAction(status: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await updateProjectStatusApi(data.id, status);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Cập nhật trạng thái tiến độ thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
    setUpdating(false);
}

async function hideProjectMangerAction() {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;

    setUpdating(true);
    const res = await hideProjectMangerApi(data.id);

    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        setUpdating(false);
    }
    else if (res.code === 1) {
        notify.success("Đã thay đổi trạng thái hiển thị của đề tài");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function updateProjectEvaluationAction(evaluation: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await updateProjectEvaluationApi(data.id, evaluation);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Cập nhật kết quả đánh giá thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
    setUpdating(false);
}

async function updateCertificateUrlAction(url: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await updateCertificateUrlApi(data.id, url);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Cập nhật đường dẫn chứng chỉ thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
    setUpdating(false);
}

async function deleteCertificateUrlAction() {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await deleteCertificateUrlApi(data.id);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa đường dẫn chứng chỉ thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
    setUpdating(false);
}

async function updateDetailUrlAction(url: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await updateDetailUrlApi(data.id, url);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Cập nhật tài liệu chi tiết thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
    setUpdating(false);
}

async function deleteDetailUrlAction() {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await deleteDetailUrlApi(data.id);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa tài liệu chi tiết thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
    setUpdating(false);
}

async function addContributorByManagerAction(form: AddContributorByManagerForm): Promise<boolean> {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return false;
    setUpdating(true);
    const res = await addContributorByManagerApi(data.id, form);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Thêm thành viên thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
        return true;
    }
    return false;
}

async function deleteContributorByManagerAction(contributorId: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await deleteContributorByManagerApi(data.id, contributorId);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa thành viên thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function addParticipantByManagerAction(form: AddParticipantByManagerForm): Promise<boolean> {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return false;
    setUpdating(true);
    const res = await addParticipantByManagerApi(data.id, form);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Thêm người hỗ trợ thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
        return true;
    }
    return false;
}

async function updateParticipantByManagerAction(participantId: string, form: AddParticipantByManagerForm): Promise<boolean> {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return false;
    setUpdating(true);
    const res = await updateParticipantByManagerApi(data.id, participantId, form);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Cập nhật người hỗ trợ thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
        return true;
    }
    return false;
}

async function deleteParticipantByManagerAction(participantId: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await deleteParticipantByManagerApi(data.id, participantId);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa người hỗ trợ thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}

async function addFundingByManagerAction(form: AddFundingByManagerForm): Promise<boolean> {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return false;
    setUpdating(true);
    const res = await addFundingByManagerApi(data.id, form);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
        return false;
    } else if (res.code === 1) {
        notify.success("Thêm nguồn kinh phí thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
        return true;
    }
    return false;
}

async function deleteFundingByManagerAction(source: string) {
    const { data, setUpdating } = storeProjectManagerDetail.getState();
    if (!data) return;
    setUpdating(true);
    const res = await deleteFundingByManagerApi(data.id, source);
    setUpdating(false);
    if (res.code === -1) {
        notify.error(getAllErrorMessage(res.message, res.errors));
    } else if (res.code === 1) {
        notify.success("Xóa nguồn kinh phí thành công");
        setTimeout(() => {
            window.location.href = `/manager/research-projects/${data.id}`;
        }, 200);
    }
}