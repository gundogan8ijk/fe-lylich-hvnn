import { notify } from '@/_components/utils/Notify';
import { storeEducationListManager, storeEducationDetailManager } from './education-manager-store';
import { 
    getListEducationManagerApi, 
    getEducationDetailManagerApi, 
    verifyEducationManagerApi, 
    cancelEducationManagerApi 
} from './education-manager-service';

export async function getListEducationManagerAction() {
    const { setLoading, setData } = storeEducationListManager.getState();
    setLoading(true);

    const res = await getListEducationManagerApi();
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data);
    }

    setLoading(false);
}

export async function getEducationDetailManagerAction(id: string) {
    const { setLoading, setData } = storeEducationDetailManager.getState();
    setLoading(true);

    const res = await getEducationDetailManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        setData(null);
    } else {
        setData(res.data);
    }

    setLoading(false);
}

export async function verifyEducationManagerAction(id: string) {
    const res = await verifyEducationManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã xác thực bằng cấp thành công');
    await getEducationDetailManagerAction(id);
    return true;
}

export async function cancelEducationManagerAction(id: string) {
    const res = await cancelEducationManagerApi(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã hủy/từ chối bằng cấp thành công');
    await getEducationDetailManagerAction(id);
    return true;
}
