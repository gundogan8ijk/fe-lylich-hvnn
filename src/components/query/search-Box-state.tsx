import { useEffect, useRef, useState } from "react";
import { StoreApi, UseBoundStore } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

type QueryStore<TFilter, TSortField extends string> = UseBoundStore<
    StoreApi<{
        query: { search: string };
        setSearch: (value: string) => void;
    }>
>;

/**
 * "dynamic"  – commit mỗi keystroke (chỉ dùng cho client-side filter)
 * "debounce" – commit sau debounceMs không gõ thêm  (default, dùng cho API)
 * "static"   – chỉ commit khi Enter hoặc click button
 */
type SearchMode = "dynamic" | "debounce" | "static";

type SearchBoxProps<TFilter, TSortField extends string> = {
    store: QueryStore<TFilter, TSortField>;
    mode?: SearchMode;
    placeholder?: string;
    showButton?: boolean;
    debounceMs?: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchBoxState<TFilter, TSortField extends string>({
    store,
    mode = "debounce",
    placeholder = "Search...",
    showButton = false,
    debounceMs = 300,
}: SearchBoxProps<TFilter, TSortField>) {
    const storeSearch = store((s) => s.query.search);
    const setSearch = store((s) => s.setSearch);

    const [localValue, setLocalValue] = useState(storeSearch);
    const debounced = useDebounce(localValue, mode === "debounce" ? debounceMs : 0);

    // Sync store → local khi store thay đổi từ bên ngoài (ví dụ: reset filter)
    // Dùng ref để tránh overwrite khi user đang gõ
    const isEditingRef = useRef(false);

    useEffect(() => {
        if (!isEditingRef.current) {
            setLocalValue(storeSearch);
        }
    }, [storeSearch]);

    // Debounce mode: auto-commit khi debounced thay đổi
    useEffect(() => {
        if (mode === "debounce") {
            setSearch(debounced);
        }
    }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

    // Dynamic mode: commit ngay mỗi keystroke
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        isEditingRef.current = true;
        setLocalValue(val);
        if (mode === "dynamic") setSearch(val);
    };

    const commit = () => {
        isEditingRef.current = false;
        setSearch(localValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
            isEditingRef.current = false;
            setLocalValue(storeSearch);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <input
                aria-label={placeholder}
                value={localValue}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={() => { isEditingRef.current = false; }}
                className="h-9 w-full md:w-[280px] lg:w-[320px] px-3 rounded-lg border border-border/60 bg-muted/50"
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
    );
}

export function useDebounce<T>(value: T, delayMs: number): T {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
}
