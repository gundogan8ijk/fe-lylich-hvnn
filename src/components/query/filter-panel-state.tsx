"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { UseBoundStore, StoreApi } from "zustand";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import {
    FieldFilters,
    FilterCondition,
    FilterOperator,
    ListQuery,
} from "@/_types/base-type/query-types";

// ─── 1. STORE CONTRACT ────────────────────────────────────────────────────────

export interface FilterableStore<TFilter extends FieldFilters> {
    query: Pick<ListQuery<TFilter, string>, "filters">;
    setFieldFilter: <K extends keyof TFilter>(
        field: K,
        condition?: TFilter[K]
    ) => void;
    resetFilters: () => void;
}

export type FilterableStoreHook<TFilter extends FieldFilters> = UseBoundStore<
    StoreApi<FilterableStore<TFilter>>
>;

// ─── 2. TYPES ─────────────────────────────────────────────────────────────────

export type UIInputType =
    | "radio"         // 1 trong N — operator: eq
    | "checkbox"      // nhiều trong N — operator: in
    | "select"        // dropdown đơn, options nhiều — operator: eq
    | "multi-select"  // dropdown nhiều — operator: in
    | "boolean"       // toggle true/false — operator: eq
    | "text"          // chuỗi — operator: contains / eq / startsWith
    | "number"        // số đơn — operator: eq / gt / lt...
    | "number-range"  // khoảng số/tiền — operator: between
    | "date-range";   // khoảng ngày — operator: between

/**
 * booleanLabels chỉ dùng cho type "boolean".
 * Nếu không truyền thì fallback "Có" / "Không".
 */
export type FilterFieldConfig<TFilter extends FieldFilters> = {
    [K in keyof TFilter & string]: {
        field: K;
        label: string;
        type: UIInputType;
        operator: FilterOperator;
        options?: readonly { label: string; value: string }[];
        booleanLabels?: { true: string; false: string };
        numberRangeProps?: { min?: number; max?: number; step?: number; prefix?: string };
    };
}[keyof TFilter & string];

// ─── 3. HELPERS ───────────────────────────────────────────────────────────────

function isLeafCondition(
    c: FilterCondition
): c is Exclude<FilterCondition, { logic: "and" | "or" }> {
    return !("logic" in c);
}

export function conditionToValues(condition: FilterCondition | undefined): string[] {
    if (!condition) return [];
    if (!isLeafCondition(condition)) return [];

    if (condition.operator === "isNull" || condition.operator === "isNotNull")
        return ["true"];
    if ("from" in condition && "to" in condition)
        return [String(condition.from), String(condition.to)];
    if ("value" in condition) {
        const v = condition.value;
        // Handle boolean thật từ backend (không phải string)
        if (typeof v === "boolean") return [String(v)];
        return Array.isArray(v) ? v.map(String) : [String(v)];
    }
    return [];
}

export function valuesToCondition(
    values: string[],
    operator: FilterOperator
): FilterCondition | undefined {
    const valid = values.filter((v) => v !== undefined && v !== "");
    if (valid.length === 0) return undefined;

    switch (operator) {
        case "between":
            return valid.length >= 2
                ? { operator, from: valid[0], to: valid[1] }
                : undefined;
        case "in":
        case "nin":
            return { operator, value: valid };
        case "isNull":
        case "isNotNull":
            return { operator };
        default:
            return { operator, value: valid[0] } as FilterCondition;
    }
}

function arraysEqual(a: string[], b: string[]) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
}

// ─── 4. HOOK: useFilterPanel ──────────────────────────────────────────────────

