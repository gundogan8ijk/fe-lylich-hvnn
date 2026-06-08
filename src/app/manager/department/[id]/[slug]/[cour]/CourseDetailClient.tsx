'use client';

import { useState, useEffect } from "react";
import { getCourseDetailAction } from '@/working-manager/department/course/course-manger-hook';
import { CourseDetailPublic } from '@/working-manager/department/course/course-manger-type';
import Loading from "@/_components/utils/Loading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_components/ui/card";
import { Badge } from "@/_components/ui/badge";
import { ArrowLeft, BookOpen, Clock, Users, GraduationCap, Calendar, Edit2, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UpdateCourseNameDialog } from "./UpdateCourseNameDialog";
import { UpdateCourseDescribeDialog } from "./UpdateCourseDescribeDialog";
import { UpdateCourseCreditsDialog } from "./UpdateCourseCreditsDialog";
import { DeleteCourseDialog } from "./DeleteCourseDialog";
import { ToggleVisibilityDialog } from "./ToggleVisibilityDialog";
import Link from "next/link";

export default function CourseDetailClient({ 
    departmentId, 
    disciplineId, 
    courseId 
}: { 
    departmentId: string, 
    disciplineId: string, 
    courseId: string 
}) {
    const router = useRouter();
    const [course, setCourse] = useState<CourseDetailPublic | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [nameDialogOpen, setNameDialogOpen] = useState(false);
    const [describeDialogOpen, setDescribeDialogOpen] = useState(false);
    const [creditsDialogOpen, setCreditsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);

    const handleDeleted = () => {
        router.push(`/manager/department/${departmentId}/${disciplineId}`);
    };

    useEffect(() => {
        async function fetchCourseDetail() {
            setIsLoading(true);
            const data = await getCourseDetailAction(courseId);
            if (data) {
                setCourse(data);
                setError(false);
            } else {
                setError(true);
            }
            setIsLoading(false);
        }

        if (courseId) {
            fetchCourseDetail();
        }
    }, [courseId, refreshTrigger]);

    if (isLoading) return <Loading />;
    if (error || !course) return <div className="p-8 text-center text-red-500">Đã xảy ra lỗi khi tải dữ liệu.</div>;

    const formattedDate = new Date(course.createdAt).toLocaleDateString('vi-VN');

    const renderString = (val: unknown): string => {
        if (!val) return "";
        if (typeof val === "string") return val;
        if (typeof val === "object" && val !== null) {
            const obj = val as Record<string, unknown>;
            if ('displayName' in obj && obj.displayName) return String(obj.displayName);
            if ('value' in obj && obj.value) return String(obj.value);
            if ('name' in obj && obj.name) return String(obj.name);
            if ('code' in obj && obj.code) return String(obj.code);
        }
        return String(val);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => router.push(`/manager/department/${departmentId}/${disciplineId}`)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-indigo-100 shadow-md pt-0">
                        <CardHeader className="bg-indigo-50/50 pb-4 border-b border-indigo-100">
                            <div className="flex justify-between items-start mt-3">
                                <div className="">
                                    <Badge variant={course.ispublic ? "default" : "secondary"} className="mb-3">
                                        {course.ispublic ? "Công khai" : "Nội bộ"}
                                    </Badge>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CardTitle className="text-3xl font-bold text-indigo-950">{renderString(course.name)}</CardTitle>
                                        <Button variant="ghost" size="icon" onClick={() => setNameDialogOpen(true)} className="h-8 w-8 text-indigo-600 hover:bg-indigo-100 rounded-full">
                                            <Edit2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                    <CardDescription className="text-indigo-600/80 font-mono text-lg flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        Mã môn: {renderString(course.code)}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setVisibilityDialogOpen(true)} className="flex items-center gap-2">
                                        {course.ispublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{course.ispublic ? "Ẩn môn học" : "Hiện môn học"}</span>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)} className="flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Xóa</span>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-slate-800">Mô tả môn học</h3>
                                        <Button variant="ghost" size="icon" onClick={() => setDescribeDialogOpen(true)} className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                                            <Edit2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{renderString(course.describe) || "Chưa có mô tả"}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                                <Users className="w-5 h-5 text-indigo-500" />
                                Giảng viên phụ trách ({course.techchinhs?.length || 0})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {course.techchinhs?.length > 0 ? course.techchinhs.map((gv) => (
                                    <Link href={`/manager/lecturer/${gv.id}`} key={gv.id} className="flex items-center gap-4 p-4 border rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                        {gv.avatarUrl ? (
                                            <Image src={gv.avatarUrl} alt={gv.fullName} width={48} height={48} className="rounded-full object-cover border border-slate-200 w-12 h-12" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                                {gv.fullName.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-slate-800 hover:underline hover:text-indigo-600">{renderString(gv.fullName)}</p>
                                            <p className="text-xs text-slate-500 font-mono">{renderString(gv.lecturerCode)} • {renderString(gv.position)}</p>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-sm text-slate-500 col-span-2">Chưa có giảng viên nào phụ trách môn này.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-slate-200 shadow-sm bg-slate-50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg text-slate-800">Thông tin chung</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <p className="text-sm text-slate-500">Số tín chỉ</p>
                                        <p className="font-medium text-lg">{course.credits?.total ?? (course.credits as { total?: number, Total?: number })?.Total}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setCreditsDialogOpen(true)} className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                                    <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                            
                            <div className="pl-8 space-y-2 text-sm text-slate-600 border-l-2 border-indigo-100 ml-2">
                                <p>Lý thuyết: <span className="font-medium">{course.credits?.theory ?? (course.credits as { theory?: number, Theory?: number })?.Theory}</span></p>
                                <p>Thực hành: <span className="font-medium">{course.credits?.practice ?? (course.credits as { practice?: number, Practice?: number })?.Practice}</span></p>
                            </div>

                            <div className="flex items-center gap-3 text-slate-700 pt-4 border-t border-slate-200">
                                <Calendar className="w-5 h-5 text-indigo-500" />
                                <div>
                                    <p className="text-sm text-slate-500">Ngày tạo</p>
                                    <p className="font-medium">{formattedDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <UpdateCourseNameDialog
                courseId={courseId}
                currentName={renderString(course.name)}
                open={nameDialogOpen}
                onOpenChange={setNameDialogOpen}
                onUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />

            <UpdateCourseDescribeDialog
                courseId={courseId}
                currentDescribe={renderString(course.describe)}
                open={describeDialogOpen}
                onOpenChange={setDescribeDialogOpen}
                onUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />

            <UpdateCourseCreditsDialog
                courseId={courseId}
                currentTheory={course.credits?.theory ?? (course.credits as { theory?: number, Theory?: number })?.Theory ?? 0}
                currentPractice={course.credits?.practice ?? (course.credits as { practice?: number, Practice?: number })?.Practice ?? 0}
                open={creditsDialogOpen}
                onOpenChange={setCreditsDialogOpen}
                onUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />

            <DeleteCourseDialog
                courseId={courseId}
                courseName={renderString(course.name)}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onDeleted={handleDeleted}
            />

            <ToggleVisibilityDialog
                courseId={courseId}
                courseName={renderString(course.name)}
                isPublic={course.ispublic}
                open={visibilityDialogOpen}
                onOpenChange={setVisibilityDialogOpen}
                onToggled={() => setRefreshTrigger(prev => prev + 1)}
            />
        </div>
    );
}
