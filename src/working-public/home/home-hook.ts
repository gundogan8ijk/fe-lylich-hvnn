import { notify } from "@/_components/utils/Notify";
import { defaultPagination } from "@/_Common/_types/pagination-typeConfig";
import { storePublicActivities, storePublicAwards } from "./home-store";
import { getPublicActivitiesApi, getRecentAwardsApi } from "./home-ser";

export { loadPublicActivitiesAction, loadRecentAwardsAction };

async function loadPublicActivitiesAction() {
    const { setLoading, setActivities, setPagination, page, pageSize, searchQuery, typeFilter } =
        storePublicActivities.getState();

    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("perPage", String(pageSize));
    if (searchQuery) params.set("query", searchQuery);
    if (typeFilter) params.set("type", typeFilter);

    const res = await getPublicActivitiesApi(params);

    if (res.code !== 1) {
        notify.error(res.message);
    } else if (res.data) {
        setActivities(res.data.items);
        setPagination(res.data.pagination ?? defaultPagination);
    }

    setLoading(false);
}

async function loadRecentAwardsAction() {
    const { setLoading, setAwards, setPagination, page, pageSize } =
        storePublicAwards.getState();

    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));

    const res = await getRecentAwardsApi(params);

    if (res.code !== 1) {
        notify.error(res.message);
    } else if (res.data) {
        setAwards(res.data.items);
        setPagination({
            page: res.data.page,
            perPage: res.data.pageSize,
            totalCount: res.data.totalCount,
            totalPages: res.data.totalPages,
        });
    }

    setLoading(false);
}
