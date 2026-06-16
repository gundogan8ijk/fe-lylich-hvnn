'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ImageOff, Download } from "lucide-react";
import generatePDF from 'react-to-pdf';
import { useBackgroundStore } from '../../../working-Lecturer/background/Background-store';
import { AWARD_LEVEL_LABELS, AwardLevelName } from '@/_constants/award-constant';
import { PROJECT_LEVEL_LABELS, ProjectLevelName } from '@/_constants/project-constant';
import { PROJECT_EXTERNAL_LEVEL_LABELS } from '@/_constants/ProjectExternal-constant';
import { DEGREE_OPTIONS } from '@/_constants/education-constant';
import { getLabel } from '@/_lib/display-variable-helper';
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

export default function ContentBackground() {
    const { background, isLoading } = useBackgroundStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    if (isLoading) {
        return <div className="p-4 text-center text-gray-500">Đang tải dữ liệu...</div>;
    }

    if (!background) {
        return <div className="p-4 text-center text-red-500">Không tìm thấy thông tin lý lịch.</div>;
    }

    const hasAvatar = background.avatarUrl && background.avatarUrl.trim() !== "" && background.avatarUrl !== "null";

    return (
        <>


            <div ref={contentRef} className="p-4 max-w-4xl space-y-6 bg-white rounded-xl shadow-sm border border-slate-200 relative print:shadow-none print:border-none print:m-0 print:p-0">
                {/* Nút tải PDF góc phải */}
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm z-10 print:hidden"
                    title="Tải PDF"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Xuất file PDF</span>
                </button>

                {/* Header / Basic Info */}
                <section className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 border-b border-slate-100 pb-5 pt-12 md:pt-0">

                    <div className="flex-shrink-0 relative overflow-hidden w-24 h-24 rounded-full border-2 border-slate-300 shadow-sm bg-slate-200">
                        {hasAvatar ? (
                            <Image
                                src={background.avatarUrl!}
                                alt="Avatar"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-200">
                                <ImageOff className="h-16 w-16 text-slate-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{background.fullName}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm font-medium text-slate-600">
                            <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-700 border border-slate-200">Mã GV: {background.code}</span>
                            <span>•</span>
                            <span>Giới tính: {background.gender === 'Male' ? 'Nam' : background.gender === 'Female' ? 'Nữ' : background.gender}</span>
                            <span>•</span>
                            <span>Ngày sinh: {background.birthDate}</span>
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
                                        <p className="text-sm text-slate-600"><span className="font-medium text-slate-500">Bằng cấp:</span> <span className="bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded text-xs">{getLabel(DEGREE_OPTIONS, edu.degreeName) || edu.degreeName}</span></p>
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
                                        <p className="text-slate-600"><span className="font-medium text-slate-500">Cấp:</span> <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded text-xs">{AWARD_LEVEL_LABELS[award.level as AwardLevelName] || award.level}</span></p>
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
                                        <Link href={`/lecturer/article/${article.articleId}`} key={article.articleId} className="inline-flex items-center text-sm bg-white px-3 py-2 rounded-md border border-slate-200 hover:border-green-400 hover:shadow-sm transition-all group">
                                            <span className="font-medium text-slate-800 group-hover:text-green-600 transition-colors line-clamp-1 max-w-sm" title={article.title}>{article.title}</span>
                                            <span className="text-slate-400 ml-1.5 whitespace-nowrap">({article.publishedAt})</span>
                                        </Link>
                                    ))}
                                </div>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có bài báo.</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Sách</h3>
                            {background.books.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {background.books.map(book => (
                                        <Link href={`/lecturer/book/${book.bookId}`} key={book.bookId} className="inline-flex items-center text-sm bg-white px-3 py-2 rounded-md border border-slate-200 hover:border-green-400 hover:shadow-sm transition-all group">
                                            <span className="font-medium text-slate-800 group-hover:text-green-600 transition-colors line-clamp-1 max-w-sm" title={book.title}>{book.title}</span>
                                            <span className="text-slate-400 ml-1.5 whitespace-nowrap">({book.publishYear})</span>
                                        </Link>
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
                                        <Link href={`/lecturer/research-projects/${proj.projectId}`} key={proj.projectId} className="block bg-white p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow-sm transition-all group">
                                            <p className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors">{proj.title}</p>
                                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">{proj.code}</span>
                                                <span className="text-slate-500 flex items-center">Cấp: {PROJECT_LEVEL_LABELS[proj.level as ProjectLevelName] || proj.level}</span>
                                                <span className="text-slate-500 flex items-center">HT: {proj.completionAt}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </ul>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có đề tài nội bộ.</p>}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Dự án ngoài</h3>
                            {background.projectExternals.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {background.projectExternals.map(proj => (
                                        <Link href={`/lecturer/project-external/${proj.projectId}`} key={proj.projectId} className="block bg-white p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow-sm transition-all group">
                                            <p className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors">{proj.title}</p>
                                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                                                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">{proj.code}</span>
                                                <span className="text-slate-500 flex items-center">Cấp: {PROJECT_EXTERNAL_LEVEL_LABELS[proj.level as ProjectLevelName] || proj.level}</span>
                                                <span className="text-slate-500 flex items-center">HT: {proj.completionAt}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </ul>
                            ) : <p className="text-slate-400 italic text-sm">Chưa có dự án ngoài.</p>}
                        </div>
                    </div>
                </section>
            </div>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận tải PDF</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn tải thông tin lý lịch này dưới dạng PDF về thiết bị không?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setIsDialogOpen(false);
                            setTimeout(() => {
                                generatePDF(contentRef, { filename: `${background.fullName}_LyLich.pdf`, method: 'save' });
                            }, 100);
                        }}>Đồng ý</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
