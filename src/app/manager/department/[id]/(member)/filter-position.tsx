'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';
import { AcademicPositions } from './edit-member-position-dialog';

interface FilterPositionProps {
    value: string;
    onChange: (value: string) => void;
}

export default function FilterPosition({ value, onChange }: FilterPositionProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Tất cả chức vụ" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Tất cả chức vụ</SelectItem>
                {AcademicPositions.map((pos) => (
                    <SelectItem key={pos.name} value={pos.name}>
                        {pos.displayName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
