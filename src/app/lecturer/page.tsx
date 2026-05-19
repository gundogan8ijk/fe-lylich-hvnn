'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, BookOpen, Users, AlertCircle } from 'lucide-react'

const stats = [
    {
        title: 'Tổng sinh viên',
        value: '127',
        icon: Users,
        color: 'bg-blue-100 text-blue-600',
    },
    {
        title: 'Lớp học',
        value: '4',
        icon: BookOpen,
        color: 'bg-green-100 text-green-600',
    },
    {
        title: 'Bài giảng',
        value: '24',
        icon: BarChart3,
        color: 'bg-purple-100 text-purple-600',
    },
    {
        title: 'Bài tập chưa chấm',
        value: '8',
        icon: AlertCircle,
        color: 'bg-orange-100 text-orange-600',
    },
]

export default function DashboardPage() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Xin chào, Giảng viên!</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                    Đây là bảng điều khiển của bạn. Quản lý lớp học, sinh viên và bài giảng tại đây.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                                <CardTitle className="text-xs sm:text-sm font-medium">{stat.title}</CardTitle>
                                <div className={`p-1.5 sm:p-2 rounded-lg ${stat.color}`}>
                                    <Icon size={16} className="sm:w-5 sm:h-5" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 sm:p-4 pt-0">
                                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Hoạt động gần đây</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Các sự kiện và cập nhật mới nhất từ các lớp học của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        {[
                            {
                                title: 'Nguyễn Văn A nộp bài tập',
                                time: '10 phút trước',
                            },
                            {
                                title: 'Lớp Toán 1A bắt đầu',
                                time: '15 phút trước',
                            },
                            {
                                title: 'Trần Thị B hỏi câu hỏi',
                                time: '30 phút trước',
                            },
                            {
                                title: 'Cập nhật bài giảng Hôm nay',
                                time: '1 giờ trước',
                            },
                        ].map((activity, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 sm:py-3 border-b last:border-0"
                            >
                                <span className="text-xs sm:text-sm text-foreground">{activity.title}</span>
                                <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
