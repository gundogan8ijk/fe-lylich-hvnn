'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { notify } from "@/_components/utils/Notify";
import { updateCourseCreditsAction } from '@/working-manager/department/course/course-manger-hook';

interface UpdateCourseCreditsDialogProps {
    courseId: string;
    currentTheory: number;
    currentPractice: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdated: () => void;
}

export function UpdateCourseCreditsDialog({
    courseId,
    currentTheory,
    currentPractice,
    open,
    onOpenChange,
    onUpdated
}: UpdateCourseCreditsDialogProps) {
    const [theory, setTheory] = useState<number>(currentTheory);
    const [practice, setPractice] = useState<number>(currentPractice);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setTheory(currentTheory);
            setPractice(currentPractice);
        }
    }, [open, currentTheory, currentPractice]);

    const handleSubmit = async () => {
        if (theory < 0 || practice < 0) {
            notify.error("Số tín chỉ không hợp lệ");
            return;
        }

        setIsLoading(true);
        const res = await updateCourseCreditsAction(courseId, theory, practice);
        if (res.code === 1) {
            notify.success("Cập nhật tín chỉ thành công");
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
                    <DialogTitle>Cập nhật tín chỉ môn học</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="theory" className="text-right">
                            Lý thuyết
                        </Label>
                        <Input
                            id="theory"
                            type="number"
                            min="0"
                            value={theory}
                            onChange={(e) => setTheory(Number(e.target.value))}
                            className="col-span-3"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="practice" className="text-right">
                            Thực hành
                        </Label>
                        <Input
                            id="practice"
                            type="number"
                            min="0"
                            value={practice}
                            onChange={(e) => setPractice(Number(e.target.value))}
                            className="col-span-3"
                            disabled={isLoading}
                        />
                    </div>
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
