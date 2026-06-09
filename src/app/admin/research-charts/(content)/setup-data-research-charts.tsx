'use client';

import { useEffect } from 'react';
import { getResearchChartsAction } from '@/working-admin/statistics/statistics-admin-hook';

export default function SetupDataResearchCharts() {
  useEffect(() => {
    getResearchChartsAction();
  }, []);

  return null;
}
