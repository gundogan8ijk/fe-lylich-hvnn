"use client";
import { useTeachingStore } from "@/Teaching-Lecturer/Teaching-Lecturer-store";
import { useTeachingActions } from "@/Teaching-Lecturer/Teaching-Lecturer-hook";
import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddInternalSubjectDialog from "./AddInternalSubjectDialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/_components/ui/alert-dialog";

export default function InternalSubjects() {
    const { data, isSubmitting } = useTeachingStore();
    const { removeInternalCourse } = useTeachingActions();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

    if (!data?.disciplineId) return null; // Chỉ hiển thị nếu thuộc bộ môn

    const isLimitReached = data.maxtechingInternal !== undefined 
        && data.techinhInternal 
        && data.techinhInternal.length >= data.maxtechingInternal;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Môn giảng dạy nội bộ</CardTitle>
                    {data.maxtechingInternal !== undefined && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Đã thêm {data.techinhInternal?.length || 0} / {data.maxtechingInternal} môn
                        </p>
                    )}
                </div>
                <Button 
                    onClick={() => setIsAddOpen(true)} 
                    size="sm" 
                    variant="outline"
                    disabled={isLimitReached}
                >
                    <Plus className="mr-2 h-4 w-4" /> Thêm môn
                </Button>
            </CardHeader>
            <CardContent>
                {data.techinhInternal && data.techinhInternal.length > 0 ? (
                    <div className="space-y-4">
                        {data.techinhInternal.map((subject) => (
                            <div key={subject.courseId} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="font-medium">{subject.name}</p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => setCourseToDelete(subject.courseId)}
                                    disabled={isSubmitting}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Chưa có môn giảng dạy nội bộ nào.</p>
                )}
            </CardContent>

            <AddInternalSubjectDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

            <AlertDialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa môn học</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa môn học này khỏi danh sách giảng dạy nội bộ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Hủy</AlertDialogCancel>
                        <AlertDialogAction 
                            variant="destructive"
                            onClick={() => {
                                if (courseToDelete) {
                                    removeInternalCourse(courseToDelete);
                                    setCourseToDelete(null);
                                }
                            }}
                            disabled={isSubmitting}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}
