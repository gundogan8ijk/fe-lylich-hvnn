import { QuerySlice } from "@/stores/base-list/query-module";
import { useRef, useState } from "react";
import { StoreApi, UseBoundStore } from "zustand";

type QueryStore<TFilter, TSortField extends string> =
    UseBoundStore<StoreApi<QuerySlice<TFilter, TSortField>>>;

type SearchBoxProps<TFilter, TSortField extends string> = {
    store: QueryStore<TFilter, TSortField>;
    placeholder?: string;
    showButton?: boolean;
    debounceMs?: number;
};

export function SearchBoxDynamicTime<TFilter, TSortField extends string>({
    store,
    placeholder,
    showButton = true,
    debounceMs = 300,
}: SearchBoxProps<TFilter, TSortField>) {
    const search = store((s) => s.query.search);
    const setSearch = store((s) => s.setSearch);

    const [value, setValue] = useState(search);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // ✔️ handle change duy nhất
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setValue(newValue);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setSearch(newValue);
        }, debounceMs);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                value={value}
                placeholder={placeholder ?? "Search..."}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (timerRef.current) {
                            clearTimeout(timerRef.current);
                        }
                        setSearch(value);
                    }
                }}
                className="h-10 w-[220px] px-3 rounded-lg border"
            />

            {showButton && (
                <button
                    onClick={() => setSearch(value)}
                    className="h-10 px-4 rounded-lg bg-primary text-white"
                >
                    Search
                </button>
            )}
        </div>
    );
}