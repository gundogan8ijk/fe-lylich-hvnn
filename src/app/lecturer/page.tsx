import { hasRequiredRolesAsync } from "@/lib/auth-helper";
import { Role } from "@/types/base-type/auth-type";
import { redirect } from "next/navigation"
import NotFound from "../not-found";

export default function LecturerRoot() {
    if (!hasRequiredRolesAsync([Role.LECTURER])) return <NotFound></NotFound>
    redirect("/lecturer/classes")
}