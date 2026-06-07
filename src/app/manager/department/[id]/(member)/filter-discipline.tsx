'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';
import { getListDisciplineByDepartmentIdPublicAction } from '@/department-Manager/department-manger-hook';
import { DisciplineOfDepartmentPublicItems } from '@/department-Manager/department-manger-type';
import { toSearchParams } from '@/_lib/query-options-toUrl-helper';

interface FilterDisciplineProps {
    departmentId: string;
    value: string;
    onChange: (value: string) => void;
}

export default function FilterDiscipline({ departmentId, value, onChange }: FilterDisciplineProps) {
    const [disciplines, setDisciplines] = useState<DisciplineOfDepartmentPublicItems[]>([]);

    useEffect(() => {
        const fetchDisciplines = async () => {
            const res = await getListDisciplineByDepartmentIdPublicAction(departmentId, toSearchParams({ search: '', sort: null, page: 1, perPage: 100 }));
            if (res) {
                setDisciplines(res.items);
            }
        };
        fetchDisciplines();
    }, [departmentId]);

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Tất cả bộ môn" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Tất cả bộ môn</SelectItem>
                {disciplines.map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                        {d.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
