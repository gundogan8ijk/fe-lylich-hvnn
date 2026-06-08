"use client";
import { useTeachingStore } from "@/working-Lecturer/Teaching/Teaching-Lecturer-store";
import { useTeachingActions } from "@/working-Lecturer/Teaching/Teaching-Lecturer-hook";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Label } from "@/_components/ui/label";
import { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, Loader2 } from "lucide-react";
import { DisciplineCourseDto } from "@/working-Lecturer/Teaching/Teaching-Lecturer-type";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddInternalSubjectDialog({ isOpen, onClose }: Props) {
    const { disciplineCourses, isSubmitting, data } = useTeachingStore();
    const { addInternalCourse, fetchDisciplineCourses } = useTeachingActions();
    const [selectedCourse, setSelectedCourse] = useState<DisciplineCourseDto | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [ddOpen, setDdOpen] = useState(false);
    
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            fetchDisciplineCourses();
                // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedCourse(null);
            setSearchTerm("");
            setDdOpen(false);
        }
    }, [isOpen, fetchDisciplineCourses]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setDdOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    const handleAdd = async () => {
        if (!selectedCourse) return;
        const success = await addInternalCourse(selectedCourse.courseId);
        if (success) {
            setSelectedCourse(null);
            onClose();
        }
    };

    // Lọc bỏ những môn đã thêm
    const existingCourseIds = data?.techinhInternal?.map(x => x.courseId) || [];
    const availableCourses = disciplineCourses.filter(c => !existingCourseIds.includes(c.courseId));
    
    // Lọc theo từ khóa tìm kiếm
    const filteredCourses = availableCourses.filter(c => 
        c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInput = (q: string) => {
        setSearchTerm(q);
        setDdOpen(true);
        if (selectedCourse) setSelectedCourse(null);
    };

    const clearSelection = () => {
        setSelectedCourse(null);
        setSearchTerm('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md bg-white text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        Thêm môn giảng dạy nội bộ
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Tìm kiếm môn học trong chuyên ngành và thêm vào danh sách giảng dạy.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div className="space-y-1.5 relative" ref={wrapRef}>
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tìm kiếm Môn học <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            {!selectedCourse ? (
                                <>
                                    <div className="flex min-h-10 items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500 transition-colors bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
                                        <Search className="h-4 w-4 shrink-0 text-slate-400" />
                                        <input
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                                            placeholder="Nhập mã hoặc tên môn học..."
                                            value={searchTerm}
                                            onChange={(e) => handleInput(e.target.value)}
                                            onFocus={() => setDdOpen(true)}
                                        />
                                    </div>
                                    {ddOpen && (
                                        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                                            {filteredCourses.length === 0 ? (
                                                <p className="px-3 py-2.5 text-xs text-slate-500">Không tìm thấy kết quả</p>
                                            ) : (
                                                filteredCourses.map((c) => (
                                                    <button
                                                        key={c.courseId}
                                                        type="button"
                                                        onClick={() => { setSelectedCourse(c); setSearchTerm(c.courseName); setDdOpen(false); }}
                                                        className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                                                    >
                                                        <span className="font-mono text-xs text-slate-400 shrink-0">{c.courseCode}</span>
                                                        <span className="text-slate-300 dark:text-slate-700">·</span>
                                                        <span className="truncate">{c.courseName}</span>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex min-h-10 items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 dark:bg-slate-900/50 dark:border-slate-800">
                                    <div className="flex items-baseline gap-2 overflow-hidden text-sm">
                                        <Search className="h-4 w-4 shrink-0 text-slate-400 self-center" />
                                        <span className="font-mono text-xs text-slate-400 shrink-0">{selectedCourse.courseCode}</span>
                                        <span className="text-slate-300 dark:text-slate-700 shrink-0">·</span>
                                        <span className="font-medium truncate text-slate-800 dark:text-slate-200">{selectedCourse.courseName}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearSelection}
                                        className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-red-500 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => onClose()}
                        disabled={isSubmitting}
                        className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700 dark:hover:bg-slate-700 cursor-pointer"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleAdd}
                        disabled={isSubmitting || !selectedCourse}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Thêm môn học
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
