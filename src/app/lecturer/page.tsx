import { hasRequiredRolesAsync } from "@/lib/auth-helper";
import { Role } from "@/_types/base-type/auth-type";
import { redirect } from "next/navigation"
import NotFound from "../not-found";

export default function LecturerHome() {
    if (!hasRequiredRolesAsync([Role.LECTURER])) return <NotFound></NotFound>
    redirect("/lecturer/classes")
}