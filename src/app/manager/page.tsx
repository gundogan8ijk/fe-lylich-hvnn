import { hasRequiredRolesAsync } from "@/lib/auth-helper";
import NotFound from "../not-found";
import { redirect } from "next/navigation"
import { Role } from "@/_types/base-type/auth-type";

export default function ManagerHome() {
    if (!hasRequiredRolesAsync([Role.MANAGER])) return <NotFound></NotFound>
    redirect('/manager/research-projects')
}