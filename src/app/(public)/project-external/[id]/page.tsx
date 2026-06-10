'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPublicProjectExternalDetailAction } from '@/working-public/project-external-Public/project-external-public-hook';
import { ProjectExternalPublicDetail } from '@/working-public/project-external-Public/project-external-public-type';
import { Card } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import { Badge } from '@/_components/ui/badge';
import Loading from '@/_components/utils/Loading';
import { ArrowLeft, Cpu, Calendar, Tag, ShieldAlert, User, Building2, Layers, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PublicProjectExternalDetailPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [project, setProject] = useState<ProjectExternalPublicDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            const res = await getPublicProjectExternalDetailAction(id);
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
                <Button onClick={() => router.push('/project-external')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
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
                    onClick={() => router.push('/project-external')}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại danh sách đề tài
                </button>

                {/* Main Detail Card */}
                <Card className="p-6 md:p-8 bg-white shadow-xl rounded-2xl border-none space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-cyan-600" />
                    
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase">
                                <Cpu className="w-4 h-4" />
                                <span>Đề tài hợp tác khoa học bên ngoài • {project.code}</span>
                            </div>
                            <Badge className="bg-cyan-50 text-cyan-800 border-none px-2.5 py-1 font-bold text-xs">
                                Kết quả: {project.evaluation}
                            </Badge>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            {project.title}
                        </h1>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-cyan-600 shrink-0" />
                            <span>Hoàn thành: <strong className="text-slate-900">
                                {project.completionAt ? new Date(project.completionAt).toLocaleDateString('vi-VN') : 'N/A'}
                            </strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-cyan-600 shrink-0" />
                            <span>Cấp quản lý: <strong className="text-slate-900">{project.level}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
                            <span>Đơn vị chủ quản: <strong className="text-slate-900">{project.organization}</strong></span>
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

                    {/* Team Members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        {/* Contributors */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <User className="w-4 h-4 text-cyan-600" /> Cán bộ tham gia (Học viện)
                            </h3>
                            {project.contributors.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Chưa cập nhật cán bộ tham gia.</p>
                            ) : (
                                <div className="space-y-2">
                                    {project.contributors.map((c) => (
                                        <div key={c.id} className="flex justify-between items-center text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                            <div>
                                                <Link href={`/officials/${c.lecturerId}`} className="font-semibold text-slate-900 hover:text-cyan-600 transition-colors">
                                                    {c.fullName}
                                                </Link>
                                                <p className="text-[10px] text-slate-500">Mã: {c.code} • Ngày tham gia: {new Date(c.joinedAt).toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] border-cyan-200 text-cyan-700 bg-cyan-50 shadow-none font-medium">
                                                {c.role}
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
                                <div className="space-y-2">
                                    {project.participants.map((p) => (
                                        <div key={p.id} className="flex justify-between items-center text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                            <div>
                                                <p className="font-semibold text-slate-900">{p.fullName}</p>
                                                <p className="text-[10px] text-slate-500">{p.email || "Không có Email"} • Ngày tham gia: {new Date(p.joinedAt).toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] border-orange-200 text-orange-700 bg-orange-50 shadow-none font-medium">
                                                {p.role}
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
