'use client';

import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { storeBookDetail } from '@/working-Lecturer/Book-Detail/Book-Detail-store';
import { BOOK_CONTRIBUTOR_ROLE_OPTIONS, BookContributorRoleName } from '@/_constants/Book-constant';
import { updateExternalContributorAction } from '@/working-Lecturer/Book-Detail/Book-Detail-hook';

interface Props {
    externalContributorId: string | null;
    onClose: () => void;
}

export default function UpdateExternalContributorDialog({ externalContributorId, onClose }: Props) {
    const { data: book } = storeBookDetail();

    const contributor = book?.externalContributors.find(c => c.id === externalContributorId);

    const [fullName, setFullName] = useState(contributor?.fullName ?? '');
    const [email, setEmail] = useState(contributor?.email ?? '');
    const [role, setRole] = useState<BookContributorRoleName>(
        contributor?.role ?? (BOOK_CONTRIBUTOR_ROLE_OPTIONS[0]?.value ?? 'CoAuthor')
    );
    const [loading, setLoading] = useState(false);

    if (!externalContributorId || !contributor) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !book?.id) return;

        setLoading(true);
        try {
            const success = await updateExternalContributorAction(book.id, externalContributorId, {
                fullName: fullName.trim(),
                role,
                email: email.trim() || undefined,
            });
            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Lỗi cập nhật tác giả bên ngoài:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-background rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border animate-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="text-base font-semibold text-foreground">Cập nhật tác giả bên ngoài</h3>
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
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-foreground">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            disabled={loading}
                            placeholder="Nhập họ và tên..."
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-foreground">Email</label>
                        <input
                            type="email"
                            disabled={loading}
                            placeholder="tacgia@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                        />
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
                            disabled={loading || !fullName.trim()}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs text-sm"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-1.5">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang cập nhật...
                                </span>
                            ) : (
                                'Cập nhật'
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