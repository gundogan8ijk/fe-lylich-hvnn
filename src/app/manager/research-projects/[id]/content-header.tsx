'use client'

import { storeProjectManagerDetail } from "@/stores/store-item/project-DetailManger-store";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";

// Định nghĩa/import nếu có sẵn, hoặc dùng tạm map text trực tiếp nếu chưa có helper
const CONFIRMED_MAP: Record<string, { label: string; cls: string }> = {
    Pending: { label: "Chờ duyệt", cls: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50" },
    Approved: { label: "Đã duyệt", cls: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50" },
    Rejected: { label: "Từ chối", cls: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50" },
};

export default function ContentHeaderProjectManger() {
    // Lấy dữ liệu từ global store
    const data = storeProjectManagerDetail((s) => s.data);

    // Xử lý an toàn khi store chưa có dữ liệu hoặc đang loading
    if (!data) return null;

    const statusCfg = CONFIRMED_MAP[data.confirmed] ?? {
        label: data.confirmed,
        cls: "bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
    };

    return (
        <div className="space-y-4 mb-3">
            {/* ─── BREADCRUMB ─────────────────────────────────── */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                <a href="/manager/" className="hover:text-indigo-500 transition-colors">
                    Trang chủ
                </a>
                <ArrowLeft className="w-3 h-3 opacity-50 rotate-180" />
                <a href="/manager/research-projects/" className="hover:text-indigo-500 transition-colors">
                    Đề tài
                </a>
                <ArrowLeft className="w-3 h-3 opacity-50 rotate-180" />
                <span className="font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                    {data.code}
                </span>
            </nav>

            {/* ─── ACTION BAR ─────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4 flex-wrap bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">

                {/* Trạng thái xác nhận */}
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase shadow-sm ${statusCfg.cls}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {statusCfg.label}
                    </span>
                </div>

                {/* Nhóm nút hành động được phân quyền */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {data.permissions?.canUpdateConfirmed && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 gap-1.5 px-4 text-xs font-bold text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                        >
                            <ShieldCheck className="w-4 h-4 text-indigo-500" /> Phê duyệt
                        </Button>
                    )}

                    {data.permissions?.canDeleteProject && (
                        <Button
                            variant="destructive"
                            size="sm"
                            className="h-9 gap-1.5 px-4 text-xs font-bold rounded-xl shadow-sm bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:hover:bg-rose-900/40 dark:text-rose-400 border border-rose-200/40 dark:border-rose-900/40"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Xóa đề tài
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}