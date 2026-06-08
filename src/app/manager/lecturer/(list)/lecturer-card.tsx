'use client'

import { Card } from '@/_components/ui/card'
import { Badge } from '@/_components/ui/badge'
import Image from 'next/image'
import { Button } from '@/_components/ui/button'
import { ArrowRight, Globe, EyeOff, Building2, BookOpen } from 'lucide-react'
import { useRouter } from "next/navigation";
import { LecturerItemByMangerDto } from '@/working-manager/lecturer/lecturer-manger-type'

export default function LecturerCard({ lecturer }: { lecturer: LecturerItemByMangerDto }) {
    const getInitials = (name: string) =>
        name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
    
    const router = useRouter();

    const avatarUrl = typeof lecturer.avatarUrl === 'string' ? lecturer.avatarUrl : (lecturer.avatarUrl as any)?.value;
    const lecturerCode = typeof lecturer.lecturerCode === 'string' ? lecturer.lecturerCode : (lecturer.lecturerCode as any)?.value;
    const departmentName = typeof lecturer.departmentName === 'string' ? lecturer.departmentName : (lecturer.departmentName as any)?.value;
    const disciplineName = typeof lecturer.disciplineName === 'string' ? lecturer.disciplineName : (lecturer.disciplineName as any)?.value;
    const cccd = typeof lecturer.cccd === 'string' ? lecturer.cccd : (lecturer.cccd as any)?.value;

    return (
        <Card className="pt-0 group relative overflow-hidden bg-card border-muted hover:border-primary/50 hover:shadow-xl transition-all duration-500">
            <div className="relative h-40 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                <div className="relative h-40 w-full overflow-hidden">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={lecturer.fullName}
                            fill loading="eager"
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/40 via-secondary/10 to-accent/10">
                            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                {getInitials(lecturer.fullName)}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <Badge className="bg-white/90 backdrop-blur-sm text-primary border-none shadow-sm hover:bg-white w-fit">
                        {lecturerCode}
                    </Badge>
                </div>
                
                <div className="absolute bottom-3 right-3 z-20">
                    {lecturer.isPublic ? (
                        <Badge className="bg-green-500/90 backdrop-blur-sm text-white border-none shadow-sm hover:bg-green-600 gap-1 w-fit">
                            <Globe className="w-3 h-3" /> 
                        </Badge>
                    ) : (
                        <Badge className="bg-slate-500/90 backdrop-blur-sm text-white border-none shadow-sm hover:bg-slate-600 gap-1 w-fit">
                            <EyeOff className="w-3 h-3" /> Ẩn
                        </Badge>
                    )}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 pb-2">
                        {lecturer.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">CCCD: {cccd}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="p-1.5 rounded-md bg-primary/5 group-hover:bg-primary/10 transition-colors">
                            <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium line-clamp-1">{departmentName || "Chưa thuộc khoa"}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="p-1.5 rounded-md bg-orange-50 group-hover:bg-orange-100 transition-colors">
                            <BookOpen className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium line-clamp-1">{disciplineName || "Chưa thuộc bộ môn"}</span>
                    </div>
                </div>

                <Button className="w-full mt-2 group/btn relative overflow-hidden transition-all hover:pr-8"
                    onClick={() => router.push(`/manager/lecturer/${typeof lecturer.lecturerId === 'string' ? lecturer.lecturerId : (lecturer.lecturerId as any)?.value}`)}>
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-4 h-4 absolute right-4 opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                </Button>
            </div>
        </Card>
    )
}
