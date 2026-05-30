import { hasRequiredRolesAsync } from "@/Authen/auth-helper";
import { Role } from "@/Authen/auth-type";
import { redirect } from "next/navigation"
import NotFound from "../not-found";

export default function LecturerHome() {
    if (!hasRequiredRolesAsync([Role.LECTURER])) return <NotFound></NotFound>
    redirect("/lecturer/classes")
}