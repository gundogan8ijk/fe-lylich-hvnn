'use client'

import { Button } from "@/_components/ui/button";
import { Trash2, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteConfirmDialog from "@/_components/custom/DeleteConfirmDialog";
import { ConfirmedStatus } from "@/_constants/base-constant";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/_components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/_components/ui/alert-dialog';
import { deleteMangerProjectDetailAction, updateConfirmedProjectDetailAction, hideProjectMangerAction } from "@/working-manager/ProjectManger/hook-projects-manger";
import { storeProjectManagerDetail } from "@/working-manager/ProjectManger/store-detail-project-manger";

export default function ContentHeaderProjectManger() {
    const data = storeProjectManagerDetail((s) => s.data);
    
    const isDeleting = storeProjectManagerDetail((s) => s.isDeleting);
    const isUpdating = storeProjectManagerDetail((s) => s.isUpdating);

    const { openModal, closeModal, isModalOpen } = storeProjectManagerDetail();

    const [confirmedStatus, setConfirmedStatus] = useState<ConfirmedStatus | null>(null);

    if (!data) return null;

    const statusCfg = CONFIRMED_MAP[data.confirmed] ?? {
        label: data.confirmed,
        cls: "bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
    };

    const handleSaveStatus = async () => {
        if (!confirmedStatus) return;
        await updateConfirmedProjectDetailAction(confirmedStatus);
        closeModal("updateStatus");
    };

    return (
        <div className="space-y-4 mb-3">
            {/* ─── BREADCRUMB ─────────────────────────────────── */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                <Link href="/manager/" className="hover:text-indigo-500 transition-colors">Trang chủ</Link>
                <ArrowLeft className="w-3 h-3 opacity-50 rotate-180" />
                <Link href="/manager/research-projects/" className="hover:text-indigo-500 transition-colors">Đề tài</Link>
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
                            onClick={() => {
                                setConfirmedStatus(null);
                                openModal("updateStatus");
                            }}
                            variant="outline"
                            size="sm"
                            className="h-9 gap-1.5 px-4 text-xs font-bold text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                        >
                            <ShieldCheck className="w-4 h-4 text-indigo-500" /> Phê duyệt
                        </Button>
                    )}

                    {data.permissions?.canTogglePublic && (
                        <Button
                            onClick={() => openModal("togglePublic")}
                            variant="outline"
                            size="sm"
                            disabled={isUpdating}
                            className={`h-9 gap-1.5 px-4 text-xs font-bold rounded-xl shadow-sm border ${
                                data.isPublic 
                                    ? "text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900" 
                                    : "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                            }`}
                        >
                            {data.isPublic ? (
                                <><EyeOff className="w-4 h-4" /> Ẩn đề tài</>
                            ) : (
                                <><Eye className="w-4 h-4" /> Hiện đề tài</>
                            )}
                        </Button>
                    )}

                    {data.permissions?.canDeleteProject && (
                        <Button
                            onClick={() => openModal("deleteProject")}
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
                open={isModalOpen("deleteProject")}
                deleting={isDeleting}
                description={`Đề tài "${data.code}" sẽ bị xóa vĩnh viễn và không thể hoàn tác.`}
                onConfirm={deleteMangerProjectDetailAction}
                onCancel={() => closeModal("deleteProject")}
            />

            {/* ─── HIDE/UNHIDE DIALOG ───────────────────────────── */}
            <AlertDialog open={isModalOpen("togglePublic")} onOpenChange={(open) => {
                if (!open) closeModal("togglePublic");
            }}>
                <AlertDialogContent className="rounded-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Xác nhận {data.isPublic ? "ẩn" : "hiển thị"} đề tài?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {data.isPublic 
                                ? "Khi ẩn, đề tài sẽ không còn được hiển thị công khai. Bạn có chắc chắn muốn ẩn đề tài này?" 
                                : "Khi hiển thị, đề tài sẽ được công khai. Bạn có chắc chắn muốn hiện đề tài này?"}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isUpdating} className="rounded-lg">
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (e) => {
                                e.preventDefault();
                                await hideProjectMangerAction();
                                closeModal("togglePublic");
                            }}
                            disabled={isUpdating}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                        >
                            {isUpdating ? 'Đang xử lý...' : 'Xác nhận'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ─── STATUS DIALOG ───────────────────────────────── */}
            <Dialog open={isModalOpen("updateStatus")} onOpenChange={() => closeModal("updateStatus")}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cập nhật trạng thái</DialogTitle>
                        <DialogDescription>Chọn trạng thái phê duyệt mới cho đề tài</DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center gap-2 pb-4 mb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm text-muted-foreground font-medium">Hiện tại:</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase shadow-sm ${statusCfg.cls}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {statusCfg.label}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <span className="text-sm text-muted-foreground font-medium">Xác thực đề tài:</span>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {confirmed_Options.map(option => (
                                <Button
                                    key={option.value}
                                    type="button"
                                    variant={confirmedStatus === option.value ? 'default' : 'outline'}
                                    className="h-12 capitalize font-semibold transition-all"
                                    onClick={() => setConfirmedStatus(option.value)}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Button variant="outline" onClick={() => closeModal("updateStatus")}>Hủy</Button>
                        <Button
                            onClick={handleSaveStatus}
                            disabled={!confirmedStatus || confirmedStatus === data.confirmed || isUpdating}
                        >
                            Lưu thay đổi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const CONFIRMED_MAP: Record<string, { label: string; cls: string }> = {
    Pending: { label: "Chờ duyệt", cls: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50" },
    Verified: { label: "Đã duyệt", cls: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50" },
    Cancelled: { label: "Từ chối", cls: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-emerald-900/50" },
};

export const confirmed_Options: { value: ConfirmedStatus; label: string }[] = [
    { value: 'Verified', label: 'phê duyệt' },
    { value: 'Cancelled', label: 'hủy bỏ' },
];