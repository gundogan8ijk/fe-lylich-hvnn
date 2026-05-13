'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Departments } from '@/types/department-type'
import { Button } from '@/components/ui/button'


export default function DepartmentCard({ department }: { department: Departments }) {

    const getInitials = (name: string) =>
        name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

    return (
        <Card className="p-0 group cursor-pointer overflow-hidden bg-card border hover:shadow-md transition-all duration-300">

            {/* IMAGE */}
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/10">

                {department.avatarUrl ? (
                    <Image
                        src={department.avatarUrl}
                        alt={department.name}
                        fill unoptimized
                        sizes="(max-width: 768px) 100vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary/60">
                            {getInitials(department.name)}
                        </span>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-3">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 font-semibold shadow-sm">
                    {department.code}
                </Badge>

                <h3 className="text-xl font-bold mt-2 line-clamp-2">
                    {department.name}
                </h3>
            </div>

            {/* BUTTON */}
                <Button className='text-center flex mx-6 cursor-pointer '>
                    Xem chi tiết
                </Button>

        </Card>
    )
}