function useFilterPanel<TFilter extends FieldFilters>(
    store: FilterableStoreHook<TFilter>,
    fields: FilterFieldConfig<TFilter>[]
) {
    const storeFilters = store((s) => s.query.filters);
    const setFieldFilter = store((s) => s.setFieldFilter);

    const [localFilters, setLocalFilters] = useState<Map<string, string[]>>(new Map());
    const [open, setOpen] = useState(false);

    const syncLocalFromStore = useCallback(() => {
        const snapshot = new Map<string, string[]>();
        for (const config of fields) {
            snapshot.set(config.field, conditionToValues(storeFilters?.[config.field]));
        }
        setLocalFilters(snapshot);
    }, [fields, storeFilters]);

    const localFiltersRef = useRef(localFilters);
    useEffect(() => {
        localFiltersRef.current = localFilters;
    });

    const commit = useCallback(() => {
        const latest = localFiltersRef.current;
        for (const config of fields) {
            const localValues = latest.get(config.field) ?? [];
            const storeValues = conditionToValues(storeFilters?.[config.field]);
            if (!arraysEqual(localValues, storeValues)) {
                setFieldFilter(
                    config.field,
                    valuesToCondition(localValues, config.operator) as TFilter[typeof config.field]
                );
            }
        }
    }, [fields, storeFilters, setFieldFilter]);

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (nextOpen) syncLocalFromStore();
            else commit();
            setOpen(nextOpen);
        },
        [syncLocalFromStore, commit]
    );

    const toggleValue = useCallback((field: string, value: string, type: UIInputType) => {
        setLocalFilters((prev) => {
            const next = new Map(prev);
            const current = next.get(field) ?? [];
            // radio, select, boolean — chỉ 1 giá trị
            if (type === "radio" || type === "select" || type === "boolean") {
                next.set(field, current.includes(value) ? [] : [value]);
            } else {
                // checkbox, multi-select — nhiều giá trị
                next.set(
                    field,
                    current.includes(value)
                        ? current.filter((v) => v !== value)
                        : [...current, value]
                );
            }
            return next;
        });
    }, []);

    const setFieldValue = useCallback((field: string, values: string[]) => {
        setLocalFilters((prev) => {
            const next = new Map(prev);
            next.set(field, values);
            return next;
        });
    }, []);

    const handleReset = useCallback(() => {
        setLocalFilters(new Map(fields.map((f) => [f.field, []])));
    }, [fields]);

    const activeCount = fields.filter(
        (f) => conditionToValues(storeFilters?.[f.field]).length > 0
    ).length;

    const localActiveCount = [...localFilters.values()].filter((v) => v.length > 0).length;

    return {
        open,
        localFilters,
        activeCount,
        localActiveCount,
        handleOpenChange,
        toggleValue,
        setFieldValue,
        handleReset,
    };
}

// ─── 5. ACTIVE FILTER TAGS ────────────────────────────────────────────────────

type ActiveFilterTagsProps<TFilter extends FieldFilters> = {
    store: FilterableStoreHook<TFilter>;
    fields: FilterFieldConfig<TFilter>[];
    className?: string;
};

