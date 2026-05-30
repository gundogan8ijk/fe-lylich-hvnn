'use client'

import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteConfirmDialog from "@/components/custom/DeleteConfirmDialog";
import { ConfirmedStatus, STATUS_OPTIONS } from "@/constants/base-constant";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteMangerProjectDetailAction } from "@/ProjectManger/hook-projects-manger";
import { storeProjectManagerDetail } from "@/ProjectManger/store-detail-project-manger";

const CONFIRMED_MAP: Record<string, { label: string; cls: string }> = {
    Pending: { label: "Chờ duyệt", cls: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50" },
    Approved: { label: "Đã duyệt", cls: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50" },
    Rejected: { label: "Từ chối", cls: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50" },
};

export default function ContentHeaderProjectManger() {
    const data = storeProjectManagerDetail((s) => s.data);
    const isDeleting = storeProjectManagerDetail((s) => s.isDeleting);

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)
    const [confirmedStatus, setConfirmedStatus] = useState<ConfirmedStatus | null>(null)

    if (!data) return null;

    const statusCfg = CONFIRMED_MAP[data.confirmed] ?? {
        label: data.confirmed,
        cls: "bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
    };

    const openStatusDialog = () => {
        setConfirmedStatus(null)
        setStatusOpen(true)
    }

    const handleSaveStatus = () => {
        // store.updateConfirmed(selectedStatus)
        setStatusOpen(false)
    }

    return (
        <div className="space-y-4 mb-3">
            {/* ─── BREADCRUMB ─────────────────────────────────── */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                <Link href="/manager/" className="hover:text-indigo-500 transition-colors">
                    Trang chủ
                </Link>
                <ArrowLeft className="w-3 h-3 opacity-50 rotate-180" />
                <Link href="/manager/research-projects/" className="hover:text-indigo-500 transition-colors">
                    Đề tài
                </Link>
                <ArrowLeft className="w-3 h-3 opacity-50 rotate-180" />
                <span className="font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                    {data.code}
                </span>
            </nav>

            {/* ─── ACTION BAR ─────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4 flex-wrap bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">

                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase shadow-sm ${statusCfg.cls}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {statusCfg.label}
                    </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    {data.permissions?.canUpdateConfirmed && (
                        <Button
                            onClick={openStatusDialog}
                            variant="outline"
                            size="sm"
                            className="h-9 gap-1.5 px-4 text-xs font-bold text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                        >
                            <ShieldCheck className="w-4 h-4 text-indigo-500" /> Phê duyệt
                        </Button>
                    )}

                    {data.permissions?.canDeleteProject && (
                        <Button
                            onClick={() => setDeleteOpen(true)}
                            variant="destructive"
                            size="sm"
                            className="h-9 gap-1.5 px-4 text-xs font-bold rounded-xl shadow-sm bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:hover:bg-rose-900/40 dark:text-rose-400 border border-rose-200/40 dark:border-rose-900/40"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Xóa đề tài
                        </Button>
                    )}
                </div>
            </div>

            {/* ─── DELETE DIALOG ───────────────────────────────── */}
            <DeleteConfirmDialog
                open={deleteOpen}
                deleting={isDeleting}
                description={`Đề tài "${data.code}" sẽ bị xóa vĩnh viễn và không thể hoàn tác.`}
                onConfirm={deleteMangerProjectDetailAction}
                onCancel={() => setDeleteOpen(false)}
            />

            {/* ─── STATUS DIALOG ───────────────────────────────── */}
            <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cập nhật trạng thái</DialogTitle>
                        <DialogDescription>Chọn trạng thái mới cho đề tài</DialogDescription>
                    </DialogHeader>

                    {/* Trạng thái hiện tại */}
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-sm text-muted-foreground">Hiện tại:</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase shadow-sm ${statusCfg.cls}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {statusCfg.label}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 py-2">
                        {STATUS_OPTIONS
                            .filter(o => o.value !== 'Pending' && o.value !== data.confirmed) // ← thêm điều kiện này
                            .map(option => (
                                <Button
                                    key={option.value}
                                    type="button"
                                    variant={confirmedStatus === option.value ? 'default' : 'outline'}
                                    onClick={() => setConfirmedStatus(option.value as ConfirmedStatus)}
                                >
                                    {option.label}
                                </Button>
                            ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setStatusOpen(false)}>Hủy</Button>
                        <Button
                            onClick={handleSaveStatus}
                            disabled={!confirmedStatus || confirmedStatus === data.confirmed}
                        >
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}