'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPublicResearchProjectDetailAction } from '@/working-public/research-project-Public/research-project-public-hook';
import { ResearchProjectPublicDetail } from '@/working-public/research-project-Public/research-project-public-type';
import { Card } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import { Badge } from '@/_components/ui/badge';
import Loading from '@/_components/utils/Loading';
import { ArrowLeft, Cpu, Calendar, Tag, ShieldAlert, User, DollarSign, Layers, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { PROJECT_LEVEL_LABELS, ProjectLevelName, EVALUATION_RESULT_LABELS, EvaluationResultName, PROJECT_STATUS_LABELS, ProjectStatusName, CONTRIBUTOR_STATUS_LABELS, ContributorStatusName, PARTICIPANT_STATUS_LABELS, ParticipantStatusName } from '@/_constants/project-constant';

export default function PublicResearchProjectDetailPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [project, setProject] = useState<ResearchProjectPublicDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            const res = await getPublicResearchProjectDetailAction(id);
            if (res) {
                setProject(res);
            } else {
                setProject(null);
            }
            setIsLoading(false);
        };
        if (id) fetchDetail();
    }, [id]);

    if (isLoading) return <Loading />;
    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <p className="text-lg text-muted-foreground">Không tìm thấy đề tài nghiên cứu hoặc đề tài chưa nghiệm thu/chưa công khai.</p>
                <Button onClick={() => router.push('/research-projects')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
                </Button>
            </div>
        );
    }

    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <div className="w-full space-y-6 py-6">
                {/* Back Link */}
                <button
                    onClick={() => router.push('/research-projects')}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại danh sách đề tài
                </button>

                {/* Main Detail Card */}
                <Card className="p-6 md:p-8 bg-white shadow-xl rounded-2xl border-none space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600" />
                    
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
                                <Cpu className="w-4 h-4" />
                                <span>Đề tài khoa học công nghệ nội bộ • {project.code}</span>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800 border-none px-2.5 py-1 font-bold text-xs">
                                Kết quả: {EVALUATION_RESULT_LABELS[project.evaluation as EvaluationResultName] || project.evaluation}
                            </Badge>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            {project.title}
                        </h1>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Thời gian: <strong className="text-slate-900">
                                {project.timeStart ? new Date(project.timeStart).getFullYear() : 'N/A'} - {project.timeEnd ? new Date(project.timeEnd).getFullYear() : 'N/A'}
                            </strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Cấp quản lý: <strong className="text-slate-900">{PROJECT_LEVEL_LABELS[project.level as ProjectLevelName] || project.level}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Trạng thái: <strong className="text-slate-900">{PROJECT_STATUS_LABELS[project.projectStatus as ProjectStatusName] || project.projectStatus}</strong></span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-900">Thuyết minh / Nội dung tóm tắt</h3>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                            {project.describe || "Không có nội dung mô tả."}
                        </p>
                    </div>

                    {/* Links */}
                    {project.detailUrl && (
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button variant="outline" size="sm" className="gap-1.5" asChild>
                                <a href={project.detailUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3.5 h-3.5" /> Link chi tiết đề tài
                                </a>
                            </Button>
                        </div>
                    )}

                    {/* Fields of Study (Disciplines) */}
                    {project.disciplines.length > 0 && (
                        <div className="space-y-3 pt-2">
                            <h3 className="font-bold text-slate-900 text-sm">Lĩnh vực & Chuyên ngành</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.disciplines.map((d) => (
                                    <Badge key={d.id} variant="secondary" className="bg-slate-100 text-slate-800 border-none font-medium px-2.5 py-1">
                                        {d.name} ({d.code})
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fundings */}
                    {project.fundings.length > 0 && (
                        <div className="space-y-3 pt-2">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-emerald-600" /> Nguồn kinh phí
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                {project.fundings.map((f, idx) => (
                                    <div key={idx} className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-lg">
                                        <div className="flex justify-between font-bold text-slate-900 mb-1">
                                            <span>Nguồn: {f.source}</span>
                                            <span className="text-emerald-700">{f.amount.toLocaleString('vi-VN')} VNĐ</span>
                                        </div>
                                        {f.description && <p className="text-[10px] text-slate-500">{f.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Team Members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        {/* Contributors */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <User className="w-4 h-4 text-emerald-600" /> Cán bộ tham gia (Học viện)
                            </h3>
                            {project.contributors.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Chưa cập nhật cán bộ tham gia.</p>
                            ) : (
                                <div className="space-y-2.5">
                                    {project.contributors.map((c) => (
                                        <div key={c.id} className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                                            <div>
                                                <Link href={`/officials/${c.lecturerId}`} className="font-semibold text-sm text-slate-900 hover:text-emerald-600 transition-colors">
                                                    {c.fullName}
                                                </Link>
                                                <p className="text-xs text-slate-500 mt-0.5">Mã: {c.code} • Ngày tham gia: {new Date(c.joinedAt).toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50 shadow-none font-medium shrink-0">
                                                {CONTRIBUTOR_STATUS_LABELS[c.status as ContributorStatusName] || c.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Participants */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <User className="w-4 h-4 text-orange-600" /> Thành viên ngoài học viện
                            </h3>
                            {project.participants.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Không có thành viên ngoài học viện tham gia.</p>
                            ) : (
                                <div className="space-y-2.5">
                                    {project.participants.map((p) => (
                                        <div key={p.id} className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                                            <div>
                                                <p className="font-semibold text-sm text-slate-900">{p.fullName}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{p.email || "Không có Email"} • Ngày tham gia: {new Date(p.joinedAt).toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50 shadow-none font-medium shrink-0">
                                                {PARTICIPANT_STATUS_LABELS[p.role as ParticipantStatusName] || p.role}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}
