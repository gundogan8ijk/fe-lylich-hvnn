'use client';

import { useEffect } from 'react';
import { useLecturerDetailManagerStore } from '@/working-manager/lecturer/lecturer-detail-manager-store';
import { getLecturerBackgroundManagerApi } from '@/working-manager/lecturer/lecturer-manger-service';
import { notify } from '@/_components/utils/Notify';

interface Props {
    id: string;
}

export default function SetupDataLecturerDetail({ id }: Props) {
    const setBackground = useLecturerDetailManagerStore((s) => s.setBackground);
    const setIsLoading = useLecturerDetailManagerStore((s) => s.setIsLoading);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await getLecturerBackgroundManagerApi(id);
            if (res.code === 1) {
                setBackground(res.data);
            } else {
                notify.error(res.message || 'Lỗi tải dữ liệu');
            }
            setIsLoading(false);
        };

        if (id) fetchData();
    }, [id, setBackground, setIsLoading]);

    return null;
}
