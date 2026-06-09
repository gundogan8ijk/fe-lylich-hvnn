'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { storeProjectDetail } from '@/working-Lecturer/Project-Detail/Project-Detail-store'
import { ArrowLeft, Loader2, AlertCircle, FileText, UserCheck, Users, Tag, Wallet, Star } from 'lucide-react'
import { getLabel } from '@/_lib/display-variable-helper'
import { STATUS_LABELS } from '@/_constants/base-constant'
import { ProjectStatus_OPTIONS } from '@/_constants/project-constant'
import { STATUS_COLOR } from './ProjectInfoSection'

import ActionButtons from './ActionButtons'
import ProjectInfoSection from './ProjectInfoSection'
import ContributorsSection from '../(internal-contributor)/ContributorsSection'
import ParticipantsSection from '../(external-participant)/ParticipantsSection'
import DisciplinesSection from '../(discipline)/DisciplinesSection'
import FundingsSection from '../(funding)/FundingsSection'

const TABS = [
    { key: 'overview', label: 'Tổng quan', icon: FileText },
    { key: 'contributors', label: 'Thành viên', icon: UserCheck },
    { key: 'participants', label: 'Người tham gia', icon: Users },
    { key: 'disciplines', label: 'Lĩnh vực', icon: Tag },
    { key: 'fundings', label: 'Kinh phí', icon: Wallet },
] as const

type TabKey = typeof TABS[number]['key']

export default function ProjectDetailContent() {
    const router = useRouter()
    const { data: detail, isLoading: loading } = storeProjectDetail()
    const error = null // BaseStore doesn't have error by default
    const [activeTab, setActiveTab] = useState<TabKey>('overview')

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 gap-3 dark:text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
                <p className="text-sm font-medium animate-pulse">Đang tải thông tin đề tài...</p>
            </div>
        )
    }

    if (error || !detail) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center dark:bg-red-900/20">
                    <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
                </div>
                <div className="text-center">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Không thể tải đề tài</h3>
                    <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{error || 'Không tìm thấy dữ liệu'}</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1.5 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-100 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
            {/* Top bar */}
            <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur sticky top-0 z-10 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    {/* Top Row: Back & Actions */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Quay lại</span>
                        </button>
                        <ActionButtons />
                    </div>

                    {/* Bottom Row: Title & Badges */}
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-medium text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800 px-2 py-0.5 rounded">
                                    {detail.code}
                                </span>
                                {detail.isMyCreate && (
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-2 py-0.5 rounded">
                                        <Star className="w-3 h-3" /> Đề tài của tôi
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded border ${STATUS_COLOR[detail.confirmedStatus as keyof typeof STATUS_COLOR] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {STATUS_LABELS[detail.confirmedStatus as keyof typeof STATUS_LABELS] || detail.confirmedStatus}
                                </span>
                                <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded border ${STATUS_COLOR[detail.projectStatus as keyof typeof STATUS_COLOR] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {getLabel(ProjectStatus_OPTIONS, detail.projectStatus) || detail.projectStatus}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">{detail.title}</h1>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-[#0F172A]/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-0 overflow-x-auto">
                    {TABS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${activeTab === key
                                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-400'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                            {key === 'contributors' && (
                                <span className="ml-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full dark:bg-slate-700 dark:text-slate-400">
                                    {detail.contributors.length}/{detail.maxContributors}
                                </span>
                            )}
                            {key === 'participants' && (
                                <span className="ml-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full dark:bg-slate-700 dark:text-slate-400">
                                    {detail.participants.length}/{detail.maxParticipants}
                                </span>
                            )}
                            {key === 'disciplines' && (
                                <span className="ml-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full dark:bg-slate-700 dark:text-slate-400">
                                    {detail.disciplines.length}/{detail.maxDisciplines}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                {activeTab === 'overview' && <ProjectInfoSection />}
                {activeTab === 'contributors' && <ContributorsSection />}
                {activeTab === 'participants' && <ParticipantsSection />}
                {activeTab === 'disciplines' && <DisciplinesSection />}
                {activeTab === 'fundings' && <FundingsSection />}
            </div>
        </div>
    )
}

