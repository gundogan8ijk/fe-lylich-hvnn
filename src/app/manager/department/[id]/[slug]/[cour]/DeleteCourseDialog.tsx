'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { notify } from "@/_components/utils/Notify";
import { deleteCourseAction } from '@/working-manager/department/course/course-manger-hook';

interface DeleteCourseDialogProps {
    courseId: string;
    courseName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDeleted: () => void;
}

export function DeleteCourseDialog({
    courseId,
    courseName,
    open,
    onOpenChange,
    onDeleted
}: DeleteCourseDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        const res = await deleteCourseAction(courseId);
        if (res.code === 1) {
            notify.success("Xóa môn học thành công");
            onOpenChange(false);
            onDeleted();
        } else {
            notify.error(res.message || "Xóa thất bại");
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-red-600">Xác nhận xóa môn học</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn xóa môn học <span className="font-semibold text-slate-800">{courseName}</span> không?
                        Hành động này không thể hoàn tác. Môn học chỉ có thể xóa nếu chưa có giảng viên nào giảng dạy.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? "Đang xóa..." : "Xóa môn học"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
