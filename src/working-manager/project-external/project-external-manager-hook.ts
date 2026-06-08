import { notify } from '@/_components/utils/Notify';
import { storeProjectExternalListManger, storeProjectExternalDetailManager } from './project-external-manager-store';
import { 
    getListProjectExternalManagerApi, 
    getProjectExternalDetailManagerApi, 
    verifyProjectExternalManagerApi, 
    rejectProjectExternalManagerApi, 
    togglePublishProjectExternalManagerApi 
} from './project-external-manager-service';

export async function getListProjectExternalManagerAction() {
    const { setLoading, setData } = storeProjectExternalListManger.getState();
    setLoading(true);

    const res = await getListProjectExternalManagerApi();
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data);
    }

    setLoading(false);
}

export async function getProjectExternalDetailManagerAction(id: string) {
    const { setLoading, setData } = storeProjectExternalDetailManager.getState();
    setLoading(true);

    const res = await getProjectExternalDetailManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        setData(null);
    } else {
        setData(res.data);
    }

    setLoading(false);
}

export async function verifyProjectExternalManagerAction(id: string) {
    const res = await verifyProjectExternalManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã xác thực đề tài thành công');
    await getProjectExternalDetailManagerAction(id);
    return true;
}

export async function rejectProjectExternalManagerAction(id: string) {
    const res = await rejectProjectExternalManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã từ chối đề tài thành công');
    await getProjectExternalDetailManagerAction(id);
    return true;
}

export async function togglePublishProjectExternalManagerAction(id: string) {
    const res = await togglePublishProjectExternalManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã cập nhật trạng thái hiển thị');
    await getProjectExternalDetailManagerAction(id);
    return true;
}
