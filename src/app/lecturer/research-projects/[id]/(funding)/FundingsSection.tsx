'use client'

import { storeProjectDetail } from '@/Project-Lecturer-Detail/Project-Detail-store'
import { Wallet } from 'lucide-react'

function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{message}</p>
        </div>
    )
}

export default function FundingsSection() {
    const { data: detail } = storeProjectDetail()

    if (!detail) return null

    return (
        <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Nguồn kinh phí ({detail.fundings.length}/{detail.maxFundings})
            </h2>

            {detail.fundings.length === 0 ? (
                <EmptyState icon={Wallet} message="Chưa có thông tin kinh phí" />
            ) : (
                <div className="space-y-3">
                    {detail.fundings.map((f, i) => (
                        <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-4 hover:border-slate-350 dark:bg-[#0F172A] dark:border-slate-800 dark:hover:border-slate-700 transition-colors shadow-sm cursor-default">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{f.source}</p>
                                    <p className="text-xs text-slate-400 mt-1">{f.description}</p>
                                </div>
                                <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400 shrink-0">
                                    {f.amount.toLocaleString('vi-VN')} ₫
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 flex justify-between items-center dark:bg-[#0F172A] dark:border-emerald-500/20">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng cộng</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {detail.fundings.reduce((sum, f) => sum + f.amount, 0).toLocaleString('vi-VN')} ₫
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

