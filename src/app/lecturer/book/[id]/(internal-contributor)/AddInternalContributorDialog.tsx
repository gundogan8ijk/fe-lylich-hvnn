'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { getListLecturersNameApi } from '@/working-Lecturer/profile/infor/Lecturer-Profile-ser';
import { LecturersNameItems } from '@/working-Lecturer/profile/infor/Profile-lecurer-type';
import { storeBookDetail } from '@/working-Lecturer/Book-Detail/Book-Detail-store';
import { BOOK_CONTRIBUTOR_ROLE_OPTIONS, BookContributorRoleName } from '@/_constants/Book-constant';
import { addInternalContributorAction } from '@/working-Lecturer/Book-Detail/Book-Detail-hook';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddInternalContributorDialog({ isOpen, onClose }: Props) {
    const { data: book } = storeBookDetail();

    const [selectedLecturer, setSelectedLecturer] = useState<LecturersNameItems | null>(null);
    const [lecturerQuery, setLecturerQuery] = useState('');
    const [lecturerResults, setLecturerResults] = useState<LecturersNameItems[]>([]);
    const [lecturerLoading, setLecturerLoading] = useState(false);
    const [ddOpen, setDdOpen] = useState(false);
    const [role, setRole] = useState<BookContributorRoleName>(
        BOOK_CONTRIBUTOR_ROLE_OPTIONS[0]?.value ?? 'CoAuthor'
    );
    const [loading, setLoading] = useState(false);

    const wrapRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchIdRef = useRef<number>(0);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setDdOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    if (!isOpen) return null;

    const searchLecturers = async (q: string) => {
        setLecturerLoading(true);
        const id = ++searchIdRef.current;
        try {
            const res = await getListLecturersNameApi(q);
            if (id === searchIdRef.current && res.code === 1 && res.data) {
                setLecturerResults(res.data);
            }
        } finally {
            if (id === searchIdRef.current) setLecturerLoading(false);
        }
    };

    const handleInput = (q: string) => {
        setLecturerQuery(q);
        setDdOpen(true);
        if (selectedLecturer) setSelectedLecturer(null);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => searchLecturers(q), 400);
    };

    const clear = () => {
        setSelectedLecturer(null);
        setLecturerQuery('');
        setLecturerResults([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLecturer || !book?.id) return;

        setLoading(true);
        try {
            await addInternalContributorAction(book.id, {
                lecturerId: selectedLecturer.id,
                role,
            });
            clear();
            onClose();
        } catch (error) {
            console.error('Lỗi thêm tác giả nội bộ:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-background rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border animate-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="text-base font-semibold text-foreground">Thêm tác giả nội bộ</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5" ref={wrapRef}>
                        <label className="block text-sm font-semibold text-foreground">
                            Giảng viên <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            {!selectedLecturer ? (
                                <>
                                    <div className="flex min-h-9 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/50 transition-colors bg-background">
                                        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                        <input
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                                            placeholder="Tìm theo mã hoặc tên giảng viên..."
                                            value={lecturerQuery}
                                            onChange={(e) => handleInput(e.target.value)}
                                            onFocus={() => { setDdOpen(true); searchLecturers(lecturerQuery); }}
                                            onKeyDown={(e) => { if (e.key === 'Escape') setDdOpen(false); }}
                                        />
                                    </div>
                                    {ddOpen && (
                                        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                                            {lecturerLoading ? (
                                                <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                                </div>
                                            ) : lecturerResults.length === 0 ? (
                                                <p className="px-3 py-2.5 text-xs text-muted-foreground">Không tìm thấy kết quả</p>
                                            ) : (
                                                lecturerResults.map((l) => (
                                                    <button
                                                        key={l.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedLecturer(l);
                                                            setLecturerQuery(l.name);
                                                            setDdOpen(false);
                                                        }}
                                                        className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                    >
                                                        <span className="font-mono text-xs text-muted-foreground shrink-0">{l.code}</span>
                                                        <span className="text-muted-foreground/40">·</span>
                                                        <span className="truncate">{l.name}</span>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex min-h-9 items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5">
                                    <div className="flex items-baseline gap-2 overflow-hidden text-sm">
                                        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground self-center" />
                                        <span className="font-mono text-xs text-muted-foreground shrink-0">{selectedLecturer.code}</span>
                                        <span className="text-muted-foreground/40 shrink-0">·</span>
                                        <span className="font-medium truncate text-foreground">{selectedLecturer.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clear}
                                        className="ml-auto rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-foreground">Vai trò</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as BookContributorRoleName)}
                            className="w-full px-3 py-2.5 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                        >
                            {BOOK_CONTRIBUTOR_ROLE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/60">
                        <button
                            type="submit"
                            disabled={loading || !selectedLecturer}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs text-sm"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-1.5">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang lưu...
                                </span>
                            ) : (
                                'Thêm tác giả'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}