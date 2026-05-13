'use client'
import { getDepartmentsListAction } from "@/hooks/department-hook";
import React from "react";

export default function DepartmentHeader() {
    React.useEffect(() => {
        getDepartmentsListAction();
    }, []);

    return (
        <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-2">Danh sách khoa đào tạo</h1>
        </div>
    )
}
