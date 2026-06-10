'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPublicLecturerDetailAction } from '@/working-public/lecturer-Public/lecturer-public-hook';
import { LecturerPublicDetail } from '@/working-public/lecturer-Public/lecturer-public-type';
import { Card } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import { Badge } from '@/_components/ui/badge';
import Loading from '@/_components/utils/Loading';
import ImageUndefine from '@/_components/utils/ImageUndefine';
import Image from 'next/image';
import { 
    ArrowLeft, Mail, Phone, MapPin, GraduationCap, Award, BookOpen, 
    FileText, Cpu, ExternalLink, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function PublicLecturerDetailPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [lecturer, setLecturer] = useState<LecturerPublicDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            const res = await getPublicLecturerDetailAction(id);
            if (res) {
                setLecturer(res);
            } else {
                setLecturer(null);
            }
            setIsLoading(false);
        };
        if (id) fetchDetail();
    }, [id]);

    if (isLoading) return <Loading />;
    if (!lecturer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <p className="text-lg text-muted-foreground">Không tìm thấy thông tin giảng viên hoặc lý lịch chưa được công khai.</p>
                <Button onClick={() => router.push('/officials')} className="bg-emerald-600 hover:bg-emerald-700">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
                </Button>
            </div>
        );
    }

    const initials = lecturer.fullName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <div className="w-full space-y-8 py-6">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/officials  ')}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại 
                </button>

                {/* Profile Overview Card */}
                <Card className="p-6 md:p-8 bg-white shadow-xl rounded-2xl border-none">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        {/* Avatar */}
                        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-md bg-emerald-50 shrink-0">
                            {lecturer.avatarUrl && !imgError ? (
                                <Image
                                    src={lecturer.avatarUrl}
                                    alt={lecturer.fullName}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/30 to-teal-500/10">
                                    <span className="text-4xl font-extrabold text-emerald-800">
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Contact & Personal Info */}
                        <div className="space-y-4 flex-1">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-2">
                                    <h1 className="text-3xl font-extrabold text-slate-900">{lecturer.fullName}</h1>
                                    <Badge className="bg-emerald-100 text-emerald-800 border-none shadow-none">{lecturer.code}</Badge>
                                </div>
                                <p className="text-emerald-700 font-medium text-lg">
                                    {lecturer.departmentName || "Chưa thuộc khoa"} {lecturer.disciplineName && ` - Bộ môn ${lecturer.disciplineName}`}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 max-w-2xl pt-2">
                                <div className="flex items-center gap-2.5 justify-center md:justify-start">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span>{lecturer.email || "Chưa cập nhật"}</span>
                                </div>
                                <div className="flex items-center gap-2.5 justify-center md:justify-start">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span>{lecturer.phoneNumber || "Chưa cập nhật"}</span>
                                </div>
                                <div className="flex items-center gap-2.5 justify-center md:justify-start sm:col-span-2">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span>Địa chỉ: {lecturer.address || "Chưa cập nhật"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Detailed Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Education & Awards */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Education */}
                        <Card className="p-6 bg-white shadow-md rounded-2xl border-none">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 border-b pb-3 mb-4">
                                <GraduationCap className="w-5 h-5 text-emerald-600" /> Quá trình đào tạo
                            </h2>
                            {lecturer.educations.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Chưa có thông tin đào tạo</p>
                            ) : (
                                <div className="space-y-4">
                                    {lecturer.educations.map((edu) => (
                                        <div key={edu.educationId} className="relative pl-4 border-l-2 border-slate-100 last:pb-0 pb-2">
                                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500" />
                                            <p className="text-xs font-semibold text-emerald-700">{edu.graduatedAt ? new Date(edu.graduatedAt).getFullYear() : 'N/A'}</p>
                                            <p className="font-semibold text-slate-800 text-sm">{edu.degree} - {edu.majorName}</p>
                                            <p className="text-xs text-slate-500">{edu.trainingName}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Awards */}
                        <Card className="p-6 bg-white shadow-md rounded-2xl border-none">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 border-b pb-3 mb-4">
                                <Award className="w-5 h-5 text-orange-500" /> Khen thưởng & Giải thưởng
                            </h2>
                            {lecturer.awards.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Chưa có thông tin khen thưởng</p>
                            ) : (
                                <div className="space-y-4">
                                    {lecturer.awards.map((aw) => (
                                        <div key={aw.awardId} className="flex gap-3 items-start">
                                            <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-slate-800 text-sm">{aw.awardName}</p>
                                                <p className="text-xs text-slate-500">Cấp: {aw.level} • Năm {aw.awardDate ? new Date(aw.awardDate).getFullYear() : 'N/A'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Teaching Subjects */}
                        <Card className="p-6 bg-white shadow-md rounded-2xl border-none">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 border-b pb-3 mb-4">
                                <BookOpen className="w-5 h-5 text-blue-500" /> Môn học giảng dạy
                            </h2>
                            {lecturer.teachingSubjects.length === 0 && lecturer.teachingExternalSubjects.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Chưa cập nhật danh sách môn học</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {lecturer.teachingSubjects.map((sub) => (
                                        <Badge key={sub.courseId} variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-800 border-none font-medium px-2.5 py-1">
                                            {sub.name}
                                        </Badge>
                                    ))}
                                    {lecturer.teachingExternalSubjects.map((sub) => (
                                        <Badge key={sub.courseId} variant="secondary" className="bg-blue-50/70 hover:bg-blue-100/70 text-blue-800 border-none font-medium px-2.5 py-1">
                                            {sub.name} (Ngoài trường)
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Right Column: Research Activities (Books, Articles, Projects) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Books */}
                        <Card className="p-6 bg-white shadow-md rounded-2xl border-none">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 border-b pb-3 mb-4">
                                <BookOpen className="w-5 h-5 text-indigo-600" /> Sách khoa học
                            </h2>
                            {lecturer.books.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Chưa có giáo trình/sách được công bố</p>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {lecturer.books.map((book) => (
                                        <div key={book.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                                            <div>
                                                <Link href={`/book/${book.id}`} className="font-bold text-slate-950 text-sm hover:text-indigo-600 transition-colors">
                                                    {book.title}
                                                </Link>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Năm xuất bản: {new Date(book.publishYear).getFullYear()} {book.publisher && `• NXB: ${book.publisher}`} {book.isbn && `• ISBN: ${book.isbn}`}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800" asChild>
                                                <Link href={`/book/${book.id}`}>Chi tiết</Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Articles */}
                        <Card className="p-6 bg-white shadow-md rounded-2xl border-none">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 border-b pb-3 mb-4">
                                <FileText className="w-5 h-5 text-teal-600" /> Bài báo khoa học
                            </h2>
                            {lecturer.articles.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Chưa có bài báo khoa học được công bố</p>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {lecturer.articles.map((art) => (
                                        <div key={art.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                                            <div>
                                                <Link href={`/article/${art.id}`} className="font-bold text-slate-950 text-sm hover:text-teal-600 transition-colors">
                                                    {art.title}
                                                </Link>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Công bố: {art.publishedAt ? new Date(art.publishedAt).getFullYear() : 'N/A'} {art.journalName && `• Tạp chí: ${art.journalName}`} {art.doi && `• DOI: ${art.doi}`}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-800" asChild>
                                                <Link href={`/article/${art.id}`}>Chi tiết</Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Projects (Internal & External) */}
                        <Card className="p-6 bg-white shadow-md rounded-2xl border-none">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 border-b pb-3 mb-4">
                                <Cpu className="w-5 h-5 text-emerald-600" /> Đề tài nghiên cứu khoa học
                            </h2>
                            {lecturer.projects.length === 0 && lecturer.projectExternals.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">Chưa cập nhật đề tài nghiên cứu</p>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {/* Internal Projects */}
                                    {lecturer.projects.map((proj) => (
                                        <div key={proj.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                                            <div>
                                                <div className="flex gap-2 items-center">
                                                    <Link href={`/research-projects/${proj.id}`} className="font-bold text-slate-950 text-sm hover:text-emerald-600 transition-colors">
                                                        {proj.title}
                                                    </Link>
                                                    <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-200 bg-emerald-50 px-1 py-0 shadow-none">Đề tài nội bộ</Badge>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Mã số: {proj.code} • Cấp đề tài: {proj.level} {proj.endDate && `• Hoàn thành: ${new Date(proj.endDate).getFullYear()}`} {proj.evaluation && `• Đánh giá: ${proj.evaluation}`}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-800" asChild>
                                                <Link href={`/research-projects/${proj.id}`}>Chi tiết</Link>
                                            </Button>
                                        </div>
                                    ))}

                                    {/* External Projects */}
                                    {lecturer.projectExternals.map((proj) => (
                                        <div key={proj.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                                            <div>
                                                <div className="flex gap-2 items-center">
                                                    <Link href={`/project-external/${proj.id}`} className="font-bold text-slate-950 text-sm hover:text-cyan-600 transition-colors">
                                                        {proj.title}
                                                    </Link>
                                                    <Badge variant="outline" className="text-[10px] text-cyan-700 border-cyan-200 bg-cyan-50 px-1 py-0 shadow-none">Đề tài bên ngoài</Badge>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Mã số: {proj.code} • Cấp đề tài: {proj.level} {proj.completionAt && `• Hoàn thành: ${new Date(proj.completionAt).getFullYear()}`} {proj.evaluation && `• Đánh giá: ${proj.evaluation}`}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-800" asChild>
                                                <Link href={`/project-external/${proj.id}`}>Chi tiết</Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
