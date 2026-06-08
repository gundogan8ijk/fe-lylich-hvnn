'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Textarea } from "@/_components/ui/textarea";
import { notify } from "@/_components/utils/Notify";
import { updateCourseDescribeAction } from '@/working-manager/department/course/course-manger-hook';

interface UpdateCourseDescribeDialogProps {
    courseId: string;
    currentDescribe: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdated: () => void;
}

export function UpdateCourseDescribeDialog({
    courseId,
    currentDescribe,
    open,
    onOpenChange,
    onUpdated
}: UpdateCourseDescribeDialogProps) {
    const [describe, setDescribe] = useState(currentDescribe || "");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
            setDescribe(currentDescribe || "");
        }
    }, [open, currentDescribe]);

    const handleSubmit = async () => {
        if (!describe.trim()) {
            notify.error("Mô tả không được để trống");
            return;
        }

        setIsLoading(true);
        const res = await updateCourseDescribeAction(courseId, describe);
        if (res.code === 1) {
            notify.success("Cập nhật mô tả thành công");
            onUpdated();
            onOpenChange(false);
        } else {
            notify.error(res.message || "Cập nhật thất bại");
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật mô tả môn học</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        value={describe}
                        onChange={(e) => setDescribe(e.target.value)}
                        placeholder="Nhập mô tả môn học..."
                        disabled={isLoading}
                        rows={6}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
