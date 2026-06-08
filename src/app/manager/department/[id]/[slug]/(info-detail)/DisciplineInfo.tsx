'use client'

import { Card } from '@/_components/ui/card'
import { BookOpen, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import NotFound from '@/app/not-found'
import Loading from '@/_components/utils/Loading'
import { DisciplineDetailPublic } from '@/working-manager/department/discipline/discipline-manger-type'
import { getDisciplineDetailAction, deleteDisciplineAction, toggleDisciplineVisibilityAction } from '@/working-manager/department/discipline/discipline-manger-hook'
import { Eye, EyeOff, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/_components/ui/alert-dialog'
import EditDisciplineNameDialog from './edit-discipline-name-dialog'
import EditDisciplineCodeDialog from './edit-discipline-code-dialog'
import EditDisciplineDescribeDialog from './edit-discipline-describe-dialog'
import EditDisciplineCreditsDialog from './edit-discipline-credits-dialog'

export function DisciplineDetailInfo({ id, disciplineId }: { id: string, disciplineId: string }) {
    const [discipline, setDiscipline] = React.useState<DisciplineDetailPublic | null>(null);
    const [isLoading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);
    const router = useRouter();

    const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

    useEffect(() => {
        async function fetchDiscipline() {
            setLoading(true);
            const res = await getDisciplineDetailAction(disciplineId);
            if (res) setDiscipline(res);
            else setNotFound(true);
            setLoading(false);
        }
        fetchDiscipline();
    }, [disciplineId, refreshTrigger]);

    const handleDelete = async () => {
        const success = await deleteDisciplineAction(id, disciplineId);
        if (success) {
            router.push(`/manager/department/${id}`);
        }
    }

    const handleToggleVisibility = async () => {
        const success = await toggleDisciplineVisibilityAction(id, disciplineId);
        if (success) {
            handleRefresh();
        }
    }

    if (isLoading) return <Loading></Loading>;
    if (notFound || !discipline) return <NotFound />;

    const { disciplineName, code, disciplineDescribe, createdAt, totalCredits, name: departmentName, memberAmount, courseAmount } = discipline;

    const createdYear = new Date(createdAt).getFullYear()

    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4">
            <div className="w-full">
                <Link 
                    href={`/manager/department/${id}`} 
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
                            <EditDisciplineNameDialog departmentId={id} id={disciplineId} initialName={disciplineName} onUpdated={handleRefresh} />
                            {!discipline.isPublish && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                    Đang ẩn
                                </span>
                            )}
                        </div>
                        <div className="text-base text-gray-600 flex items-start gap-2">
                            {disciplineDescribe}
                            <EditDisciplineDescribeDialog departmentId={id} id={disciplineId} initialDescribe={disciplineDescribe} onUpdated={handleRefresh} />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant={discipline.isPublish ? "outline" : "default"}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    {discipline.isPublish ? (
                                        <>
                                            <EyeOff className="w-4 h-4" />
                                            Ẩn
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4" />
                                            Hiện
                                        </>
                                    )}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Xác nhận thay đổi trạng thái?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Bạn có chắc chắn muốn {discipline.isPublish ? "ẩn" : "hiển thị"} chuyên ngành này?
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

                        {courseAmount > 0 ? (
                            <Button 
                                variant="destructive" 
                                size="sm"
                                className="flex items-center gap-2 opacity-50 cursor-not-allowed" 
                                title="Không thể xóa chuyên ngành đã có môn học"
                            >
                                <Trash2 className="w-4 h-4" />
                                Xóa
                            </Button>
                        ) : (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" className="flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        Xóa
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Hành động này không thể hoàn tác. Chuyên ngành này và toàn bộ dữ liệu liên quan sẽ bị xóa vĩnh viễn.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                            Xác nhận xóa
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
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
                                <div className='flex items-center gap-x-2.5 text-sm uppercase'>
                                    <p className="font-semibold text-gray-500">Mã chuyên ngành :</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-gray-900">{code}</p>
                                        <EditDisciplineCodeDialog departmentId={id} id={disciplineId} initialCode={code} onUpdated={handleRefresh} />
                                    </div>
                                </div>
                                <div className="pt-2 flex items-baseline uppercase font-semibold gap-x-3">
                                    <p className="text-gray-500">Thuộc khoa :</p>
                                    <p className="text-black">{departmentName}</p>
                                </div>
                                <div className="pt-2 flex items-center uppercase font-semibold gap-x-3">
                                    <p className="text-gray-500">Số tín chỉ :</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-black">{totalCredits}</p>
                                        <EditDisciplineCreditsDialog departmentId={id} id={disciplineId} initialCredits={totalCredits} onUpdated={handleRefresh} />
                                    </div>
                                </div>
                                <div className="pt-2 flex items-baseline uppercase font-semibold gap-x-3">
                                    <p className="text-gray-500">Thành lập :</p>
                                    <p className="text-black">{createdYear}</p>
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
