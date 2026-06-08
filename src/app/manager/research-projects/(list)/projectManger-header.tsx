"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { SearchBoxState } from "@/_components/query/search-Box-state";
import { SortButtonDynamic } from "@/_components/query/sort-Button-dynamic";
import {
    ProjectMangerSortOptions,
    ProjectStatus_OPTIONS,
    level_PROJECT_OPTIONS,
} from "@/_constants/project-constant";
import FilterPanel, { ActiveFilterTags, FilterFieldConfig } from "@/_components/query/filter-panel-state";
import { ProjectManagerFilters } from "@/_constants/project-constant";
import { ConfirmedStatus, STATUS_LABELS } from "@/_constants/base-constant";
import { Button } from "@/_components/ui/button";
import { storeProjectMangerList } from "@/working-manager/project-list/project-list-store";
import { createProjectListAction, getMangerProjectListAction } from "@/working-manager/project-detail/project-detail-hook";
import CreateProjectDialog from "./create-project-dialog";

export default function ProjectMangerHeader() {
    const page = storeProjectMangerList((s) => s.query.page);
    const sort = storeProjectMangerList((s) => s.query.sort);
    const filters = storeProjectMangerList((s) => s.query.filters);
    const search = storeProjectMangerList((s) => s.query.search);
    //const isSearch = storeProjectManger((s) => s.isSearch);

    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => { getMangerProjectListAction(); }, [page, sort, filters, search]);

    return (
        <div className="mb-12 space-y-8">
            {/* Title */}
            <div className="relative flex justify-between flex flex-col md:flex-row">
                <h1 className="text-3xl pb-1 md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Danh sách đề tài
                </h1>
                <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">tạo đề tài</Button>
            </div>

            {/* Query bar */}
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col gap-4">
                {/* Row 1: search + sort + filter trigger */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                    <SearchBoxState store={storeProjectMangerList} />

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
                                    store={storeProjectMangerList}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-8 bg-border" />

                    {/* Filter trigger */}
                    <FilterPanel
                        store={storeProjectMangerList}
                        fields={PROJECT_FILTER_FIELDS}
                    />
                </div>

                {/* Row 2: active filter tags */}
                <ActiveFilterTags
                    store={storeProjectMangerList}
                    fields={PROJECT_FILTER_FIELDS}
                />
            </div>
            <CreateProjectDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={createProjectListAction} />
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