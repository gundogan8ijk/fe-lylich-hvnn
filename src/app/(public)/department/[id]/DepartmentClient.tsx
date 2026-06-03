'use client'

import Image from 'next/image'
import { Card } from '@/_components/ui/card'
import { Calendar, MapPin, Users, BookOpen } from 'lucide-react'
import React, { useEffect } from 'react'
import NotFound from '@/app/not-found'
import Loading from '@/_components/utils/Loading'
import ImageUndefine from '@/_components/utils/ImageUndefine'
import { DepartmentPublicDetail } from '@/department-Public/department-public-type'
import { getDepartmentsDetailPublicAction } from '@/department-Public/department-public-hook'

export function DepartmentDetailClient({ id }: { id: string }) {
    const [department, setDepartment] = React.useState<DepartmentPublicDetail | null>(null);
    const [isLoading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    useEffect(() => {
        async function fetchDepartment() {
            setLoading(true);

            const res = await getDepartmentsDetailPublicAction(id);

            if (res) setDepartment(res);
            else setNotFound(true);

            setLoading(false);
        }

        fetchDepartment();
    }, [id]);

    if (isLoading) return <Loading></Loading>;
    if (notFound || !department) return <NotFound />;

    const { name, code, describe, avatarUrl, createdAt, officeLocation,
        membersAmount, disciplineAmount, deanName, viceDeanName, } = department;


    const createdYear = new Date(createdAt).getFullYear()

    return (
        <main className="bg-gradient-to-br from-slate-50 to-slate-100 py-9 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-900 mb-2 text-balance">{name}</h1>
                    <p className="text-lg text-gray-600">{describe}</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Avatar & Basic Info */}
                    <div className="lg:col-span-1">
                        <Card className="overflow-hidden pt-0">
                            {avatarUrl ? (
                                <div className="relative w-full aspect-square bg-gray-200">
                                    <Image
                                        src={avatarUrl}
                                        alt={`Avatar của khoa ${name}`}
                                        fill   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover" loading="eager"
                                    />
                                </div>
                            ) : <ImageUndefine></ImageUndefine>}

                            <div className="p-5">
                                <h2 className="text-sm font-semibold text-black uppercase tracking-wide mb-3">
                                    Thông tin cơ bản
                                </h2>
                                <div className="flex flex-col">
                                    <div className='flex items-baseline gap-x-2.5 text-sm uppercase'>
                                        <p className=" font-semibold text-gray-500 ">Mã khoa :</p>
                                        <p className=" font-bold text-gray-900">{code}</p>
                                    </div>
                                    <div className="pt-2 flex items-baseline uppercase font-semibold gap-x-3">
                                        <p className="  text-gray-500 ">thành lập :</p>
                                        <p className="text-black"> {createdYear}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Section - Detailed Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Location Card */}
                        <Card className="p-6">
                            <div className="flex gap-4">
                                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Văn phòng</h3>
                                    <p className="text-gray-700">{officeLocation}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Thành viên</p>
                                        <p className="text-2xl font-bold text-gray-900">{membersAmount}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Chuyên ngành</p>
                                        <p className="text-2xl font-bold text-gray-900">{disciplineAmount}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Leadership Section */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                Ban lãnh đạo
                            </h3>
                            <div className="space-y-4">
                                {deanName ? (
                                    <div className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Trưởng khoa</p>
                                        <p className="text-gray-900 font-medium">{deanName}</p>
                                    </div>
                                ) : (
                                    <div className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Trưởng khoa</p>
                                        <p className="text-gray-500 italic">Chưa cập nhật</p>
                                    </div>
                                )}
                                {viceDeanName ? (
                                    <div className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Phó trưởng khoa</p>
                                        <p className="text-gray-900 font-medium">{viceDeanName}</p>
                                    </div>
                                ) : (
                                    <div className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Phó trưởng khoa</p>
                                        <p className="text-gray-500 italic">Chưa cập nhật</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}
