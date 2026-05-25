'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Departments } from '@/_types/department-type'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation";


export default function DepartmentCard({ department }: { department: Departments }) {
    const getInitials = (name: string) =>
        name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    const router = useRouter();


    return (
        <Card className="pt-0 group relative overflow-hidden bg-card border-muted hover:border-primary/50 hover:shadow-xl transition-all duration-500">

            {/* IMAGE SECTION */}
            <div className="relative h-40 overflow-hidden bg-slate-100">
                {/* Overlay gradient để text bên dưới nổi bật hơn (nếu cần) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                <div className="relative h-40 w-full overflow-hidden"> {/* Cần h-40 và relative ở đây */}
                    {department.avatarUrl ? (
                        <Image
                            src={department.avatarUrl}
                            alt={department.name}
                            fill loading="eager"
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/40 via-secondary/10 to-accent/10">
                            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                {getInitials(department.name)}
                            </span>
                        </div>
                    )}
                </div>
                {/* Badge đè lên ảnh cho gọn */}
                <div className="absolute top-3 left-3 z-20">
                    <Badge className="bg-white/90 backdrop-blur-sm text-primary border-none shadow-sm hover:bg-white">
                        {department.code}
                    </Badge>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5 flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 pb-2">
                        {department.name}
                    </h3>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="p-1.5 rounded-md bg-primary/5 group-hover:bg-primary/10 transition-colors">
                            <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{department.disciplines} chuyên ngành</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="p-1.5 rounded-md bg-orange-50 group-hover:bg-orange-100 transition-colors">
                            <Users className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium">{department.members} giảng viên</span>
                    </div>
                </div>

                {/* BUTTON SECTION */}
                <Button className="w-full mt-2 group/btn relative overflow-hidden transition-all hover:pr-8"
                    onClick={() => router.push(`/department/${department.id}`)}>
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-4 h-4 absolute right-4 opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                </Button>
            </div>
        </Card>
    )
}