import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SelectionOption } from "@/types/query-types";
import { StoreApi, UseBoundStore } from "zustand";

type QueryStore<TFilter, TSortField extends string> = {
    query: { search: string };
    setSearch: (value: string) => void;
};

type Props<TFilter, TSortField extends string, TField extends string> = {
    store: UseBoundStore<StoreApi<QueryStore<TFilter, TSortField>>>;
    fieldOptions: SelectionOption<TField>[] | readonly SelectionOption<TField>[];
    field: TField;
    onFieldChange: (value: TField) => void;
    placeholder?: (field: TField) => string;
    showButton?: boolean;
};

export function SearchBoxWithField<
    TFilter,
    TSortField extends string,
    TField extends string,
>({
    store,
    fieldOptions,
    field,
    onFieldChange,
    placeholder,
    showButton = false,
}: Props<TFilter, TSortField, TField>) {
    const storeSearch = store((s) => s.query.search);
    const setSearch = store((s) => s.setSearch);

    const [localValue, setLocalValue] = useState(storeSearch);
    const isEditing = useRef(false);

    useEffect(() => {
        if (!isEditing.current) {
            setLocalValue(storeSearch);
        }
    }, [storeSearch]);

    const handleFieldChange = (value: TField) => {
    isEditing.current = false;
    setLocalValue("");
    //setSearch("");
    onFieldChange(value);
};

    const commit = () => {
        isEditing.current = false;
        setSearch(localValue);
    };

    return (
        <div className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
                <input
                    value={localValue}
                    placeholder={placeholder?.(field) ?? "Search..."}
                    onChange={(e) => {
                        isEditing.current = true;
                        setLocalValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit();
                        if (e.key === "Escape") {
                            isEditing.current = false;
                            setLocalValue(storeSearch);
                        }
                    }}
                    onBlur={() => {
                        isEditing.current = false;
                    }}
                    className="h-9 w-[220px] px-3 rounded-lg border border-border/60 bg-muted/50"
                />

                {showButton && (
                    <button
                        onClick={commit}
                        className="h-9 px-4 rounded-lg bg-primary text-white"
                    >
                        Search
                    </button>
                )}
            </div>

            <Select value={field} onValueChange={(v: TField) => handleFieldChange(v)}>
                <SelectTrigger className="w-auto px-3 h-9 rounded-lg bg-muted/50 border border-border/60 hover:bg-muted hover:border-border/80 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring">
                    <SelectValue placeholder="Filter..." />
                </SelectTrigger>
                <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                    {fieldOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}