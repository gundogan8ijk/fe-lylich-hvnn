"use client";

import { useFetchLecturerAdminList } from "@/working-admin/lecturer/lecturer-admin-hook";

export default function SetupDataLecturerList() {
    useFetchLecturerAdminList();
    return null;
}
