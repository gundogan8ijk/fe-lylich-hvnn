'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card';
import { useLecturerChartsStore } from '@/working-admin/statistics/lecturer-charts-store';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { StatisticsFilter } from './statistics-filter';
import { getLecturerChartsAction } from '@/working-admin/statistics/statistics-admin-hook';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ContentLecturerCharts() {
  const { data, loading: isLoading } = useLecturerChartsStore();

  const { degreeStats = [], departmentStats = [], awardStats = [] } = data || {};

  const renderCustomLegend = (chartData: {label: string, value: number}[]) => {
    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
    return (
      <div className="flex flex-col justify-center w-full px-4">
        <div className="font-semibold text-lg mb-4 text-primary">Tổng số: {total}</div>
        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
          {chartData.map((item, index) => {
            const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.value}</span>
                  <span className="text-muted-foreground text-xs w-10 text-right">({percent}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <StatisticsFilter onRefresh={getLecturerChartsAction} />

      {isLoading ? (
        <div className="text-sm text-muted-foreground p-4">Đang tải biểu đồ giảng viên...</div>
      ) : !data ? (
        <div className="text-sm text-destructive p-4">Không tải được dữ liệu. Vui lòng thử lại.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Pie Chart: Học vị / Học hàm */}
          <Card>
            <CardHeader>
              <CardTitle>Tỉ lệ Giảng viên theo Học vị</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="w-full lg:w-1/2" style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <PieChart>
                      <Pie
                        data={degreeStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="label"
                      >
                        {degreeStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value} giảng viên`, 'Số lượng']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                  {renderCustomLegend(degreeStats)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart: Giải thưởng */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê Giải thưởng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="w-full lg:w-1/2" style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <PieChart>
                      <Pie
                        data={awardStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="label"
                      >
                        {awardStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value} giải thưởng`, 'Số lượng']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                  {renderCustomLegend(awardStats)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart: Phân bố theo Khoa */}
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>Số lượng Giảng viên theo Khoa/Đơn vị</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={departmentStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="label" type="category" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" name="Số giảng viên" />
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
