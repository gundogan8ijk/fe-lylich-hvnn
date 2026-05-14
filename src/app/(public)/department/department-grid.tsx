'use client'
import { storeDepartment } from '@/stores/department-store';
import DepartmentCard from './department-card'
import Loading from'@/components/utils/Loading'

export default function DepartmentGrid() {
    const isLoading = storeDepartment((s) => s.loading);
    const  items = storeDepartment((s) => s.data);

    if (isLoading)
        return <Loading></Loading>;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
            {items?.map((department) => (
                <DepartmentCard key={department.id} department={department} />
            ))}
        </div>
    )
}
