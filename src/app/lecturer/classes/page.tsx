'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar } from 'lucide-react'

const classes = [
    {
        id: 1,
        name: 'Toán 1A',
        code: 'MAT101',
        students: 35,
        room: 'A101',
        schedule: 'Thứ 2, 4 (14:00-15:30)',
    },
    {
        id: 2,
        name: 'Toán 1B',
        code: 'MAT102',
        students: 32,
        room: 'A102',
        schedule: 'Thứ 3, 5 (14:00-15:30)',
    },
    {
        id: 3,
        name: 'Giải tích 2',
        code: 'MAT201',
        students: 28,
        room: 'B201',
        schedule: 'Thứ 2, 4 (16:00-17:30)',
    },
    {
        id: 4,
        name: 'Đại số tuyến tính',
        code: 'MAT202',
        students: 30,
        room: 'B202',
        schedule: 'Thứ 3, 5 (16:00-17:30)',
    },
]

export default function ClassesPage() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Lớp học</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        Quản lý tất cả các lớp học của bạn
                    </p>
                </div>
                <Button className="w-full sm:w-auto">Tạo lớp học mới</Button>
            </div>

            <div className="grid gap-4">
                {classes.map((classItem) => (
                    <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                <div>
                                    <CardTitle className="text-lg sm:text-xl">{classItem.name}</CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">{classItem.code}</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="w-full sm:w-auto">Quản lý</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
                                    <span>{classItem.students} sinh viên</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Phòng: {classItem.room}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
                                    <span className="truncate">{classItem.schedule}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
