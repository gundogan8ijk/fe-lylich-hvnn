"use client"

import { useState } from "react"
import ContentProjectInfoManger from "./content-ProjectInfo"
import Loading from "@/_components/utils/Loading"
import ContentHeaderProjectManger from "./content-header"
import { FileText, Handshake, LayoutDashboard, Users, Wallet, ShieldCheck, Tag } from "lucide-react"
import ContentContributorsManger from "../(internal-contributor)/Content-contributors"
import ContentProjectResultManger from "./content-ProjectResult"
import ContentParticipantsManger from "../(external-participant)/Content-participants"
import ContentFundingManger from "../(funding)/Content-funding"
import { storeProjectManagerDetail } from "@/ProjectManger/store-detail-project-manger"


const TABS = [
    { id: 'overview', label: 'Tổng quan', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'members', label: 'Thành viên', icon: <Users className="w-4 h-4" /> },
    { id: 'supporters', label: 'Người hỗ trợ', icon: <Handshake className="w-4 h-4" /> },
    { id: 'funding', label: 'Nguồn kinh phí', icon: <Wallet className="w-4 h-4" /> },
]

export default function ProjectMangerDetailContent() {
    const data = storeProjectManagerDetail((s) => s.data)
    const isLoading = storeProjectManagerDetail((s) => s.isLoading)
    const [activeTab, setActiveTab] = useState('overview')
    
    if (isLoading) return <Loading />
    if (!data) return null

    return (
        <div className="space-y-6">
            {/* Header của Project Manger */}
            <ContentHeaderProjectManger />

            {/* 3. THANH DIỀU HƯỚNG TAB (Đã fix tràn trên mobile) */}
            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 px-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-3 text-sm font-medium transition-all relative outline-none shrink-0 ${isActive
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                                }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>

                            {/* Thanh gạch chân hiệu ứng khi Active */}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* 4. NỘI DUNG HIỂN THỊ THEO TAB */}
            <div className="transition-all duration-200">
                {activeTab === 'overview' && (
                    <>
                        <ContentProjectInfoManger />
                        <ContentProjectResultManger />
                    </>
                )}

                {activeTab === 'members' && (
                    <ContentContributorsManger />
                )}

                {activeTab === 'supporters' && (
                    <ContentParticipantsManger />
                )}

                {activeTab === 'funding' && (
                    <ContentFundingManger />
                )}
            </div>
        </div>
    )
}