'use client'

import { storeLecturerListManger } from "@/working-manager/lecturer/lecturer-manger-store"
import LecturerCard from "./lecturer-card"

export default function LecturerGrid() {
    const data = storeLecturerListManger((state) => state.data);
    const isLoading = storeLecturerListManger((state) => state.isLoading);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
                <p className="text-lg">Không tìm thấy giảng viên nào</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
            {data.map((lecturer) => {
                const id = typeof lecturer.lecturerId === 'string' ? lecturer.lecturerId : (lecturer.lecturerId as any)?.value;
                return (
                    <LecturerCard key={id} lecturer={lecturer} />
                )
            })}
        </div>
    )
}
