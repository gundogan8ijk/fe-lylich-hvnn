'use client'

import { Card } from '@/_components/ui/card'
import { BookOpen, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import NotFound from '@/app/not-found'
import Loading from '@/_components/utils/Loading'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DisciplineDetailPublic } from '@/working-public/department-Public/department-public-type'
import { getPublicDisciplineDetailAction } from '@/working-public/department-Public/department-public-hook'

export function DisciplineInfoPublic({ departmentId, disciplineId }: { departmentId: string, disciplineId: string }) {
    const [discipline, setDiscipline] = React.useState<DisciplineDetailPublic | null>(null);
    const [isLoading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    useEffect(() => {
        async function fetchDiscipline() {
            setLoading(true);
            const res = await getPublicDisciplineDetailAction(departmentId, disciplineId);
            if (res) setDiscipline(res);
            else setNotFound(true);
            setLoading(false);
        }
        fetchDiscipline();
    }, [departmentId, disciplineId]);

    if (isLoading) return <Loading></Loading>;
    if (notFound || !discipline) return <NotFound />;

    const { name: disciplineName, departmentCode: code, describe: disciplineDescribe, totalCredits, departmentName, memberAmount, courseAmount } = discipline;

    return (
        <main className="flex flex-col bg-background w-full px-4 mt-8">
            <div className="w-full max-w-4xl mx-auto">
                <Link 
                    href={`/department/${departmentId}`} 
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại chi tiết khoa
                </Link>

                {/* Header Section */}
                <div className="mb-6 flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-balance">{disciplineName}</h1>
                        </div>
                        <div className="text-base text-gray-600 flex items-start gap-2">
                            {disciplineDescribe}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Basic Info */}
                    <div className="lg:col-span-1">
                        <Card className="p-5">
                            <h2 className="text-sm font-semibold text-black uppercase tracking-wide mb-3">
                                Thông tin cơ bản
                            </h2>
                            <div className="flex flex-col">
                                <div className="pt-2 flex items-baseline uppercase font-semibold gap-x-3">
                                    <p className="text-gray-500">Thuộc khoa :</p>
                                    <p className="text-black">{departmentName}</p>
                                </div>
                                <div className="pt-2 flex items-center uppercase font-semibold gap-x-3">
                                    <p className="text-gray-500">Số tín chỉ :</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-black">{totalCredits}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Section - Detailed Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Giảng viên</p>
                                        <p className="text-2xl font-bold text-gray-900">{memberAmount}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Môn học</p>
                                        <p className="text-2xl font-bold text-gray-900">{courseAmount}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
