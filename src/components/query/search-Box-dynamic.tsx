import { QuerySlice } from "@/stores/base-list/query-module";
import { StoreApi, UseBoundStore } from "zustand";


type QueryStore<TFilter, TSortField extends string> =
    UseBoundStore<StoreApi<QuerySlice<TFilter, TSortField>>>;

type SearchBoxProps<TFilter, TSortField extends string> = {
    store: QueryStore<TFilter, TSortField>;
    placeholder?: string;
    showButton?: boolean;
};


export function SearchBoxDynamic<TFilter, TSortField extends string>({
    store,
    placeholder,
    showButton = true,
}: SearchBoxProps<TFilter, TSortField>) {
    const search = store((s) => s.query.search);
    const setSearch = store((s) => s.setSearch);

    return (
        <div className="flex items-center gap-2">
            <input
                value={search}
                placeholder={placeholder ?? "Search..."}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setSearch(e.currentTarget.value); 
                    }
                }}
                className="h-10 w-[220px] px-3 rounded-lg border"
            />

            {showButton && (
                <button
                    onClick={() => setSearch(search)}
                    className="h-10 px-4 rounded-lg bg-primary text-white"
                >
                    Search
                </button>
            )}
        </div>
    );
}