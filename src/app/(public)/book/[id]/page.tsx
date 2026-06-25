'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPublicBookDetailAction } from '@/working-public/book-Public/book-public-hook';
import { BookPublicDetail } from '@/working-public/book-Public/book-public-type';
import { Card } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import { Badge } from '@/_components/ui/badge';
import Loading from '@/_components/utils/Loading';
import { ArrowLeft, BookOpen, Calendar, Globe, Layers, User, Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PublicBookDetailPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [book, setBook] = useState<BookPublicDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            const res = await getPublicBookDetailAction(id);
            if (res) {
                setBook(res);
            } else {
                setBook(null);
            }
            setIsLoading(false);
        };
        if (id) fetchDetail();
    }, [id]);

    if (isLoading) return <Loading />;
    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <p className="text-lg text-muted-foreground">Không tìm thấy thông tin sách hoặc ấn phẩm chưa được công khai.</p>
                <Button onClick={() => router.push('/book')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh mục
                </Button>
            </div>
        );
    }

    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <div className="w-full space-y-6 py-6">
                {/* Back Link */}
                <button
                    onClick={() => router.push('/book')}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại danh mục sách
                </button>

                {/* Main Detail Card */}
                <Card className="p-6 md:p-8 bg-white shadow-xl rounded-2xl border-none space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600" />
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
                            <BookOpen className="w-4 h-4" />
                            <span>Ấn phẩm khoa học</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            {book.title}
                        </h1>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Năm xuất bản: <strong className="text-slate-900">{new Date(book.publishYear).getFullYear()}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>NXB: <strong className="text-slate-900">{book.publisher || "N/A"}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>ISBN: <strong className="text-slate-900">{book.isbn || "N/A"}</strong></span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-900">Mô tả / Tóm tắt</h3>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                            {book.describe || "Không có mô tả chi tiết."}
                        </p>
                    </div>

                    {/* Links */}
                    {book.detailUrl && (
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button variant="outline" size="sm" className="gap-1.5" asChild>
                                <a href={book.detailUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3.5 h-3.5" /> Đường dẫn chi tiết
                                </a>
                            </Button>
                        </div>
                    )}

                    {/* Fields of Study (Disciplines) */}
                    {book.disciplines.length > 0 && (
                        <div className="space-y-3 pt-2">
                            <h3 className="font-bold text-slate-900 text-sm">Lĩnh vực & Chuyên ngành</h3>
                            <div className="flex flex-wrap gap-2">
                                {book.disciplines.map((d) => (
                                    <Badge key={d.id} variant="secondary" className="bg-slate-100 text-slate-800 border-none font-medium px-2.5 py-1">
                                        {d.name} ({d.code})
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contributors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        {/* Internal Contributors */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <User className="w-4 h-4 text-emerald-600" /> Tác giả trong học viện
                            </h3>
                            {book.internalContributors.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Không có đồng tác giả trong học viện.</p>
                            ) : (
                                <div className="space-y-2.5">
                                    {book.internalContributors.map((c) => (
                                        <div key={c.id} className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                                            <div>
                                                <Link href={`/officials/${c.lecturerId}`} className="font-semibold text-sm text-slate-900 hover:text-emerald-600 transition-colors">
                                                    {c.fullName}
                                                </Link>
                                                <p className="text-xs text-slate-500 mt-0.5">Mã: {c.code}</p>
                                            </div>
                                            <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50 shadow-none font-medium shrink-0">
                                                {c.bookRole}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* External Contributors */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <Award className="w-4 h-4 text-orange-600" /> Tác giả ngoài học viện
                            </h3>
                            {book.externalContributors.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Không có đồng tác giả ngoài học viện.</p>
                            ) : (
                                <div className="space-y-2.5">
                                    {book.externalContributors.map((c) => (
                                        <div key={c.id} className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                                            <div>
                                                <p className="font-semibold text-sm text-slate-900">{c.fullName}</p>
                                                {c.email && <p className="text-xs text-slate-500 mt-0.5">{c.email}</p>}
                                            </div>
                                            <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50 shadow-none font-medium shrink-0">
                                                {c.bookRole}
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
