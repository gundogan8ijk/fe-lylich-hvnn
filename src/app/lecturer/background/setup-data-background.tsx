'use client';

import { useEffect } from 'react';
import { useBackgroundStore } from '../../../background-common/Background-store';
import { getBackground } from '@/background-common/Background-ser';

export default function SetupDataBackground() {
    const setBackground = useBackgroundStore((state) => state.setBackground);
    const setIsLoading = useBackgroundStore((state) => state.setIsLoading);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getBackground();
            setBackground(data);
            setIsLoading(false);
        };

        fetchData();
    }, [setBackground, setIsLoading]);

    return null; // This component only handles data fetching
}
