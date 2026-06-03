'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/ui/card'
import { Input } from '@/_components/ui/input'
import { Button } from '@/_components/ui/button'
import { Search, Mail, Phone } from 'lucide-react'

const students = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0123456789', class: 'Toán 1A' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0123456790', class: 'Toán 1A' },
    { id: 3, name: 'Phạm Minh C', email: 'phamminhc@email.com', phone: '0123456791', class: 'Toán 1B' },
    { id: 4, name: 'Đặng Thu D', email: 'dangthud@email.com', phone: '0123456792', class: 'Toán 1B' },
    { id: 5, name: 'Hoàng Anh E', email: 'hoanganhе@email.com', phone: '0123456793', class: 'Giải tích 2' },
    { id: 6, name: 'Vũ Khắc F', email: 'vukhacf@email.com', phone: '0123456794', class: 'Giải tích 2' },
]

export default function StudentsPage() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sinh viên</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        Danh sách tất cả sinh viên của bạn
                    </p>
                </div>
                <Button className="w-full sm:w-auto">Thêm sinh viên</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Tìm kiếm sinh viên</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            className="pl-10 text-sm"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="px-4 sm:px-0">
                    <table className="w-full text-sm sm:text-base">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-semibold text-xs sm:text-sm">Tên sinh viên</th>
                                <th className="text-left py-3 px-4 font-semibold text-xs sm:text-sm hidden sm:table-cell">Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-xs sm:text-sm hidden md:table-cell">SĐT</th>
                                <th className="text-left py-3 px-4 font-semibold text-xs sm:text-sm">Lớp</th>
                                <th className="text-left py-3 px-4 font-semibold text-xs sm:text-sm">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b border-border hover:bg-accent transition-colors">
                                    <td className="py-3 px-4 text-xs sm:text-sm">{student.name}</td>
                                    <td className="py-3 px-4 text-xs sm:text-sm text-muted-foreground hidden sm:table-cell truncate">{student.email}</td>
                                    <td className="py-3 px-4 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">{student.phone}</td>
                                    <td className="py-3 px-4 text-xs sm:text-sm">{student.class}</td>
                                    <td className="py-3 px-4">
                                        <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8">Chi tiết</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
