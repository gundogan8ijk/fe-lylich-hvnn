import { notify } from "@/components/utils/Notify";
import { updateFieldApi } from "@/services/base-ser/update-field-base";

export async function updateFieldAction<
    TStore, 
    K extends keyof TStore, 
    TResponse
>(
    params: {
        url: string;
        field: K;
        value: TStore[K];
        storeKey: K;
        successMessage: string;
        extract: (res: TResponse) => TStore[K];
        setField: (key: K, value: TStore[K]) => void;
    }
) {
    const body = { [params.field]: params.value } as Record<K, TStore[K]>;
    
    const res = await updateFieldApi<Record<K, TStore[K]>, TResponse>(
        params.url, 
        body
    );

    if (res.code === -1 || res.data == null) {
        notify.error(res.message);
        return;
    }

    const newValue = params.extract(res.data);

    params.setField(params.storeKey, newValue);

    notify.success(params.successMessage);
}