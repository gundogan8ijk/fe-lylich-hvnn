'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Eye, Edit, Trash2 } from 'lucide-react'

const lectures = [
    {
        id: 1,
        title: 'Giới thiệu Giải tích',
        class: 'Toán 1A',
        date: '2024-05-15',
        views: 124,
    },
    {
        id: 2,
        title: 'Hàm số và Giới hạn',
        class: 'Toán 1A',
        date: '2024-05-14',
        views: 98,
    },
    {
        id: 3,
        title: 'Đạo hàm cơ bản',
        class: 'Toán 1B',
        date: '2024-05-13',
        views: 76,
    },
    {
        id: 4,
        title: 'Tích phân và ứng dụng',
        class: 'Giải tích 2',
        date: '2024-05-12',
        views: 145,
    },
    {
        id: 5,
        title: 'Ma trận và Định thức',
        class: 'Đại số tuyến tính',
        date: '2024-05-11',
        views: 89,
    },
]

export default function LecturesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Bài giảng</h1>
                    <p className="text-muted-foreground mt-2">
                        Quản lý bài giảng của bạn
                    </p>
                </div>
                <Button>Tạo bài giảng mới</Button>
            </div>

            <div className="grid gap-4">
                {lectures.map((lecture) => (
                    <Card key={lecture.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                        <BookOpen size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle>{lecture.title}</CardTitle>
                                        <CardDescription>{lecture.class}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Edit size={16} />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-500">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{lecture.date}</span>
                                <div className="flex items-center gap-1">
                                    <Eye size={16} />
                                    <span>{lecture.views} lượt xem</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
