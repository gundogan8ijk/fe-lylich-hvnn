import { SelectionOption } from "@/_Common/_types/query-types";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/_components/ui/select";


type Props<T> = {
    value: T;
    onChange: (value: T) => void;
    options: SelectionOption<T>[] | readonly SelectionOption<T>[];
    placeholder?: string;
};

export function SearchSelectProps<T>({
    value,
    onChange,
    options,
    placeholder = "Filter...",
}: Props<T>) {

    // 1. Chuyển đổi giá trị hiện tại sang string để Radix UI có thể hiểu được
    const stringValue = value !== undefined && value !== null ? String(value) : "";

    // 2. Tìm lại giá trị gốc dựa trên chuỗi string mà Radix trả về
    const handleValueChange = (v: string) => {
        const foundOption = options.find((opt) => String(opt.value) === v);
        if (foundOption) {
            onChange(foundOption.value); // Trả về kiểu dữ liệu T gốc (string, number,...)
        }
    };

    return (
        <Select value={stringValue} onValueChange={handleValueChange}>
            <SelectTrigger className="w-auto px-3 h-9 rounded-lg bg-muted/50 border border-border/60 hover:bg-muted hover:border-border/80 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                {options.map((opt, index) => {
                    // Chuyển đổi value của từng option thành string để làm key và value cho Radix
                    const optStringValue = String(opt.value);

                    return (
                        <SelectItem
                            // Kết hợp index để tránh trùng key nếu các giá trị string hóa giống nhau
                            key={`${optStringValue}-${index}`}
                            value={optStringValue}
                        >
                            {opt.label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}