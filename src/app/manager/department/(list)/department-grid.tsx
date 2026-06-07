'use client'
import { storeDepartmentListPublic } from '@/department-Manager/department-manger-store';
import DepartmentCard from './department-card'
import Loading from '@/_components/utils/Loading'

export default function DepartmentGrid() {
    const isLoading = storeDepartmentListPublic((s) => s.loading);
    const items = storeDepartmentListPublic((s) => s.data);

    if (isLoading)
        return <Loading></Loading>;

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
            {items?.map((department) => (
                <DepartmentCard key={department.id} department={department} />
            ))}
        </div>
    )
}
