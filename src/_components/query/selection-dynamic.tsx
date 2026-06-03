import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/_components/ui/select";
import { SelectionSlice } from "@/_Common/_stores/base-list/selection-module";
import { StoreApi, UseBoundStore } from "zustand";

type SearchSelectProps<T extends string> = {
    useStore: UseBoundStore<StoreApi<SelectionSlice<T>>>;
};

export function SelectionDynamic<T extends string>({ useStore }: SearchSelectProps<T>) {
    // 1. Lấy dữ liệu từ store được truyền vào thông qua props
    const field = useStore((state) => state.field);
    const setField = useStore((state) => state.setField);
    const options = useStore((state) => state.options);

    return (
        <Select 
            value={field} 
            // 2. Ép kiểu v về T vì Radix Select trả về string
            onValueChange={(v) => setField(v as T)}
        >
            <SelectTrigger className="w-auto px-3 h-9 rounded-lg bg-muted/50 border border-border/60 hover:bg-muted hover:border-border/80 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring">
                <SelectValue placeholder="Filter..." />
            </SelectTrigger>

            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}