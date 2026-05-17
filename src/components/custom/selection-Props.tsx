import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { SelectionOption } from "@/types/query-types";


type Props<T extends string> = {
    value: T;
    onChange: (value: T) => void;
    options: SelectionOption<T>[] | readonly SelectionOption<T>[];
};

export function SearchSelectProps<T extends string>({
    value,
    onChange,
    options,
}: Props<T>) {
    return (
        <Select value={value} onValueChange={(v: T) => onChange(v)}>
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