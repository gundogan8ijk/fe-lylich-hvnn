'use client';

import { useEffect } from 'react';
import { getOverviewStatsAction } from '@/working-admin/statistics/statistics-admin-hook';

export default function SetupDataOverview() {
  useEffect(() => {
    getOverviewStatsAction();
  }, []);

  return null;
}
