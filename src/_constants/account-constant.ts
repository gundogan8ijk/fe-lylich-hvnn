import { SelectionOption } from "@/_Common/_types/query-types";

export const AccountSearchOptions = [
    { value: "all", label: "Tất cả" },
] as const satisfies readonly SelectionOption<"all">[];
