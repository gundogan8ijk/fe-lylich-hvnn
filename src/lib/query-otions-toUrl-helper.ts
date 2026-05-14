import { QueryOptions, SortDirection } from "@/types/filters-typeConfig";

export function toSearchParams(options: QueryOptions): URLSearchParams {
    const params = new URLSearchParams();

    if (options.search) {
        params.set('search', options.search);
    }

    if (options.searchFields?.length) {
        params.set('searchFields', options.searchFields.join(','));
    }

    if (options.filters) {
        params.set('filters', JSON.stringify(options.filters));
    }

    if (options.sort) {
        const sorts = Array.isArray(options.sort) ? options.sort : [options.sort];
        params.set(
            'sort',
            sorts.map(s => `${s.field}:${s.direction}`).join(','),
        );
    }

    if (options.pagination) {
        params.set('page', String(options.pagination.page));
        params.set('pageSize', String(options.pagination.pageSize));
    }

    return params;
}


export function fromSearchParams<
    TFilter extends object = Record<string, unknown>,
    TField extends string = string,
>(params: URLSearchParams): QueryOptions<TFilter, TField> {
    const options: QueryOptions<TFilter, TField> = {};

    const search = params.get('search');
    if (search) options.search = search;

    const searchFields = params.get('searchFields');
    if (searchFields) {
        options.searchFields = searchFields.split(',') as TField[];
    }

    const filters = params.get('filters');
    if (filters) {
        try {
            options.filters = JSON.parse(filters) as TFilter;
        } catch {
            // bỏ qua nếu parse lỗi
        }
    }

    const sort = params.get('sort');
    if (sort) {
        const sorts = sort.split(',').map(s => {
            const [field, direction] = s.split(':');
            return {
                field: field as TField,
                direction: (direction ?? 'asc') as SortDirection,
            };
        });
        options.sort = sorts.length === 1 ? sorts[0] : sorts;
    }

    const page = params.get('page');
    const pageSize = params.get('pageSize');
    if (page && pageSize) {
        options.pagination = {
            page: Number(page),
            pageSize: Number(pageSize),
        };
    }

    return options;
}