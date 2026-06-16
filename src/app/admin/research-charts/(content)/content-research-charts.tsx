'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card';
import { useResearchChartsStore } from '@/working-admin/statistics/research-charts-store';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticsFilter } from './statistics-filter';
import { getResearchChartsAction } from '@/working-admin/statistics/statistics-admin-hook';
import { exportToExcel } from '@/_Common/_utils/excel-export';
import { useEffect, useState } from 'react';

export default function ContentResearchCharts() {
  const { data, loading: isLoading } = useResearchChartsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data || [];

  const handleExportExcel = () => {
    if (!data) return;
    
    const formattedData = chartData.map(item => {
      const total = item.completed + item.pending + item.cancelled;
      return {
        'Thời gian / Đơn vị': item.label,
        'Hoàn thành': item.completed,
        'Chờ duyệt': item.pending,
        'Đã hủy': item.cancelled,
        'Tổng số': total
      };
    });

    exportToExcel([{ sheetName: 'Thống kê Nghiên cứu', data: formattedData }], 'ThongKeNghienCuuKhoaHoc');
  };

  return (
    <div className="space-y-4">
      <StatisticsFilter onRefresh={getResearchChartsAction} onExport={data ? handleExportExcel : undefined} />

      {!mounted || isLoading ? (
        <div className="text-sm text-muted-foreground p-4">Đang tải biểu đồ nghiên cứu khoa học...</div>
      ) : !data ? (
        <div className="text-sm text-destructive p-4">Không tải được dữ liệu. Vui lòng thử lại.</div>
      ) : (
        <div className="space-y-4">
          {/* Biểu đồ 1: Hoàn thành */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê Nghiên cứu khoa học - Đã hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 350, minWidth: 0 }}>
                <ResponsiveContainer width="99%" height="100%" minHeight={0}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#00C49F" name="Hoàn thành" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Biểu đồ 2: Chờ duyệt và Đã hủy */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê Nghiên cứu khoa học - Chờ duyệt & Đã hủy</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 350, minWidth: 0 }}>
                <ResponsiveContainer width="99%" height="100%" minHeight={0}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pending" stackId="a" fill="#FFBB28" name="Chờ duyệt" />
                    <Bar dataKey="cancelled" stackId="a" fill="#FF8042" name="Đã hủy" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
