import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/_components/ui/select";
import { StoreApi, UseBoundStore } from "zustand";
import { useDebounce } from "./search-Box-state";
import { ListQuery, SelectionOption } from "@/_Common/_types/query-types";

// ─── Types ────────────────────────────────────────────────────────────────────

type QueryStore<TFilter, TSortField extends string> = UseBoundStore<
    StoreApi<{
        query: ListQuery<TFilter, TSortField>;
        setSearch: (value: string) => void;
    }>
>;

type SearchBoxWithFieldProps<
    TFilter,
    TSortField extends string,
    TField extends string,
> = {
    store: QueryStore<TFilter, TSortField>;
    fieldOptions: SelectionOption<TField>[] | readonly SelectionOption<TField>[];
    field: TField;
    onFieldChange: (value: TField) => void;
    placeholder?: (field: TField) => string;
    showButton?: boolean;
    debounceMs?: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

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
    debounceMs = 300,
}: SearchBoxWithFieldProps<TFilter, TSortField, TField>) {
    const storeSearch = store((s) => s.query.search);
    const setSearch = store((s) => s.setSearch);

    const [localValue, setLocalValue] = useState(storeSearch);
    const debounced = useDebounce(localValue, debounceMs);
    const isEditingRef = useRef(false);

    // Sync store → local khi store reset từ bên ngoài
    useEffect(() => {
        if (!isEditingRef.current) {
            setLocalValue(storeSearch);
        }
    }, [storeSearch]);

    // Auto-commit debounced
    useEffect(() => {
        if (isEditingRef.current) {
            setSearch(debounced);
        }
    }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

    const commit = () => {
        isEditingRef.current = false;
        setSearch(localValue);
    };

    const handleFieldChange = (value: TField) => {
        // Reset cả local state lẫn store khi đổi field
        isEditingRef.current = false;
        setLocalValue("");
        setSearch("");           // ← fix: store phải được clear
        onFieldChange(value);
    };

    return (
        <div className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
                <input
                    aria-label={placeholder?.(field) ?? "Search"}
                    value={localValue}
                    placeholder={placeholder?.(field) ?? "Search..."}
                    onChange={(e) => {
                        isEditingRef.current = true;
                        setLocalValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commit();
                        if (e.key === "Escape") {
                            isEditingRef.current = false;
                            setLocalValue(storeSearch);
                        }
                    }}
                    onBlur={() => { isEditingRef.current = false; }}
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