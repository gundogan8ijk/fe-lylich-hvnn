'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ImageOff, Download, Trash2, EyeOff, Eye, MapPin } from "lucide-react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
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

import {
    getLecturerBackgroundManagerApi,
    deleteLecturerManagerApi,
    toggleLecturerVisibilityManagerApi
} from '@/working-manager/lecturer/lecturer-manger-service';
import { BackgroundByManagerResponse } from '@/working-manager/lecturer/lecturer-manger-type';
import { ConfirmedStatus, STATUS_LABELS, confirmedStyle, GENDER_LABELS, Gender } from '@/_constants/base-constant';
import { AWARD_LEVEL_LABELS, AwardLevelName } from '@/_constants/award-constant';
import { PROJECT_LEVEL_LABELS, ProjectLevelName, PROJECT_STATUS_LABELS, ProjectStatusName } from '@/_constants/project-constant';
import { PROJECT_EXTERNAL_LEVEL_LABELS } from '@/_constants/ProjectExternal-constant';

export default function ManagerContentBackground({ id }: { id: string }) {
    const router = useRouter();
    const [background, setBackground] = useState<BackgroundByManagerResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        const res = await getLecturerBackgroundManagerApi(id);
        if (res.code === 1) {
            setBackground(res.data);
        } else {
            toast.error(res.message || "Lỗi tải dữ liệu");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (id) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
            loadData();
        }
    }, [id]);

    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        const res = await deleteLecturerManagerApi(id);
        if (res.code === 1) {
            toast.success("Xóa giảng viên thành công");
            router.push('/manager/lecturer'); // back to list
        } else {
            toast.error(res.message || "Xóa thất bại");
        }
    };

    const handleToggleVisibility = async () => {
        setIsToggleDialogOpen(false);
        const res = await toggleLecturerVisibilityManagerApi(id);
        if (res.code === 1) {
            toast.success("Cập nhật trạng thái thành công");
            loadData(); // reload data
        } else {
            toast.error(res.message || "Cập nhật thất bại");
        }
    };

    if (isLoading) {
        return <div className="p-4 text-center text-gray-500">Đang tải dữ liệu...</div>;
    }

    if (!background) {
        return <div className="p-4 text-center text-red-500">Không tìm thấy thông tin lý lịch.</div>;
    }

    const hasAvatar = background.avatarUrl && background.avatarUrl.trim() !== "" && background.avatarUrl !== "null";

    const renderStatus = (statusStr: string) => {
        const s = statusStr as ConfirmedStatus;
        const style = confirmedStyle[s] || confirmedStyle.Draft;
        const label = STATUS_LABELS[s] || statusStr;
        return <span className={`px-2 py-0.5 rounded text-xs font-medium border border-slate-100 ${style.bg} ${style.text}`}>{label}</span>;
    };

    const renderProjectStatus = (statusStr: string) => {
        const label = PROJECT_STATUS_LABELS[statusStr as ProjectStatusName] || statusStr;
        let bg = 'bg-slate-100 text-slate-600';
        if (statusStr === 'InProgress') bg = 'bg-blue-100 text-blue-700';
        else if (statusStr === 'Completed') bg = 'bg-emerald-100 text-emerald-700';
        else if (statusStr === 'UnderReview') bg = 'bg-purple-100 text-purple-700';
        else if (statusStr === 'Cancelled') bg = 'bg-red-100 text-red-600';
        else if (statusStr === 'Pending') bg = 'bg-amber-100 text-amber-700';
        
        return <span className={`px-2 py-0.5 rounded text-xs font-medium border border-slate-100 ${bg}`}>Tiến độ: {label}</span>;
    };

    return (
        <>
            <div className="max-w-5xl mx-auto mb-4 flex justify-end gap-3 px-4 xl:px-0 print:hidden">
                <button
                    onClick={() => setIsToggleDialogOpen(true)}
                    className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors shadow-sm"
                >
                    {background.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{background.isPublic ? "Ẩn giảng viên" : "Hiện giảng viên"}</span>
                </button>

                <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa giảng viên</span>
                </button>
            </div>

            <div className="p-4 max-w-5xl mx-auto space-y-6 bg-white rounded-xl shadow-sm border border-slate-200 relative print:shadow-none print:border-none print:m-0 print:p-0">
                <button
                    onClick={() => window.print()}
                    className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm z-10 print:hidden"
                    title="Xuất file PDF"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Xuất file PDF</span>
                </button>

                {/* Header / Basic Info */}
                <section className="flex flex-col md:flex-row items-start gap-5 border-b border-slate-100 pb-5 pt-6 md:pt-4 print:flex-row print:items-start print:gap-5 print:pt-2">
                    <div className="flex-shrink-0 overflow-hidden w-24 h-24 rounded-full border-2 border-slate-300 shadow-sm bg-slate-200">
                        {hasAvatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={background.avatarUrl!}
                                alt="Avatar"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-200">
                                <ImageOff className="h-16 w-16 text-slate-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 space-y-2.5">
                        {/* Tên + mã */}
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                                {background.fullName}
                                {!background.isPublic && <span className="ml-3 inline-block px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded print:hidden">Đã Ẩn</span>}
                            </h1>
                            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-slate-700 border border-slate-200 font-medium text-xs">{background.code}</span>
                        </div>
                        {/* Giới tính / Ngày sinh / CCCD */}
                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                            <span><span className="font-semibold text-slate-700">Giới tính:</span> {GENDER_LABELS[background.gender as Gender] || background.gender}</span>
                            <span className="text-slate-400">•</span>
                            <span><span className="font-semibold text-slate-700">Ngày sinh:</span> {background.birthDate}</span>
                            <span className="text-slate-400">•</span>
                            <span><span className="font-semibold text-slate-700">CCCD:</span> {background.cccd}</span>
                        </div>
                        {/* Khoa / Bộ môn */}
                        {(background.department || background.discipline) && (
                            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-slate-700">
                                {background.department && <span><span className="font-semibold text-slate-500">Khoa:</span> {background.department.departmentName}</span>}
                                {background.discipline && <span><span className="font-semibold text-slate-500">Bộ môn:</span> {background.discipline.disciplineName}</span>}
                            </div>
                        )}
                        {/* Liên hệ */}
                        {(background.email || background.phoneNumber || background.address) && (
                            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500 pt-1.5 border-t border-slate-100 mt-1">
                                {background.email && <div className="flex items-center gap-1.5"><span className="text-slate-400">✉</span> {background.email}</div>}
                                {background.phoneNumber && <div className="flex items-center gap-1.5"><span className="text-slate-400">☏</span> {background.phoneNumber}</div>}
                                {background.address && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {background.address}</div>}
                            </div>
                        )}
                    </div>
                </section>

                {/* Educations */}
                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                        Quá trình đào tạo
                    </h2>
                    {background.educations.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {background.educations.map((edu) => (
                                <li key={edu.educationId} className="bg-white p-3.5 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
                                    <p className="font-semibold text-slate-800 text-base">{edu.trainingName}</p>
                                    <div className="mt-1 flex flex-col gap-0.5">
                                        <p className="text-sm text-slate-600"><span className="font-medium text-slate-500">Chuyên ngành:</span> {edu.majorName}</p>
                                        <div className="text-sm text-slate-600 flex items-center justify-between mt-1">
                                            <span><span className="font-medium text-slate-500">Tốt nghiệp:</span> {edu.graduatedAt}</span>
                                            {renderStatus(edu.confirmedStatus)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-slate-500 italic text-sm">Chưa có thông tin đào tạo.</p>}
                </section>

                {/* Awards */}
                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                        Giải thưởng
                    </h2>
                    {background.awards.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {background.awards.map((award) => (
                                <li key={award.awardId} className="bg-white p-3.5 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
                                    <p className="font-semibold text-slate-800 text-base">{award.awardsName}</p>
                                    <div className="mt-1 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3">
                                            <p className="text-slate-600"><span className="font-medium text-slate-500">Cấp:</span> <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded text-xs">{AWARD_LEVEL_LABELS[award.level as AwardLevelName] || award.level}</span></p>
                                            <p className="text-slate-600"><span className="font-medium text-slate-500">Ngày nhận:</span> {award.awardDate}</p>
                                        </div>
                                        {renderStatus(award.confirmedStatus)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-slate-500 italic text-sm">Chưa có giải thưởng.</p>}
                </section>

                {/* Teaching Subjects */}
                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                        Môn học giảng dạy
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2 border-b border-slate-200 pb-1">Nội bộ</h3>
                            {background.teachingSubjects.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1.5">
                                    {background.teachingSubjects.map(ts => (
                                        <li key={ts.courseId} className="text-sm text-slate-700 font-medium">{ts.name}</li>
                                    ))}
                                </ul>
                            ) : <p className="text-slate-400 italic text-sm">Trống</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2 border-b border-slate-200 pb-1">Bên ngoài</h3>
                            {background.teachingExternalSubjects.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1.5">
                                    {background.teachingExternalSubjects.map(ts => (
                                        <li key={ts.courseId} className="text-sm text-slate-700 font-medium">{ts.name}</li>
                                    ))}
                                </ul>
                            ) : <p className="text-slate-400 italic text-sm">Trống</p>}
                        </div>
                    </div>
                </section>

                {/* Publications */}
                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                        Công bố khoa học
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Bài báo</h3>
                            {background.articles.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {background.articles.map(article => (
                                        <div key={article.articleId} className="inline-flex items-center text-sm bg-white px-3 py-2 rounded-md border border-slate-200">
                                            <span className="font-medium text-slate-800 line-clamp-1 max-w-sm" title={article.title}>{article.title}</span>
                                            <span className="text-slate-400 ml-1.5 mr-2 whitespace-nowrap">({article.publishedAt})</span>
                                            {renderStatus(article.confirmedStatus)}
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có bài báo.</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Sách</h3>
                            {background.books.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {background.books.map(book => (
                                        <div key={book.bookId} className="inline-flex items-center text-sm bg-white px-3 py-2 rounded-md border border-slate-200">
                                            <span className="font-medium text-slate-800 line-clamp-1 max-w-sm" title={book.title}>{book.title}</span>
                                            <span className="text-slate-400 ml-1.5 mr-2 whitespace-nowrap">({book.publishYear})</span>
                                            {renderStatus(book.confirmedStatus)}
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có sách.</p>}
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <h2 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                        Dự án & Đề tài
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Đề tài NCKH (Nội bộ)</h3>
                            {background.projects.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {background.projects.map(proj => (
                                        <div key={proj.projectId} className="block bg-white p-3 rounded-lg border border-slate-200">
                                            <p className="font-semibold text-slate-800">{proj.title}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
                                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">{proj.code}</span>
                                                <span className="text-slate-500 flex items-center">Cấp: {PROJECT_LEVEL_LABELS[proj.level as ProjectLevelName] || proj.level}</span>
                                                <span className="text-slate-500 flex items-center mr-1">HT: {proj.completionAt}</span>
                                                {renderStatus(proj.confirmedStatus)}
                                                {renderProjectStatus(proj.status)}
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có đề tài nội bộ.</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Dự án ngoài</h3>
                            {background.projectExternals.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {background.projectExternals.map(proj => (
                                        <div key={proj.projectId} className="block bg-white p-3 rounded-lg border border-slate-200">
                                            <p className="font-semibold text-slate-800">{proj.title}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
                                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">{proj.code}</span>
                                                <span className="text-slate-500 flex items-center">Cấp: {PROJECT_EXTERNAL_LEVEL_LABELS[proj.level as ProjectLevelName] || proj.level}</span>
                                                <span className="text-slate-500 flex items-center mr-1">HT: {proj.completionAt}</span>
                                                {renderStatus(proj.confirmedStatus)}
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có dự án ngoài.</p>}
                        </div>
                    </div>
                </section>
            </div>

            {/* Dialogs */}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa giảng viên này không? Hành động này không thể hoàn tác nếu có lỗi liên kết.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Xóa</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isToggleDialogOpen} onOpenChange={setIsToggleDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận {background.isPublic ? "ẩn" : "hiện"} giảng viên</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn {background.isPublic ? "ẩn" : "hiện"} hồ sơ giảng viên này khỏi danh sách công khai?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleToggleVisibility} className="bg-yellow-500 hover:bg-yellow-600">Đồng ý</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
