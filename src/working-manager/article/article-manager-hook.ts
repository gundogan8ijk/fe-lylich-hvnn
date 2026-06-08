import { notify } from '@/_components/utils/Notify';
import { storeArticleListManger, storeArticleDetailManager } from './article-manager-store';
import { 
    getListArticleManagerApi, 
    getArticleDetailManagerApi, 
    verifyArticleManagerApi, 
    rejectArticleManagerApi, 
    togglePublishArticleManagerApi 
} from './article-manager-service';

export async function getListArticleManagerAction() {
    const { setLoading, setData } = storeArticleListManger.getState();
    setLoading(true);

    const res = await getListArticleManagerApi();
    if (res.code === -1) {
        notify.error(res.message);
    }

    if (res.data !== null) {
        setData(res.data);
    }

    setLoading(false);
}

export async function getArticleDetailManagerAction(id: string) {
    const { setLoading, setData } = storeArticleDetailManager.getState();
    setLoading(true);

    const res = await getArticleDetailManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        setData(null);
    } else {
        setData(res.data);
    }

    setLoading(false);
}

export async function verifyArticleManagerAction(id: string) {
    const res = await verifyArticleManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã xác thực bài báo thành công');
    await getArticleDetailManagerAction(id);
    return true;
}

export async function rejectArticleManagerAction(id: string) {
    const res = await rejectArticleManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã hủy bỏ bài báo thành công');
    await getArticleDetailManagerAction(id);
    return true;
}

export async function togglePublishArticleManagerAction(id: string) {
    const res = await togglePublishArticleManagerApi(id);
    if (res.code === -1) {
        notify.error(res.message);
        return false;
    }
    notify.success('Đã cập nhật trạng thái hiển thị');
    await getArticleDetailManagerAction(id);
    return true;
}
