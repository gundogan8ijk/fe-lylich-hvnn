'use client'

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/_components/ui/card';
import { Badge } from '@/_components/ui/badge';
import { Trophy, FileText, CheckCircle, XCircle, Globe, Lock, User, Building2, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/_components/ui/button';
import { verifyAwardManagerAction, cancelAwardManagerAction } from '@/working-manager/award/award-manager-hook';
import { getDateOnly } from '@/_lib/display-variable-helper';
import { AWARD_LEVEL_OPTIONS } from '@/_constants/award-constant';
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
} from '@/_components/ui/alert-dialog';
import Loading from '@/_components/utils/Loading';
import { ConfirmedStatus, confirmedStyle, STATUS_LABELS } from '@/_constants/base-constant';
import { storeAwardDetailManager } from '@/working-manager/award/award-manager-store';

function getAwardLevelLabel(level: string): string {
    const byValue = AWARD_LEVEL_OPTIONS.find(d => d.value === level);
    if (byValue) return byValue.label;
    const byLabel = AWARD_LEVEL_OPTIONS.find(d => d.label === level);
    if (byLabel) return byLabel.label;
    return level;
}

export default function ContentAwardDetail() {
    const router = useRouter();
    const data = storeAwardDetailManager((s) => s.data)
    const isLoading = storeAwardDetailManager((s) => s.isLoading)

    if (isLoading) return <div className="mt-20"><Loading /></div>;
    if (!data) return <div className="mt-20 text-center text-muted-foreground">Không tìm thấy thông tin giải thưởng</div>;

    const confirmedInfo = confirmedStyle[data.confirmedStatus as ConfirmedStatus] ?? confirmedStyle.Pending;

    const statusGradient: Record<ConfirmedStatus, string> = {
        Draft: "from-slate-400 to-slate-500",
        Pending: "from-amber-400 to-amber-500",
        Verified: "from-emerald-400 to-emerald-500",
        Cancelled: "from-red-400 to-red-500",
    };
    const gradient = statusGradient[data.confirmedStatus as ConfirmedStatus] ?? "from-orange-400 to-amber-500";

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="gap-2 text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" /> Quay lại
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái: Thông tin chính */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
                        <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <Badge className={`${confirmedInfo.bg} ${confirmedInfo.text} border-0 px-3 py-1 text-sm font-medium`}>
                                    Trạng thái: {STATUS_LABELS[data.confirmedStatus as ConfirmedStatus] || data.confirmedStatus}
                                </Badge>

                                {data.isPublic ? (
                                    <Badge variant="secondary" className="gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-0">
                                        <Globe className="h-3.5 w-3.5" /> Hiển thị công khai
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">
                                        <Lock className="h-3.5 w-3.5" /> Chỉ mình tôi
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-snug text-balance">
                                {data.awardsName}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
                                <Trophy className="h-4 w-4" />
                                <span>Cấp độ: {getAwardLevelLabel(data.awardLevel)}</span>
                            </div>

                            <div className="my-8 h-px bg-slate-100" />

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-slate-500" /> Thông tin chi tiết
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Cấp độ giải thưởng</label>
                                        <p className="text-foreground font-medium">{getAwardLevelLabel(data.awardLevel)}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Thời gian đạt giải</label>
                                        <p className="text-foreground font-medium">
                                            {data.awardDate ? getDateOnly(data.awardDate) : 'Chưa cập nhật'}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Mô tả giải thưởng</label>
                                        <p className="text-foreground whitespace-pre-wrap mt-1">
                                            {data.awardsDescription || 'Không có mô tả chi tiết.'}
                                        </p>
                                    </div>

                                    {data.proofUrl && (
                                        <div className="space-y-2 md:col-span-2 mt-2">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Minh chứng đính kèm</label>
                                            <div>
                                                <Button asChild variant="outline" size="sm" className="gap-2">
                                                    <a href={data.proofUrl} target="_blank" rel="noopener noreferrer">
                                                        <FileText className="h-4 w-4" /> Xem minh chứng
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cột phải: GV & Actions */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200">
                        <CardContent className="p-6">
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <User className="h-4 w-4 text-slate-500" /> Chủ sở hữu
                            </h3>
                            
                            <Link href={`/manager/lecturer/${data.lecturerId}`} className="flex items-center gap-4 hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors group">
                                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0 overflow-hidden">
                                    {data.avatarUrl ? (
                                        <img src={data.avatarUrl} alt={data.fullName} className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-6 w-6 text-slate-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{data.fullName}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                        <Badge variant="outline" className="text-xs font-normal px-1.5 py-0">
                                            {data.lecturerCode}
                                        </Badge>
                                    </p>
                                </div>
                            </Link>

                            <div className="my-5 h-px bg-slate-100" />
                            
                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Ngày tạo:</span>
                                    <span className="font-medium text-slate-900">{getDateOnly(data.lastModify)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Cập nhật lần cuối:</span>
                                    <span className="font-medium text-slate-900">{getDateOnly(data.lastModify)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions Card */}
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-slate-50">
                        <CardContent className="p-6">
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                                Phê duyệt
                            </h3>
                            <p className="text-sm text-slate-600 mb-6">
                                Với vai trò quản lý, bạn có thể xét duyệt hoặc từ chối giải thưởng này.
                            </p>

                            <div className="flex flex-col gap-3">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            className="w-full gap-2" 
                                            disabled={data.confirmedStatus === 'Verified' || data.confirmedStatus === 'Cancelled'}
                                        >
                                            <CheckCircle className="h-4 w-4" /> 
                                            {data.confirmedStatus === 'Verified' ? 'Đã duyệt' : 'Duyệt giải thưởng'}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Xác nhận phê duyệt</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn có chắc chắn muốn phê duyệt giải thưởng <strong>{data.awardsName}</strong> của giảng viên <strong>{data.fullName}</strong>?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction 
                                                onClick={() => verifyAwardManagerAction(data.awardId)}
                                                className="bg-emerald-600 hover:bg-emerald-700"
                                            >
                                                Đồng ý duyệt
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            variant="destructive" 
                                            className="w-full gap-2"
                                            disabled={data.confirmedStatus === 'Cancelled' || data.confirmedStatus === 'Verified'}
                                        >
                                            <XCircle className="h-4 w-4" /> 
                                            Từ chối giải thưởng
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Xác nhận từ chối</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn có chắc chắn muốn từ chối giải thưởng này? Giải thưởng sẽ bị đánh dấu là đã hủy.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction 
                                                onClick={() => cancelAwardManagerAction(data.awardId)}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Đồng ý từ chối
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
