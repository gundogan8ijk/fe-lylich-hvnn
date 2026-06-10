"use client";

import { Award, Trophy, User, CalendarDays } from "lucide-react";
import { storePublicAwards } from "@/working-public/home/home-store";

export default function ContentAwards() {
    const awards = storePublicAwards((s) => s.awards);
    const loading = storePublicAwards((s) => s.loading);
    const page = storePublicAwards((s) => s.page);
    const totalPages = storePublicAwards((s) => s.pagination.totalPages);
    const setPage = storePublicAwards((s) => s.setPage);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-bl-full blur-3xl" />

            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 sticky top-0">
                <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-500" />
                    <h2 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        Giải thưởng mới
                    </h2>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar z-10 relative">
                {loading && (
                    <div className="py-8 flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500" />
                    </div>
                )}

                {!loading && awards.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                        Chưa có giải thưởng nào.
                    </div>
                )}

                {!loading && awards.map((item) => (
                    <div
                        key={item.awardId}
                        className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-900 transition-colors"
                    >
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                            {item.awardName}
                        </h3>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <Award className="w-3.5 h-3.5 text-amber-500" />
                                <span>{item.awardLevel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                <User className="w-3.5 h-3.5 text-blue-500" />
                                <span>{item.lecturerName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                                <CalendarDays className="w-3.5 h-3.5" />
                                <span>{item.awardDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1 || loading}
                        className="px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Trước
                    </button>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages || loading}
                        className="px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    );
}
