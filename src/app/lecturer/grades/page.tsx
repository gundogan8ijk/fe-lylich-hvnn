'use client'

import { Button } from '@/components/ui/button'

const grades = [
    {
        id: 1,
        studentName: 'Nguyễn Văn A',
        class: 'Toán 1A',
        assignment: 'Bài tập 1',
        score: 9.5,
        maxScore: 10,
        status: 'Đã chấm',
    },
    {
        id: 2,
        studentName: 'Trần Thị B',
        class: 'Toán 1A',
        assignment: 'Bài tập 2',
        score: null,
        maxScore: 10,
        status: 'Chưa chấm',
    },
    {
        id: 3,
        studentName: 'Phạm Minh C',
        class: 'Toán 1B',
        assignment: 'Bài kiểm tra',
        score: 7.8,
        maxScore: 10,
        status: 'Đã chấm',
    },
    {
        id: 4,
        studentName: 'Đặng Thu D',
        class: 'Toán 1B',
        assignment: 'Bài tập 3',
        score: null,
        maxScore: 10,
        status: 'Chưa chấm',
    },
]

export default function GradesPage() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Đánh giá</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    Quản lý điểm số và đánh giá sinh viên
                </p>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="px-4 sm:px-0">
                    <table className="w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-xs">Sinh viên</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-xs hidden sm:table-cell">Lớp</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-xs">Bài tập</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-xs">Điểm</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-xs hidden md:table-cell">Trạng thái</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-semibold text-xs">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade) => (
                                <tr key={grade.id} className="border-b border-border hover:bg-accent transition-colors">
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">{grade.studentName}</td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-muted-foreground text-xs sm:text-sm hidden sm:table-cell">{grade.class}</td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate">{grade.assignment}</td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                                        {grade.score !== null ? (
                                            <span className="font-semibold">
                                                {grade.score}/{grade.maxScore}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm hidden md:table-cell">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${grade.status === 'Đã chấm'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                }`}
                                        >
                                            {grade.status}
                                        </span>
                                    </td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                                        {grade.score === null ? (
                                            <Button variant="ghost" size="sm" className="text-xs h-8">Chấm</Button>
                                        ) : (
                                            <Button variant="ghost" size="sm" className="text-xs h-8">Cập nhật</Button>
                                        )}
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
