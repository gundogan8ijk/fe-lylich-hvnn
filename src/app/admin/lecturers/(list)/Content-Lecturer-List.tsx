"use client";

import LecturerGrid from "./lecturer-grid";
import LecturerHeader from "./lecturer-header";
import LecturerPagination from "./lecturer-pagination";

export default function ContentLecturerList() {
    return (
        <>
            <LecturerHeader />
            <div className="flex-1 flex flex-col w-full">
                <LecturerGrid />
            </div>
            <LecturerPagination />
        </>
    );
}
