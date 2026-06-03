import { Search } from "lucide-react";
import { Input } from "../ui/input";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Tìm kiếm...",
    className = ""
}: SearchInputProps) {
    return (
        <div className={`relative flex-1 group ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />

            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/30 rounded-xl transition-all"
            />
        </div>
    );
}