export function ActiveFilterTags<TFilter extends FieldFilters>({
    store,
    fields,
    className,
}: ActiveFilterTagsProps<TFilter>) {
    const filters = store((s) => s.query.filters);
    const setFieldFilter = store((s) => s.setFieldFilter);

    const tags = fields.flatMap((config) => {
        const condition = filters?.[config.field];
        const values = conditionToValues(condition);
        if (values.length === 0) return [];

        // number-range & date-range: gộp thành 1 tag "a → b" thay vì 2 tag rời
        if (
            (config.type === "number-range" || config.type === "date-range") &&
            values.length === 2
        ) {
            const prefix = config.numberRangeProps?.prefix ?? "";
            return [{
                field: config.field,
                // Dùng mảng rỗng để handleRemove xoá toàn bộ khoảng
                value: "__range__",
                operator: config.operator,
                fieldLabel: config.label,
                optionLabel: `${prefix}${values[0]} → ${prefix}${values[1]}`,
            }];
        }

        return values.map((v) => {
            // boolean — dùng booleanLabels thay vì raw "true"/"false"
            let optionLabel: string;
            if (config.type === "boolean") {
                const labels = config.booleanLabels ?? { true: "Có", false: "Không" };
                optionLabel = v === "true" ? labels.true : labels.false;
            } else {
                optionLabel = config.options?.find((o) => o.value === v)?.label ?? v;
            }

            return {
                field: config.field,
                value: v,
                operator: config.operator,
                fieldLabel: config.label,
                optionLabel,
            };
        });
    });

    if (tags.length === 0) return null;

    const handleRemove = (
        field: keyof TFilter & string,
        value: string,
        operator: FilterOperator
    ) => {
        // "__range__" nghĩa là xoá toàn bộ khoảng
        if (value === "__range__") {
            setFieldFilter(field, undefined);
            return;
        }
        const current = conditionToValues(filters?.[field]);
        const next = current.filter((v) => v !== value);
        setFieldFilter(field, valuesToCondition(next, operator) as TFilter[typeof field]);
    };

    return (
        <div className={cn("flex flex-wrap gap-2 items-center", className)}>
            {tags.map((tag) => (
                <span
                    key={`${tag.field}-${tag.value}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                >
                    <span className="text-primary/60 font-medium">{tag.fieldLabel}:</span>
                    {tag.optionLabel}
                    <button
                        onClick={() => handleRemove(tag.field, tag.value, tag.operator)}
                        className="hover:opacity-70 transition-opacity ml-0.5"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </span>
            ))}
        </div>
    );
}

// ─── 6. FILTER PANEL ──────────────────────────────────────────────────────────

type FilterPanelProps<TFilter extends FieldFilters> = {
    store: FilterableStoreHook<TFilter>;
    fields: FilterFieldConfig<TFilter>[];
    triggerLabel?: string;
    className?: string;
};

export default function FilterPanel<TFilter extends FieldFilters>({
    store,
    fields,
    triggerLabel = "Bộ lọc",
    className,
}: FilterPanelProps<TFilter>) {
    const {
        open,
        localFilters,
        activeCount,
        localActiveCount,
        handleOpenChange,
        toggleValue,
        setFieldValue,
        handleReset,
    } = useFilterPanel(store, fields);

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "h-10 px-4 gap-2 rounded-xl border-muted-foreground/20 transition-all duration-300",
                        activeCount > 0 &&
                            "border-primary text-primary hover:text-primary hover:border-primary/80",
                        className
                    )}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {triggerLabel}
                    {activeCount > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-medium">
                            {activeCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            {/* SỬA TẠI ĐÂY: Thêm flex flex-col và giới hạn chiều cao tối đa nghiêm ngặt cho toàn bộ Popover */}
            <PopoverContent 
                className="w-64 p-0 flex flex-col max-h-[var(--radix-popover-content-available-height)] md:max-h-[50vh] overflow-hidden shadow-xl" 
                align="start"
            >
                {/* Header giữ nguyên chiều cao tự nhiên */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 flex-shrink-0">
                    <span className="text-sm font-medium text-muted-foreground">{triggerLabel}</span>
                    <button
                        onClick={handleReset}
                        disabled={localActiveCount === 0}
                        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 px-2 py-1 hover:bg-muted rounded transition-colors"
                    >
                        Đặt lại
                    </button>
                </div>

                {/* SỬA TẠI ĐÂY: Thay max-h-[60vh] thành flex-1 min-h-0 để trình duyệt tính toán vùng cuộn chính xác */}
                <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-border/40">
                    {fields.map((config) => {
                        const selected = localFilters.get(config.field) ?? [];
                        return (
                            <FilterFieldSection
                                key={config.field}
                                config={config}
                                selected={selected}
                                onToggle={toggleValue}
                                onSetValues={setFieldValue}
                            />
                        );
                    })}
                </div>

                {/* Footer giữ nguyên chiều cao tự nhiên, cố định ở đáy */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/60 bg-muted/30 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                        {localActiveCount > 0
                            ? `${localActiveCount} bộ lọc đang chọn`
                            : "Chưa có bộ lọc"}
                    </span>
                    <button
                        onClick={() => handleOpenChange(false)}
                        className="text-xs font-medium text-foreground px-3 py-1.5 rounded-lg border border-border/60 bg-background hover:bg-muted transition-colors"
                    >
                        Xong
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

// ─── 7. FILTER FIELD SECTION ──────────────────────────────────────────────────

type FilterFieldSectionProps<TFilter extends FieldFilters> = {
    config: FilterFieldConfig<TFilter>;
    selected: string[];
    onToggle: (field: string, value: string, type: UIInputType) => void;
    onSetValues: (field: string, values: string[]) => void;
};

function FilterFieldSection<TFilter extends FieldFilters>({
    config,
    selected,
    onToggle,
    onSetValues,
}: FilterFieldSectionProps<TFilter>) {
    return (
        <div className="px-4 py-3">
            <p className="text-[11px] font-medium text-muted-foreground uppercase mb-2">
                {config.label}
            </p>

            {/* ── radio / checkbox ── */}
            {(config.type === "radio" || config.type === "checkbox") && config.options && (
                <div className="flex flex-col gap-0.5">
                    {config.options.map((opt) => {
                        const isSelected = selected.includes(opt.value);
                        return (
                            <button
                                key={opt.value}
                                onClick={() => onToggle(config.field, opt.value, config.type)}
                                className={cn(
                                    "flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-left w-full transition-colors",
                                    isSelected ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                                )}
                            >
                                {config.type === "radio" ? (
                                    <span className={cn(
                                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                                        isSelected ? "border-[4px] border-primary" : "border-muted-foreground/40"
                                    )} />
                                ) : (
                                    <span className={cn(
                                        "w-3.5 h-3.5 rounded flex items-center justify-center border flex-shrink-0",
                                        isSelected ? "bg-primary border-primary" : "border-muted-foreground/40"
                                    )}>
                                        {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                                    </span>
                                )}
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ── select (native) ── */}
            {config.type === "select" && config.options && (
                <div className="relative">
                    <select
                        value={selected[0] ?? ""}
                        onChange={(e) => {
                            const v = e.target.value;
                            onSetValues(config.field, v ? [v] : []);
                        }}
                        className="w-full appearance-none px-2.5 py-1.5 pr-8 text-sm border border-border/60 rounded-lg bg-background"
                    >
                        <option value="">-- Chọn --</option>
                        {config.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                </div>
            )}

            {/* ── multi-select: checkbox list giống checkbox nhưng dùng "in" ── */}
            {config.type === "multi-select" && config.options && (
                <div className="flex flex-col gap-0.5">
                    {config.options.map((opt) => {
                        const isSelected = selected.includes(opt.value);
                        return (
                            <button
                                key={opt.value}
                                onClick={() => onToggle(config.field, opt.value, config.type)}
                                className={cn(
                                    "flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-left w-full transition-colors",
                                    isSelected ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                                )}
                            >
                                <span className={cn(
                                    "w-3.5 h-3.5 rounded flex items-center justify-center border flex-shrink-0",
                                    isSelected ? "bg-primary border-primary" : "border-muted-foreground/40"
                                )}>
                                    {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                                </span>
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ── boolean toggle ── */}
            {config.type === "boolean" && (() => {
                const labels = config.booleanLabels ?? { true: "Có", false: "Không" };
                return (
                    <div className="flex gap-2">
                        {(["true", "false"] as const).map((v) => {
                            const isSelected = selected[0] === v;
                            return (
                                <button
                                    key={v}
                                    onClick={() => onToggle(config.field, v, config.type)}
                                    className={cn(
                                        "flex-1 py-1.5 rounded-lg text-sm border transition-colors",
                                        isSelected
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "text-foreground border-border/60 hover:bg-muted"
                                    )}
                                >
                                    {v === "true" ? labels.true : labels.false}
                                </button>
                            );
                        })}
                    </div>
                );
            })()}

            {/* ── text / number đơn ── */}
            {(config.type === "text" || config.type === "number") && (
                <input
                    type={config.type}
                    value={selected[0] || ""}
                    onChange={(e) =>
                        onSetValues(config.field, e.target.value ? [e.target.value] : [])
                    }
                    placeholder={`Nhập ${config.label.toLowerCase()}...`}
                    className="w-full px-2.5 py-1.5 text-sm border border-border/60 rounded-lg bg-background"
                />
            )}

            {/* ── number-range (khoảng số / tiền) ── */}
            {config.type === "number-range" && (
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={selected[0] || ""}
                        min={config.numberRangeProps?.min}
                        max={config.numberRangeProps?.max}
                        step={config.numberRangeProps?.step}
                        placeholder="Từ"
                        onChange={(e) =>
                            onSetValues(config.field, [e.target.value, selected[1] || ""])
                        }
                        className="w-1/2 px-2 py-1.5 text-xs border border-border/60 rounded-lg bg-background"
                    />
                    <span className="text-muted-foreground text-xs">→</span>
                    <input
                        type="number"
                        value={selected[1] || ""}
                        min={config.numberRangeProps?.min}
                        max={config.numberRangeProps?.max}
                        step={config.numberRangeProps?.step}
                        placeholder="Đến"
                        onChange={(e) =>
                            onSetValues(config.field, [selected[0] || "", e.target.value])
                        }
                        className="w-1/2 px-2 py-1.5 text-xs border border-border/60 rounded-lg bg-background"
                    />
                </div>
            )}

            {/* ── date-range ── */}
            {config.type === "date-range" && (
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={selected[0] || ""}
                        onChange={(e) =>
                            onSetValues(config.field, [e.target.value, selected[1] || ""])
                        }
                        className="w-1/2 px-2 py-1.5 text-xs border border-border/60 rounded-lg bg-background"
                    />
                    <span className="text-muted-foreground text-xs">→</span>
                    <input
                        type="date"
                        value={selected[1] || ""}
                        onChange={(e) =>
                            onSetValues(config.field, [selected[0] || "", e.target.value])
                        }
                        className="w-1/2 px-2 py-1.5 text-xs border border-border/60 rounded-lg bg-background"
                    />
                </div>
            )}
        </div>
    );
}