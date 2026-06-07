'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';

interface SortJoinedAtProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SortJoinedAt({ value, onChange }: SortJoinedAtProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sắp xếp thời gian" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc">Mới nhất</SelectItem>
                <SelectItem value="asc">Cũ nhất</SelectItem>
            </SelectContent>
        </Select>
    );
}
