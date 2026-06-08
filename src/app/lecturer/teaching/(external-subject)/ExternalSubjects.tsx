"use client";
import { useTeachingStore } from "@/working-Lecturer/Teaching/Teaching-Lecturer-store";
import { useTeachingActions } from "@/working-Lecturer/Teaching/Teaching-Lecturer-hook";
import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddExternalSubjectDialog from "./AddExternalSubjectDialog";
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

export default function ExternalSubjects() {
    const { data, isSubmitting } = useTeachingStore();
    const { removeExternalCourse } = useTeachingActions();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

    if (!data) return null;

    const isLimitReached = data.maxtechingExteranl !== undefined 
        && data.techinhExternal 
        && data.techinhExternal.length >= data.maxtechingExteranl;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Môn giảng dạy bên ngoài</CardTitle>
                    {data.maxtechingExteranl !== undefined && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Đã thêm {data.techinhExternal?.length || 0} / {data.maxtechingExteranl} môn
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
                {data.techinhExternal && data.techinhExternal.length > 0 ? (
                    <div className="space-y-4">
                        {data.techinhExternal.map((subject) => (
                            <div key={subject.techinhExternalId} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="font-medium">{subject.name}</p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => setSubjectToDelete(subject.techinhExternalId)}
                                    disabled={isSubmitting}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Chưa có môn giảng dạy bên ngoài nào.</p>
                )}
            </CardContent>

            <AddExternalSubjectDialog isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

            <AlertDialog open={!!subjectToDelete} onOpenChange={(open) => !open && setSubjectToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa môn học</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa môn học này khỏi danh sách giảng dạy bên ngoài?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Hủy</AlertDialogCancel>
                        <AlertDialogAction 
                            variant="destructive"
                            onClick={() => {
                                if (subjectToDelete) {
                                    removeExternalCourse(subjectToDelete);
                                    setSubjectToDelete(null);
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
