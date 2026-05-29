"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { storeProjectManger } from "@/stores/store-list/projects-manger-store";
import { SearchBoxState } from "@/components/query/search-Box-state";
import { SortButtonDynamic } from "@/components/query/sort-Button-dynamic";
import {
    ProjectMangerSortOptions,
    ProjectStatus_OPTIONS,
    level_PROJECT_OPTIONS,
} from "@/constants/project-contant";
import FilterPanel, { ActiveFilterTags, FilterFieldConfig } from "@/components/query/filter-panel-state";
import { ProjectManagerFilters } from "@/constants/project-contant";
import { createProjectAction, getMangerProjectListAction } from "@/_hooks/research-projects-hook";
import { ConfirmedStatus, STATUS_LABELS } from "@/constants/base-constant";
import { Button } from "@/components/ui/button";
import CreateProjectDialog from "./create-project-dialog";
import { gradientBg } from "@/components/utils/background";

export default function ProjectMangerHeader() {
    const page = storeProjectManger((s) => s.query.page);
    const sort = storeProjectManger((s) => s.query.sort);
    const filters = storeProjectManger((s) => s.query.filters);
    const search = storeProjectManger((s) => s.query.search);
    //const isSearch = storeProjectManger((s) => s.isSearch);

    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => { getMangerProjectListAction(); }, [page, sort, filters, search]);

    return (
        <div className="mb-12 space-y-8">
            {/* Title */}
            <div className="relative flex justify-between flex flex-col md:flex-row">
                <h1 className={`text-3xl pb-1 md:text-5xl font-extrabold tracking-tight ${gradientBg} bg-clip-text text-transparent text-transparent`}>
                    Danh sách đề tài
                </h1>
                <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">tạo đề tài</Button>
            </div>

            {/* Query bar */}
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col gap-4">
                {/* Row 1: search + sort + filter trigger */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                    <SearchBoxState store={storeProjectManger} />

                    <div className="hidden lg:block w-px h-8 bg-border" />

                    {/* Sort */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Sắp xếp:
                        </span>
                        <div className="flex gap-2">
                            {ProjectMangerSortOptions.map((item) => (
                                <SortButtonDynamic
                                    key={item.value}
                                    field={item.value}
                                    label={item.label}
                                    store={storeProjectManger}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-8 bg-border" />

                    {/* Filter trigger */}
                    <FilterPanel
                        store={storeProjectManger}
                        fields={PROJECT_FILTER_FIELDS}
                    />
                </div>

                {/* Row 2: active filter tags */}
                <ActiveFilterTags
                    store={storeProjectManger}
                    fields={PROJECT_FILTER_FIELDS}
                />
            </div>
            <CreateProjectDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={createProjectAction} />
        </div>
    );
}

export const PROJECT_FILTER_FIELDS: FilterFieldConfig<ProjectManagerFilters>[] = [
    {
        field: "Confirmed",
        label: "Trạng thái duyệt",
        type: "radio",
        operator: "eq",
        // Tự động map từ STATUS_LABELS để lấy chuẩn các cặp { label, value }
        options: Object.entries(STATUS_LABELS).map(([value, label]) => ({
            label,
            value: value as ConfirmedStatus,
        })),
    },
    {
        field: "Status",
        label: "Trạng thái",
        type: "radio",
        operator: "eq",
        // Tự động map từ ProjectStatus_OPTIONS
        options: ProjectStatus_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
        })),
    },
    {
        field: "Level",
        label: "Cấp đề tài",
        type: "radio",
        operator: "eq",
        // Tự động map từ level_PROJECT_OPTIONS
        options: level_PROJECT_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
        })),
    },
];