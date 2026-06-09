'use client';

import { useEffect } from 'react';
import { getLecturerChartsAction } from '@/working-admin/statistics/statistics-admin-hook';

export default function SetupDataLecturerCharts() {
  useEffect(() => {
    getLecturerChartsAction();
  }, []);

  return null;
}
