'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { notify } from "@/_components/utils/Notify";
import { toggleCourseVisibilityAction } from '@/working-manager/department/course/course-manger-hook';

interface ToggleVisibilityDialogProps {
    courseId: string;
    courseName: string;
    isPublic: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onToggled: () => void;
}

export function ToggleVisibilityDialog({
    courseId,
    courseName,
    isPublic,
    open,
    onOpenChange,
    onToggled
}: ToggleVisibilityDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        const res = await toggleCourseVisibilityAction(courseId);
        if (res.code === 1) {
            notify.success("Cập nhật trạng thái hiển thị thành công");
            onOpenChange(false);
            onToggled();
        } else {
            notify.error(res.message || "Cập nhật thất bại");
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-slate-800">
                        Xác nhận {isPublic ? "ẩn" : "hiển thị"} môn học
                    </DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn {isPublic ? "ẩn" : "hiển thị"} môn học <span className="font-semibold text-slate-800">{courseName}</span> không?
                        {isPublic 
                            ? " Môn học bị ẩn sẽ không còn hiển thị công khai trên hệ thống."
                            : " Môn học sẽ được hiển thị công khai trên hệ thống."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button variant="default" onClick={handleToggle} disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Xác nhận"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
