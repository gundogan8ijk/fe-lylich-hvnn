"use client";

import { Search, BookOpen, Newspaper, Lightbulb, FolderDot } from "lucide-react";
import { storePublicActivities } from "@/working-public/home/home-store";

const getTypeIcon = (type: string) => {
    switch (type) {
        case "Article": return <Newspaper className="w-5 h-5 text-blue-500" />;
        case "Book": return <BookOpen className="w-5 h-5 text-amber-500" />;
        case "ResearchProject": return <Lightbulb className="w-5 h-5 text-emerald-500" />;
        case "ProjectExternal": return <FolderDot className="w-5 h-5 text-indigo-500" />;
        default: return <BookOpen className="w-5 h-5 text-slate-500" />;
    }
};

const getTypeName = (type: string) => {
    switch (type) {
        case "Article": return "Bài báo";
        case "Book": return "Sách";
        case "ResearchProject": return "Đề tài nội bộ";
        case "ProjectExternal": return "Đề tài bên ngoài";
        default: return type;
    }
};

export default function ContentActivities() {
    const activities = storePublicActivities((s) => s.activities);
    const loading = storePublicActivities((s) => s.loading);
    const page = storePublicActivities((s) => s.page);
    const totalPages = storePublicActivities((s) => s.pagination.totalPages);
    const setPage = storePublicActivities((s) => s.setPage);
    const searchQuery = storePublicActivities((s) => s.searchQuery);
    const setSearchQuery = storePublicActivities((s) => s.setSearchQuery);
    const typeFilter = storePublicActivities((s) => s.typeFilter);
    const setTypeFilter = storePublicActivities((s) => s.setTypeFilter);

    const filteredActivities = activities.filter((item) => {
        const matchesSearch = searchQuery
            ? item.title?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesType = typeFilter
            ? item.type.toLowerCase() === typeFilter.toLowerCase()
            : true;
        return matchesSearch && matchesType;
    });

    return (
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md rounded border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Hoạt Động Nổi Bật
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="py-2 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                    >
                        <option value="">Tất cả phân loại</option>
                        <option value="article">Bài báo</option>
                        <option value="book">Sách</option>
                        <option value="researchproject">Đề tài nội bộ</option>
                        <option value="projectexternal">Đề tài bên ngoài</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {loading && filteredActivities.length === 0 ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredActivities.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        Không tìm thấy hoạt động nào phù hợp.
                    </div>
                ) : (
                    filteredActivities.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white dark:bg-slate-800 p-5 border border-slate-100 dark:border-slate-700 transition-colors overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-900 group-hover:scale-110 transition-transform">
                                    {getTypeIcon(item.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                            {getTypeName(item.type)}
                                        </span>
                                        {item.date && (
                                            <span className="text-xs text-slate-400">{item.date}</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Trước
                    </button>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Trang {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    );
}
