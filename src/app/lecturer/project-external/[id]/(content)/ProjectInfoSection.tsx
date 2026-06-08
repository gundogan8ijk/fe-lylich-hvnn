'use client';

import { storeProjectExternalDetail } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-store';
import { useState } from 'react';
import UpdateProjectDialog from './UpdateProjectDialog';

export default function ProjectInfoSection() {
    const { data: project } = storeProjectExternalDetail();
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!project) return null;

    const canUpdate = project.confirmedStatus === 'Draft' && project.isMyCreate;

    return (
        <div className="bg-card rounded-lg border border-border shadow-sm p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground">Thông tin đề tài</h2>

                {canUpdate && (
                    <button
                        onClick={() => setDialogOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Chỉnh sửa
                    </button>
                )}
            </div>

            {/* Các trường thông tin cơ bản */}
            <div className="mb-8 space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tên đề tài</label>
                <p className="text-base text-foreground font-medium">{project.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cơ quan chủ trì</label>
                    <p className="text-base text-foreground font-medium">{project.organization}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Ngày hoàn thành</label>
                    <p className="text-base text-foreground font-medium">{project.completionAt}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cấp độ</label>
                    <p className="text-base text-foreground font-medium">{project.level}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Đánh giá</label>
                    <p className="text-base text-foreground font-medium">{project.evaluation}</p>
                </div>
            </div>

            {project.detailUrl && (
                <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Link chi tiết</label>
                    <a href={project.detailUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm break-all hover:underline">
                        {project.detailUrl}
                    </a>
                </div>
            )}

            <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Chứng chỉ / Quyết định</label>
                {project.certificateUrl ? (
                    <a href={project.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm break-all hover:underline">
                        Xem file minh chứng
                    </a>
                ) : (
                    <p className="text-muted-foreground text-sm">Không có</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Người đăng ký</label>
                    <p className="text-base text-foreground font-medium">{project.createdByName}</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Ngày tạo</label>
                    <p className="text-base text-foreground font-medium">{project.createdAt}</p>
                </div>
            </div>

            <UpdateProjectDialog
                key={dialogOpen ? `open-${project.id}` : `closed-${project.id}`}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                project={project}
            />
        </div>
    );
}