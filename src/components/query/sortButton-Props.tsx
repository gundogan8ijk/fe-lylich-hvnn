import { QuerySlice } from "@/stores/base-list/query-module";
import { UseBoundStore, StoreApi } from "zustand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

type QueryStore<TFilter, TSortField extends string> =
    UseBoundStore<StoreApi<QuerySlice<TFilter, TSortField>>>;

type SortState<TSortField extends string> = {
    field: TSortField;
    direction: "asc" | "desc";
} | null;

type SortButtonProps<
    TFilter,
    TSortField extends string
> = {
    field: TSortField;
    label: string;
    store: QueryStore<TFilter, TSortField>;

    // 👇 nhận luôn state mới để dùng bên ngoài
    onClick?: (field: TSortField, sort?: SortState<TSortField>) => void;
};

export function SortButton<TFilter, TSortField extends string>({
    field,
    label,
    store,
    onClick,
}: SortButtonProps<TFilter, TSortField>) {
    const sort = store((s) => s.query.sort);
    const toggleSort = store((s) => s.toggleSort);

    const isActive = sort?.field === field;
    const direction = isActive ? sort.direction : undefined;

    const handleClick = () => {
        // 1. update store
        toggleSort(field);

        // 2. lấy state mới sau khi update
        const newSort = store.getState().query.sort;

        // 3. expose ra ngoài
        onClick?.(field, newSort);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            className={cn(
                "h-10 px-4 gap-2 rounded-xl border-muted-foreground/20 transition-all duration-300",
                isActive &&
                "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground shadow-md shadow-primary/20"
            )}
        >
            {label}

            <div className="flex flex-col -space-y-1">
                <ArrowUp
                    className={cn(
                        "w-3 h-3 transition-opacity",
                        direction === "asc" ? "opacity-100" : "opacity-30"
                    )}
                />
                <ArrowDown
                    className={cn(
                        "w-3 h-3 transition-opacity",
                        direction === "desc" ? "opacity-100" : "opacity-30"
                    )}
                />
            </div>
        </Button>
    );
}



// import { QuerySlice } from "@/stores/base-list/query-module";
// import { UseBoundStore, StoreApi } from "zustand";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ArrowUp, ArrowDown } from "lucide-react";

// type QueryStore<TFilter, TSortField extends string> =
//     UseBoundStore<StoreApi<QuerySlice<TFilter, TSortField>>>;

// type SortButtonProps<
//     TFilter,
//     TSortField extends string
// > = {
//     field: TSortField;
//     label: string;
//     store: QueryStore<TFilter, TSortField>;
// };

// export function SortButton<TFilter, TSortField extends string>({
//     field,
//     label,
//     store,
// }: SortButtonProps<TFilter, TSortField>) {
//     const sort = store((s) => s.query.sort);
//     const toggleSort = store((s) => s.toggleSort);

//     const isActive = sort?.field === field;
//     const direction = isActive ? sort.direction : undefined;

//     const onClick = () => toggleSort(field);

//     return (
//         <Button
//             variant="outline"
//             size="sm"
//             onClick={onClick}
//             className={cn(
//                 "h-10 px-4 gap-2 rounded-xl border-muted-foreground/20 transition-all duration-300",
//                 direction &&
//                     "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground shadow-md shadow-primary/20"
//             )}
//         >
//             {label}

//             <div className="flex flex-col -space-y-1">
//                 <ArrowUp
//                     className={cn(
//                         "w-3 h-3 transition-opacity",
//                         direction === "asc" ? "opacity-100" : "opacity-30"
//                     )}
//                 />
//                 <ArrowDown
//                     className={cn(
//                         "w-3 h-3 transition-opacity",
//                         direction === "desc" ? "opacity-100" : "opacity-30"
//                     )}
//                 />
//             </div>
//         </Button>
//     );
// }