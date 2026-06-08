import { notify } from '@/_components/utils/Notify';
import { storeBookListManger, storeBookDetailManager } from './book-manager-store';
import { 
    getListBookManagerApi, 
    getBookDetailManagerApi, 
    verifyBookManagerApi, 
    rejectBookManagerApi, 
    togglePublishBookManagerApi 
} from './book-manager-service';

export async function getListBookManagerAction() {
    const { setLoading, setData } = storeBookListManger.getState();
    setLoading(true);

    const res = await getListBookManagerApi();
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data);
    }

    setLoading(false);
}

export async function getBookDetailManagerAction(id: string) {
    const { setLoading, setData } = storeBookDetailManager.getState();
    setLoading(true);

    const res = await getBookDetailManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        setData(null);
    } else {
        setData(res.data);
    }

    setLoading(false);
}

export async function verifyBookManagerAction(id: string) {
    const res = await verifyBookManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã xác thực sách thành công');
    await getBookDetailManagerAction(id);
    return true;
}

export async function rejectBookManagerAction(id: string) {
    const res = await rejectBookManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã từ chối sách thành công');
    await getBookDetailManagerAction(id);
    return true;
}

export async function togglePublishBookManagerAction(id: string) {
    const res = await togglePublishBookManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã cập nhật trạng thái hiển thị');
    await getBookDetailManagerAction(id);
    return true;
}
