'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ImageOff, Download, Trash2, EyeOff, Eye } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
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
} from '@/_components/ui/alert-dialog';
import { notify } from '@/_components/utils/Notify';
import Loading from '@/_components/utils/Loading';
import { useLecturerDetailManagerStore } from '@/working-manager/lecturer/lecturer-detail-manager-store';
import { deleteLecturerManagerApi, getLecturerBackgroundManagerApi, toggleLecturerVisibilityManagerApi } from '@/working-manager/lecturer/lecturer-manger-service';

export default function ContentLecturerDetail() {
    const router = useRouter();
    const { background, isLoading, setBackground, setIsLoading } = useLecturerDetailManagerStore();
    const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: 'LyLichGiangVien' });

    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        if (!background) return;
        const res = await deleteLecturerManagerApi(background.lecturerId);
        if (res.code === 1) {
            notify.success('Xóa giảng viên thành công');
            router.push('/manager/lecturer');
        } else {
            notify.error(res.message || 'Xóa thất bại');
        }
    };

    const handleToggleVisibility = async () => {
        setIsToggleDialogOpen(false);
        if (!background) return;
        const res = await toggleLecturerVisibilityManagerApi(background.lecturerId);
        if (res.code === 1) {
            notify.success('Cập nhật trạng thái thành công');
            // Reload
            setIsLoading(true);
            const refreshed = await getLecturerBackgroundManagerApi(background.lecturerId);
            if (refreshed.code === 1) setBackground(refreshed.data);
            setIsLoading(false);
        } else {
            notify.error(res.message || 'Cập nhật thất bại');
        }
    };

    if (isLoading) return <Loading />;
    if (!background) return null;

    const hasAvatar = background.avatarUrl && background.avatarUrl.trim() !== '' && background.avatarUrl !== 'null';

    return (
        <>
            {/* Action buttons */}
            <div className="max-w-5xl mx-auto mb-4 flex justify-end gap-2 px-4 xl:px-0">
                <button
                    onClick={() => setIsToggleDialogOpen(true)}
                    className="flex items-center gap-1.5 bg-yellow-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-yellow-600 transition-colors"
                >
                    {background.isPublic ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{background.isPublic ? 'Ẩn' : 'Hiện'}</span>
                </button>

                <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-red-700 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa</span>
                </button>
            </div>

            <div ref={contentRef} className="p-4 max-w-5xl mx-auto space-y-6 bg-white rounded-xl shadow-sm border border-slate-200 relative print:shadow-none print:border-none print:m-0 print:p-0">
                <button
                    onClick={() => setIsPrintDialogOpen(true)}
                    className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm z-10 print:hidden"
                    title="Tải PDF"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">In PDF</span>
                </button>

                {/* Header / Basic Info */}
                <section className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 border-b border-slate-100 pb-5 pt-12 md:pt-0">
                    <div className="flex-shrink-0 relative overflow-hidden w-24 h-24 rounded-full border-2 border-slate-300 shadow-sm bg-slate-200">
                        {hasAvatar ? (
                            <Image src={background.avatarUrl!} alt="Avatar" fill unoptimized className="object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-200">
                                <ImageOff className="h-16 w-16 text-slate-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {background.fullName}
                            {!background.isPublic && (
                                <span className="ml-3 inline-block px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded">Đã Ẩn</span>
                            )}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm font-medium text-slate-600">
                            <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-700 border border-slate-200">Mã GV: {background.code}</span>
                            <span>•</span>
                            <span>Giới tính: {background.gender}</span>
                            <span>•</span>
                            <span>Ngày sinh: {background.birthDate}</span>
                            <span>•</span>
                            <span>CCCD: {background.cccd}</span>
                        </div>
                        {(background.department || background.discipline) && (
                            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-700">
                                {background.department && <p><span className="font-semibold text-slate-600">Đơn vị:</span> {background.department.departmentName}</p>}
                                {background.discipline && <p><span className="font-semibold text-slate-600">Bộ môn:</span> {background.discipline.disciplineName}</p>}
                            </div>
                        )}
                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                            {background.email && <div className="flex items-center gap-1.5"><span className="text-slate-400">✉</span> {background.email}</div>}
                            {background.phoneNumber && <div className="flex items-center gap-1.5"><span className="text-slate-400">☏</span> {background.phoneNumber}</div>}
                            {background.address && <div className="flex items-center gap-1.5"><span className="text-slate-400">⌂</span> {background.address}</div>}
                        </div>
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
                                        <p className="text-sm text-slate-600"><span className="font-medium text-slate-500">Tốt nghiệp:</span> {edu.graduatedAt}</p>
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
                                    <div className="mt-1 flex items-center gap-3 text-sm">
                                        <p className="text-slate-600"><span className="font-medium text-slate-500">Cấp:</span> <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded text-xs">{award.level}</span></p>
                                        <p className="text-slate-600"><span className="font-medium text-slate-500">Ngày nhận:</span> {award.awardDate}</p>
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
                                            <span className="text-slate-400 ml-1.5 whitespace-nowrap">({article.publishedAt})</span>
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
                                            <span className="text-slate-400 ml-1.5 whitespace-nowrap">({book.publishYear})</span>
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
                                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">{proj.code}</span>
                                                <span className="text-slate-500">Cấp: {proj.level}</span>
                                                <span className="text-slate-500">HT: {proj.completionAt}</span>
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
                                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">{proj.code}</span>
                                                <span className="text-slate-500">Cấp: {proj.level}</span>
                                                <span className="text-slate-500">HT: {proj.completionAt}</span>
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
            <AlertDialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận tải PDF</AlertDialogTitle>
                        <AlertDialogDescription>Bạn có chắc chắn muốn tải thông tin lý lịch này dưới dạng PDF không?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setIsPrintDialogOpen(false);
                            setTimeout(() => { if (reactToPrintFn) reactToPrintFn(); }, 100);
                        }}>Đồng ý</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa giảng viên</AlertDialogTitle>
                        <AlertDialogDescription>Bạn có chắc chắn muốn xóa giảng viên này không? Hành động không thể hoàn tác nếu giảng viên đã liên kết dữ liệu.</AlertDialogDescription>
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
                        <AlertDialogTitle>Xác nhận {background.isPublic ? 'ẩn' : 'hiện'} giảng viên</AlertDialogTitle>
                        <AlertDialogDescription>Bạn có chắc chắn muốn {background.isPublic ? 'ẩn' : 'hiện'} hồ sơ giảng viên này khỏi danh sách công khai?</AlertDialogDescription>
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
