'use client';

import { Card } from '@/_components/ui/card';
import { Badge } from '@/_components/ui/badge';
import { Button } from '@/_components/ui/button';
import { Eye, Calendar, ExternalLink, UserCheck, Globe, Lock, BookOpen } from 'lucide-react';
import { confirmedStyle, STATUS_LABELS, confirmedGradient } from '@/_constants/base-constant';
import { getDateOnly } from '@/_lib/display-variable-helper';
import { BookItem } from '@/working-Lecturer/Book-List/Book-List-type';

type BookCardProps = {
    item: BookItem;
    onViewDetail: (id: string) => void;
};

export default function BookCard({ item, onViewDetail }: BookCardProps) {
    const confirmedInfo = confirmedStyle[item.confirmedStatus] ?? confirmedStyle.Pending;

    return (
        <Card className="group relative overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${confirmedGradient[item.confirmedStatus] || confirmedGradient.Pending}`} />

            <div className="p-4">
                <div className="mb-3 flex flex-col gap-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <BookOpen className="h-4 w-4 flex-shrink-0 text-amber-500" />

                            {item.isMyCreate && (
                                <Badge variant="secondary" className="gap-1 text-xs font-normal bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-0">
                                    <UserCheck className="h-3 w-3" /> Tôi tạo
                                </Badge>
                            )}

                            {item.isPublic ? (
                                <Badge variant="secondary" className="gap-1 text-xs font-normal bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-0">
                                    <Globe className="h-3 w-3" /> Công khai
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="gap-1 text-xs font-normal bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0">
                                    <Lock className="h-3 w-3" /> Riêng tư
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Xác thực:</span>
                            <Badge className={`${confirmedInfo.bg} ${confirmedInfo.text} border-0 text-xs font-medium`}>
                                {STATUS_LABELS[item.confirmedStatus]}
                            </Badge>
                        </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50 text-balance mt-1 leading-snug">
                        {item.title}
                    </h3>

                    {item.describe && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 text-balance mt-0.5">
                            {item.describe}
                        </p>
                    )}
                </div>

                <div className="my-3 h-px bg-slate-200 dark:bg-slate-800" />

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-x-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Cập nhật: <strong>{getDateOnly(item.lastModify)}</strong></span>
                    </div>

                    <div className="flex items-center gap-x-2">
                        {item.proofDocumentUrl && (
                            <Button asChild variant="outline" size="sm" className="h-7 gap-1 px-2.5 text-xs">
                                <a href={item.proofDocumentUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3" /> Minh chứng
                                </a>
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 px-2.5 text-xs text-slate-600 dark:text-slate-400"
                            onClick={() => onViewDetail(item.id)}
                        >
                            <Eye className="h-3.5 w-3.5" /> Xem chi tiết
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}