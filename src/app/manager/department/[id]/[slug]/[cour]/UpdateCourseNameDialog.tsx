'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { notify } from "@/_components/utils/Notify";
import { updateCourseNameAction } from '@/working-manager/department/course/course-manger-hook';

interface UpdateCourseNameDialogProps {
    courseId: string;
    currentName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdated: () => void;
}

export function UpdateCourseNameDialog({
    courseId,
    currentName,
    open,
    onOpenChange,
    onUpdated
}: UpdateCourseNameDialogProps) {
    const [name, setName] = useState(currentName);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setName(currentName);
        }
    }, [open, currentName]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            notify.error("Tên môn học không được để trống");
            return;
        }

        setIsLoading(true);
        const res = await updateCourseNameAction(courseId, name);
        if (res.code === 1) {
            notify.success("Cập nhật tên môn học thành công");
            onUpdated();
            onOpenChange(false);
        } else {
            notify.error(res.message || "Cập nhật thất bại");
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật tên môn học</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên môn học..."
                        disabled={isLoading}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading || !name.trim()}>
                        {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
