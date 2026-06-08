'use client';

import Loading from '@/_components/utils/Loading';
import { storeArticleDetailManager } from '@/working-manager/article/article-manager-store';
import { STATUS_LABELS } from '@/_constants/base-constant';
import { BookOpen, FileText, CheckCircle, XCircle, Globe, Lock } from 'lucide-react';
import { Button } from '@/_components/ui/button';
import { verifyArticleManagerAction, rejectArticleManagerAction, togglePublishArticleManagerAction } from '@/working-manager/article/article-manager-hook';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/_components/ui/alert-dialog"
import Link from 'next/link';

const STATUS_BADGE_MAP = {
    Draft: 'bg-amber-50 text-amber-700 border border-amber-200',
    Pending: 'bg-blue-50 text-blue-700 border border-blue-200',
    Verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 border border-rose-200',
} as const;

type StatusKey = keyof typeof STATUS_BADGE_MAP;

function getStatusBadgeClass(status: string): string {
    return STATUS_BADGE_MAP[status as StatusKey] ?? 'bg-slate-50 text-slate-700 border border-slate-200';
}

export default function ContentArticleDetailManager() {
    const article = storeArticleDetailManager((s) => s.data);
    const loading = storeArticleDetailManager((s) => s.isLoading);

    if (loading) return <Loading />;

    if (!article) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-3">
                    <div className="text-6xl font-light text-slate-200">∅</div>
                    <p className="text-slate-400 text-sm">Không tìm thấy bài báo</p>
                </div>
            </div>
        );
    }

    const isPending = article.confirmedStatus === 'Pending';

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">

                {/* ── Header ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-5">

                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(article.confirmedStatus)}`}>
                                    {STATUS_LABELS[article.confirmedStatus as StatusKey] || article.confirmedStatus}
                                </span>
                                {article.isPublic ? (
                                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <Globe className="w-3 h-3" /> Công khai
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                        <Lock className="w-3 h-3" /> Riêng tư
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-snug text-balance">
                                {article.title}
                            </h1>

                            {article.describe && (
                                <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3">
                                    {article.describe}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Info ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                            Thông tin bài báo
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ngày công bố</label>
                            <p className="text-foreground font-medium">{article.publishedAt}</p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Người đăng kí</label>
                            <p className="text-foreground font-medium">{article.createdByName}</p>
                        </div>

                        {article.journalName && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tên tạp chí</label>
                                <p className="text-foreground font-medium">{article.journalName}</p>
                            </div>
                        )}

                        {article.doi && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">DOI</label>
                                <p className="text-foreground font-medium">{article.doi}</p>
                            </div>
                        )}

                        {article.detailUrl && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Link bài báo</label>
                                <p className="font-medium">
                                    <a href={article.detailUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {article.detailUrl}
                                    </a>
                                </p>
                            </div>
                        )}

                        {article.proofDocumentUrl && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Minh chứng</label>
                                <p className="font-medium">
                                    <a href={article.proofDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Tải xuống / Xem
                                    </a>
                                </p>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ngày tạo hệ thống</label>
                            <p className="text-foreground font-medium">{article.createdAt}</p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Cập nhật lần cuối</label>
                            <p className="text-foreground font-medium">{new Date(article.lastModify).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* ── Contributors & Disciplines ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5">
                        <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4">
                            Tác giả trong trường ({article.internalContributors?.length || 0})
                        </h2>
                        {article.internalContributors?.length > 0 ? (
                            <ul className="space-y-3">
                                {article.internalContributors.map((c) => (
                                    <li key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 transition-colors hover:bg-slate-100">
                                        <Link href={`/manager/lecturer/${c.lecturerId}`} className="block">
                                            <p className="font-medium text-sm text-blue-600 hover:underline">{c.fullName} - <span className="text-muted-foreground">{c.code}</span></p>
                                            <p className="text-xs text-slate-500 mt-1">Vai trò: {c.role}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500">Không có</p>
                        )}
                    </div>
                    
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5">
                        <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4">
                            Tác giả ngoài trường ({article.externalContributors?.length || 0})
                        </h2>
                        {article.externalContributors?.length > 0 ? (
                            <ul className="space-y-3">
                                {article.externalContributors.map((c) => (
                                    <li key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="font-medium text-sm">{c.fullName}</p>
                                        <p className="text-xs text-slate-500 mt-1">Email: {c.email || 'N/A'} • Vai trò: {c.role}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500">Không có</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 mb-6">
                    <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4">
                        Chuyên ngành ({article.disciplines?.length || 0})
                    </h2>
                    {article.disciplines?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {article.disciplines.map((d) => (
                                <span key={d.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                                    {d.name} ({d.code})
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">Không có</p>
                    )}
                </div>

                {/* ── Actions ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4">
                        Hành động quản lý
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        {isPending && (
                            <>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                            <CheckCircle className="w-4 h-4" /> Xác nhận phê duyệt
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Xác nhận phê duyệt bài báo?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn có chắc chắn muốn phê duyệt bài báo này? Sau khi phê duyệt, thông tin sẽ chính thức được ghi nhận.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => verifyArticleManagerAction(article.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                                Xác nhận
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="gap-2">
                                            <XCircle className="w-4 h-4" /> Từ chối
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Hủy bỏ bài báo?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn có chắc chắn muốn từ chối phê duyệt bài báo này? Trạng thái sẽ chuyển sang "Đã hủy".
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => rejectArticleManagerAction(article.id)} className="bg-red-600 hover:bg-red-700 text-white">
                                                Từ chối
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        )}

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    {article.isPublic ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                                    {article.isPublic ? 'Chuyển sang riêng tư' : 'Chuyển sang công khai'}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Thay đổi trạng thái hiển thị?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Bạn có chắc chắn muốn {article.isPublic ? 'ẩn' : 'công khai'} bài báo này đối với người ngoài hệ thống không?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => togglePublishArticleManagerAction(article.id)}>
                                        Xác nhận
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

            </div>
        </div>
    );
}
