"use client";
import { useTeachingStore } from "@/working-Lecturer/Teaching/Teaching-Lecturer-store";
import InternalSubjects from "../(internal-subject)/InternalSubjects";
import ExternalSubjects from "../(external-subject)/ExternalSubjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Loader2, CalendarDays, Briefcase, GraduationCap, Building2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { getLabel } from "@/_lib/display-variable-helper";
import { ACADEMIC_POSITION_OPTIONS } from "@/_constants/department-constant";

export default function ContentTeaching() {
    const { data, isLoading } = useTeachingStore();

    if (isLoading && !data) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto w-full">
            {/* Department Header Card */}
            <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-border">
                <CardContent className="p-6 relative sm:flex sm:items-center sm:gap-6 bg-card">
                    {/* Department Avatar */}
                    <div className="mb-4 sm:mb-0 relative z-10 shrink-0">
                        <Avatar className="w-24 h-24 sm:w-28 sm:h-28 shadow-sm bg-transparent">
                            {data.departmentId ? (
                                <AvatarImage src={data.departmentAvatarUrl} className="object-contain" />
                            ) : null}
                            <AvatarFallback className="text-3xl font-bold bg-muted text-muted-foreground">
                                {data.departmentId ? data.departmentName?.charAt(0) : <Building2 className="w-10 h-10" />}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex-1 space-y-2 pb-2">
                        {data.departmentId ? (
                            <>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{data.departmentName}</h1>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground items-center font-medium">
                                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-0.5 rounded-md text-xs font-mono border border-emerald-200 dark:border-emerald-800/30">
                                        Mã Khoa: {data.departmentCode || "---"}
                                    </span>
                                    <span>{data.disciplineAmount || 0} Bộ môn</span>
                                    <span>•</span>
                                    <span>{data.membersAmount || 0} Thành viên</span>
                                    {data.departmentFoundedAt && (
                                        <>
                                            <span>•</span>
                                            <span>Thành lập: {new Date(data.departmentFoundedAt).getFullYear()}</span>
                                        </>
                                    )}
                                </div>


                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-destructive">Giảng viên chưa tham gia khoa</h1>
                                <p className="text-sm text-muted-foreground mt-1">Chưa có thông tin bộ môn. Hiện tại chỉ có thể quản lý môn học bên ngoài.</p>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: Lecturer Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="w-5 h-5 text-emerald-600" />
                                Thông tin giảng viên
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                                    <Avatar className="w-12 h-12 border shadow-sm bg-muted">
                                        <AvatarImage src={data.avatarLecturerUrl} alt={data.fullName} className="object-cover" />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {data.fullName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm leading-tight text-foreground">{data.fullName}</p>
                                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                                            Mã GV: {data.lecturerCode}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-3 text-sm">
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays className="w-4 h-4" />
                                            <span>Ngày sinh</span>
                                        </div>
                                        <span className="font-medium text-right text-foreground">
                                            {data.birthDate ? new Date(data.birthDate).toLocaleDateString('vi-VN') : "---"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Briefcase className="w-4 h-4" />
                                            <span>Chức vụ</span>
                                        </div>
                                        <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                                            {data.position ? getLabel(ACADEMIC_POSITION_OPTIONS, data.position) || data.position : "Giảng viên"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays className="w-4 h-4" />
                                            <span>Ngày tham gia khoa</span>
                                        </div>
                                        <span className="font-medium text-right text-foreground">
                                            {data.departmentId && data.joinedAt ? new Date(data.joinedAt).toLocaleDateString('vi-VN') : "---"}
                                        </span>
                                    </div>
                                </div>
                                
                                {data.disciplineName && (
                                    <div className="mt-5 pt-5 border-t border-border/50">
                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Bộ môn trực thuộc</div>
                                        <div className="flex items-start gap-3 bg-muted/30 p-3.5 rounded-xl border border-border/50">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-border shrink-0">
                                                <GraduationCap className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-foreground leading-tight">{data.disciplineName}</span>
                                                <div className="flex gap-2 items-center text-xs text-muted-foreground mt-2 flex-wrap">
                                                    <span className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-border/60 font-medium">
                                                        Mã: {data.code || "---"}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{data.disciplineMembersAmount || 0} Giảng viên</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column: Subjects */}
                <div className="lg:col-span-2 space-y-6">
                    {data.departmentId && <InternalSubjects />}
                    <ExternalSubjects />
                </div>
            </div>
        </div>
    );
}
