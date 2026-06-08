"use client";

import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import LecturerCard from "./lecturer-card";

export default function LecturerGrid() {
    const { data, isLoading } = useLecturerAdminStore();

    if (isLoading) {
        return (
            <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!data || data.items.length === 0) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                <p>Không tìm thấy giảng viên nào phù hợp.</p>
            </div>
        );
    }

    return (
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.items.map((lecturer) => (
                <LecturerCard key={lecturer.lecturerId} data={lecturer} />
            ))}
        </div>
    );
}
