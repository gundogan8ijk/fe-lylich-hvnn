'use client';

import Loading from '@/_components/utils/Loading';
import ActionButtons from './ActionButtons';
import BookInfoSection from './BookInfoSection';
import { BookOpen, FileText } from 'lucide-react';
import { storeBookDetail } from '@/Book-Lecturer-Detail/Book-Detail-store';
import { STATUS_LABELS } from '@/_constants/base-constant';
import InternalContributorsSum from '../(internal-contributor)/InternalContributorsSum';
import ExternalContributorsSum from '../(external-contributor)/ExternalContributorsSum';
import DisciplinesSum from '../(discipline)/DisciplinesSum';

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

export default function BookDetailContent() {
  const book = storeBookDetail((s) => s.data);
  const loading = storeBookDetail((s) => s.isLoading);

  if (loading) return <Loading />;

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-3">
          <div className="text-6xl font-light text-slate-200">∅</div>
          <p className="text-slate-400 text-sm">Không tìm thấy sách</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(book.confirmedStatus)}`}>
                  {STATUS_LABELS[book.confirmedStatus]}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-snug text-balance">
                {book.title}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-500">
                {book.publisher && <span>NXB: <strong>{book.publisher}</strong></span>}
                <span>Năm XB: <strong>{book.publishYear}</strong></span>
                {book.isbn && <span>ISBN: <strong>{book.isbn}</strong></span>}
              </div>
              {book.describe && (
                <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {book.describe}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              Thông tin sách
            </h2>
          </div>
          <BookInfoSection />
        </div>

        {/* Contributors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5">
            <InternalContributorsSum />
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5">
            <ExternalContributorsSum />
          </div>
        </div>

        <DisciplinesSum />

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mt-5 p-3">
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}