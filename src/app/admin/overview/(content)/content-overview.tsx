'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card';
import { Users, UserCircle, BookOpen, Building, CheckCircle, XCircle, Network } from 'lucide-react';
import { useOverviewStore } from '@/working-admin/statistics/overview-store';
import { StatisticsFilter } from './statistics-filter';
import { getOverviewStatsAction } from '@/working-admin/statistics/statistics-admin-hook';

export default function ContentOverview() {
  const { data, loading: isLoading } = useOverviewStore();

  return (
    <div className="space-y-4">
      <StatisticsFilter onRefresh={getOverviewStatsAction} />

      {isLoading ? (
        <div className="text-sm text-muted-foreground p-4">Đang tải dữ liệu tổng quan...</div>
      ) : !data ? (
        <div className="text-sm text-destructive p-4">Không tải được dữ liệu. Vui lòng thử lại.</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {/* Giảng viên */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tổng Giảng viên</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalLecturers}</div>
              </CardContent>
            </Card>

            {/* Tài khoản */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tổng Tài khoản</CardTitle>
                <UserCircle className="w-4 h-4 text-muted-foreground text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalAccounts}</div>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-3 h-3" /> {data.activeAccounts} Active</span>
                  <span className="flex items-center gap-1 text-red-600"><XCircle className="w-3 h-3" /> {data.lockedAccounts} Locked</span>
                </div>
              </CardContent>
            </Card>

            {/* Khoa / Bộ môn */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Khoa / Đơn vị</CardTitle>
                <Building className="w-4 h-4 text-muted-foreground text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalDepartments}</div>
              </CardContent>
            </Card>

            {/* Chuyên ngành */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Chuyên ngành</CardTitle>
                <Network className="w-4 h-4 text-muted-foreground text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalDisciplines}</div>
              </CardContent>
            </Card>

            {/* Môn học */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Môn học</CardTitle>
                <BookOpen className="w-4 h-4 text-muted-foreground text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalCourses}</div>
              </CardContent>
            </Card>

            {/* Tổng NCKH */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tổng NCKH</CardTitle>
                <BookOpen className="w-4 h-4 text-muted-foreground text-teal-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.totalArticles + data.totalBooks + data.totalResearchProjects + data.totalExternalProjects}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Bài báo, Sách, Đề tài...
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-slate-50">
              <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Bài báo khoa học</CardTitle></CardHeader>
              <CardContent><div className="text-lg font-bold">{data.totalArticles}</div></CardContent>
            </Card>
            <Card className="bg-slate-50">
              <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Sách</CardTitle></CardHeader>
              <CardContent><div className="text-lg font-bold">{data.totalBooks}</div></CardContent>
            </Card>
            <Card className="bg-slate-50">
              <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Đề tài NCKH</CardTitle></CardHeader>
              <CardContent><div className="text-lg font-bold">{data.totalResearchProjects}</div></CardContent>
            </Card>
            <Card className="bg-slate-50">
              <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Dự án ngoài</CardTitle></CardHeader>
              <CardContent><div className="text-lg font-bold">{data.totalExternalProjects}</div></CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
