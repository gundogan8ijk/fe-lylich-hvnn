import { notify } from '@/_components/utils/Notify';
import { storeAwardListManager, storeAwardDetailManager } from './award-manager-store';
import { getListAwardManager, getDetailAwardManager, verifyAwardManager, cancelAwardManager } from './award-manager-service';

export async function getListAwardManagerAction() {
    const { setLoading, setData } = storeAwardListManager.getState();
    setLoading(true);

    const res = await getListAwardManager();
    if (res.code !== 1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data);
    }

    setLoading(false);
}

export async function getAwardDetailManagerAction(id: string) {
    const { setLoading, setData } = storeAwardDetailManager.getState();
    setLoading(true);

    const res = await getDetailAwardManager(id);
    if (res.code !== 1) {
        notify.error(res.message);
        setData(null);
    } else {
        setData(res.data);
    }

    setLoading(false);
}

export async function verifyAwardManagerAction(id: string): Promise<boolean> {
    const res = await verifyAwardManager(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã xác thực giải thưởng thành công');
    await getAwardDetailManagerAction(id);
    return true;
}

export async function cancelAwardManagerAction(id: string): Promise<boolean> {
    const res = await cancelAwardManager(id);
    if (res.code !== 1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã từ chối giải thưởng thành công');
    await getAwardDetailManagerAction(id);
    return true;
}
