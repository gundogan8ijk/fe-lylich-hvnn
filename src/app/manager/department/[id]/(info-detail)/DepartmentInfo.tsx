'use client'

import Image from 'next/image'
import { Card } from '@/_components/ui/card'
import { Calendar, MapPin, Users, BookOpen, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import NotFound from '@/app/not-found'
import Loading from '@/_components/utils/Loading'
import ImageUndefine from '@/_components/utils/ImageUndefine'
import { DepartmentMangerDetail } from '@/working-manager/department/infor/department-manger-type'
import { getDepartmentsDetailMangerAction, deleteDepartmentAction, toggleDepartmentVisibilityAction } from '@/working-manager/department/infor/department-manger-hook'
import { Button } from '@/_components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/_components/ui/alert-dialog"
import EditDepartmentNameDialog from './edit-department-name-dialog'
import EditDepartmentDescribeDialog from './edit-department-describe-dialog'
import EditDepartmentAvatarDialog from './edit-department-avatar-dialog'
import EditDepartmentCodeDialog from './edit-department-code-dialog'
import EditDepartmentLocationDialog from './edit-department-location-dialog'


export function DepartmentDetailInfo({ id }: { id: string }) {
    const [department, setDepartment] = React.useState<DepartmentMangerDetail | null>(null);
    const [isLoading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showToggleDialog, setShowToggleDialog] = useState(false);
    const [imgError, setImgError] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchDepartment() {
            setLoading(true);
            setImgError(false);
            const res = await getDepartmentsDetailMangerAction(id);
            if (res) setDepartment(res);
            else setNotFound(true);
            setLoading(false);
        }
        fetchDepartment();
    }, [id, refreshTrigger]);

    const handleUpdate = () => {
        setRefreshTrigger(prev => prev + 1);
    }

    const handleDelete = async () => {
        const success = await deleteDepartmentAction(id);
        if (success) {
            router.push('/manager/department');
        }
    };

    const handleToggleVisibility = async () => {
        const success = await toggleDepartmentVisibilityAction(id);
        if (success) {
            setShowToggleDialog(false);
            handleUpdate();
        }
    };

    if (isLoading) return <Loading></Loading>;
    if (notFound || !department) return <NotFound />;

    const { name, code, describe, avatarUrl, createdAt, officeLocation,
        membersAmount, disciplineAmount, deanName, viceDeanName, } = department;


    const createdYear = new Date(createdAt).getFullYear()

    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4">
            <div className="w-full">
                <Link 
                    href="/manager/department" 
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách khoa
                </Link>
                {/* Header Section */}
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <h1 className="text-2xl font-bold text-gray-900 text-balance">{name}</h1>
                            <EditDepartmentNameDialog departmentId={id} initialName={name} onUpdated={handleUpdate} />
                        </div>
                        <p className="text-sm text-gray-500 flex items-start">
                            {describe}
                            <EditDepartmentDescribeDialog departmentId={id} initialDescribe={describe} onUpdated={handleUpdate} />
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setShowToggleDialog(true)} 
                            className="bg-white hover:bg-slate-50"
                        >
                            {department.isPublic ? (
                                <><EyeOff className="mr-2 h-4 w-4" /> Ẩn khoa</>
                            ) : (
                                <><Eye className="mr-2 h-4 w-4" /> Hiện khoa</>
                            )}
                        </Button>
                        {membersAmount <= 0 && disciplineAmount <= 0 && (
                            <Button 
                                variant="destructive" 
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Xoá khoa
                            </Button>
                        )}
                    </div>
                </div>

                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa khoa này?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
                                Xóa
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={showToggleDialog} onOpenChange={setShowToggleDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {department.isPublic ? "Bạn có chắc chắn muốn ẩn khoa này?" : "Bạn có chắc chắn muốn hiện khoa này?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {department.isPublic 
                                    ? "Khoa sẽ bị ẩn khỏi danh sách công khai. Bạn có thể hiện lại bất cứ lúc nào." 
                                    : "Khoa sẽ được hiển thị công khai trên hệ thống."}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={handleToggleVisibility}>
                                Xác nhận
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Section - Avatar & Basic Info */}
                    <div className="lg:col-span-1">
                        <Card className="overflow-hidden pt-0 relative group">
                            {avatarUrl && !imgError ? (
                                <div className="relative w-full aspect-[4/3] bg-slate-50 border-b">
                                    <Image
                                        src={avatarUrl}
                                        alt={`Avatar của khoa ${name}`}
                                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-contain" loading="eager"
                                        unoptimized
                                        onError={() => setImgError(true)}
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full aspect-[4/3]">
                                    <ImageUndefine />
                                </div>
                            )}
                            <EditDepartmentAvatarDialog departmentId={id} initialAvatarUrl={avatarUrl} onUpdated={handleUpdate} />

                            <div className="p-4">
                                <h2 className="text-xs font-semibold text-black uppercase tracking-wide mb-2.5">
                                    Thông tin cơ bản
                                </h2>
                                <div className="flex flex-col">
                                    <div className='flex items-center gap-x-2 text-xs uppercase'>
                                        <p className=" font-semibold text-gray-500 ">Mã khoa :</p>
                                        <div className="flex items-center">
                                            <p className=" font-bold text-gray-900">{code}</p>
                                            <EditDepartmentCodeDialog departmentId={id} initialCode={code} onUpdated={handleUpdate} />
                                        </div>
                                    </div>
                                    <div className="pt-1.5 flex items-baseline uppercase font-semibold gap-x-2 text-xs">
                                        <p className="  text-gray-500 ">thành lập :</p>
                                        <p className="text-black"> {createdYear}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Section - Detailed Info */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Location Card */}
                        <Card className="p-6">
                            <div className="flex gap-4">
                                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                                        Văn phòng
                                        <EditDepartmentLocationDialog departmentId={id} initialLocation={officeLocation} onUpdated={handleUpdate} />
                                    </h3>
                                    <p className="text-gray-700">{officeLocation || <span className="italic text-gray-400">Chưa cập nhật</span>}</p>
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
