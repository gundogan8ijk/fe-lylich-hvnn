// utils/query-params.ts
import { defaultPagination } from "@/types/base-type/pagination-typeConfig";
import { ListQuery } from "@/types/base-type/query-types";

export function toSearchParams<TFilter, TField extends string>(
    q: ListQuery<TFilter, TField>, searchField?: string
): URLSearchParams {
    const params = new URLSearchParams();

    if (q.search) {
        params.set("search", q.search);

        if (searchField) {
            params.set("searchField", searchField);
        }
    }

    if (q.filters) {
        params.set("filters", JSON.stringify(q.filters));
    }

    if (q.sort) {
        params.set("sort", `${q.sort.field}:${q.sort.direction}`);
    }

    params.set("page", String(q.page));
    params.set("perPage", String(q.perPage));

    return params;
}

export function paramsToQuery<TFilter extends object, TField extends string>(
    params: URLSearchParams,
    defaults: Partial<Pick<ListQuery<TFilter, TField>, "page" | "perPage">> = {
        page: 1,
        perPage: 10,
    }
): ListQuery<TFilter, TField> {
    const query: ListQuery<TFilter, TField> = {
        search: "",
        filters: undefined,
        sort: null,
        page: defaults.page ?? defaultPagination.page,
        perPage: defaults.perPage ?? defaultPagination.perPage,
    };

    const search = params.get("search");
    if (search) query.search = search;

    const filters = params.get("filters");
    if (filters) {
        try {
            query.filters = JSON.parse(filters) as TFilter;
        } catch {
            query.filters = undefined;
        }
    }

    const sort = params.get("sort");
    if (sort) {
        const [field, direction] = sort.split(":");

        query.sort = {
            field: field as TField,
            direction: (direction === "desc" ? "desc" : "asc"),
        };
    }

    const page = Number(params.get("page"));
    const perPage = Number(params.get("perPage"));

    if (!Number.isNaN(page) && page > 0) query.page = page;
    if (!Number.isNaN(perPage) && perPage > 0) query.perPage = perPage;

    return query;
}