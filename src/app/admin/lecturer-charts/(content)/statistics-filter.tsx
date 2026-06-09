'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';
import { useLecturerChartsStore } from '@/working-admin/statistics/lecturer-charts-store';
import { Button } from '@/_components/ui/button';
import { useEffect, useState } from 'react';
import { getDepartmentsListPublicApi } from '@/working-public/department-Public/department-public-service';

interface StatisticsFilterProps {
  onRefresh: () => void;
}

export function StatisticsFilter({ onRefresh }: StatisticsFilterProps) {
  const { selectedYear, selectedMonth, selectedDepartmentId, setSelectedYear, setSelectedMonth, setSelectedDepartmentId } = useLecturerChartsStore();

  const [departments, setDepartments] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    getDepartmentsListPublicApi().then(res => {
      if (res.code === 1 && res.data?.items) {
        setDepartments(res.data.items);
      }
    });
  }, []);

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-lg border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Khoa:</span>
        <Select
          value={selectedDepartmentId || 'all'}
          onValueChange={(val) => {
            setSelectedDepartmentId(val === 'all' ? undefined : val);
            onRefresh();
          }}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Năm:</span>
        <Select
          value={selectedYear?.toString() || 'all'}
          onValueChange={(val) => {
            if (val === 'all') {
              setSelectedYear(undefined);
              setSelectedMonth(undefined);
            } else {
              setSelectedYear(parseInt(val));
            }
            onRefresh();
          }}
        >
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Tháng:</span>
        <Select
          disabled={!selectedYear}
          value={selectedMonth?.toString() || 'all'}
          onValueChange={(val) => {
            setSelectedMonth(val === 'all' ? undefined : parseInt(val));
            onRefresh();
          }}
        >
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {months.map((m) => (
              <SelectItem key={m} value={m.toString()}>
                Tháng {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="ml-auto"
        onClick={() => {
          setSelectedYear(undefined);
          setSelectedMonth(undefined);
          setSelectedDepartmentId(undefined);
          onRefresh();
        }}
      >
        Xóa bộ lọc
      </Button>
    </div>
  );
}
