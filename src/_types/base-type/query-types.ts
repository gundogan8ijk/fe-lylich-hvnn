export type SortDirection = "asc" | "desc";

export type SortOption<TField extends string = string> = {
    field: TField;
    direction: SortDirection;
};

export type FilterCondition =
    | { operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "startsWith" | "endsWith"; value: string | number | boolean }
    | { operator: "in" | "nin"; value: (string | number)[] }
    | { operator: "between"; from: string | number; to: string | number }
    | { operator: "isNull" | "isNotNull" }
    | { logic: "and" | "or"; conditions: FilterCondition[] };

export type FieldFilters<TField extends string = string> =
    Partial<Record<TField, FilterCondition>>;

export type ListQuery<TFilter, TSortField extends string> = {
    search: string;
    filters?: TFilter;
    sort: SortOption<TSortField> | null;
    page: number;
    perPage: number;
};

export type SelectionOption<T> = {
    label: string;
    value: T;
};

export type NoFilter = Record<string, never>;
export type NoSort = never;