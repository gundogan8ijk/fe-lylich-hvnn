"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/_components/ui/dialog";
import { LecturerItemAccountRecord } from "@/working-admin/lecturer/lecturer-admin-type";
import { addRoleAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { Role } from "@/Authen/auth-type";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lecturer: LecturerItemAccountRecord;
}

export default function AddRoleDialog({ isOpen, onClose, lecturer }: Props) {
    const { triggerRefresh } = useLecturerAdminStore();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>("");

    const normalizedRoles = (lecturer.roles || []).map((r: unknown) => {
        const obj = r as { name?: string; Name?: string };
        return String(obj?.name || obj?.Name || r).toLowerCase();
    });

    const hasManagerRole = normalizedRoles.includes(Role.MANAGER.toLowerCase());
    const hasLecturerRole = normalizedRoles.includes(Role.LECTURER.toLowerCase());

    const handleSubmit = async () => {
        if (!lecturer.accountId || !selectedRole) return;
        setLoading(true);

        const res = await addRoleAccountApi({
            accountId: lecturer.accountId,
            roleName: selectedRole,
        });

        if (res.code === 1) {
            notify.success("Thêm quyền thành công");
            triggerRefresh();
            onClose();
        } else {
            notify.error(getAllErrorMessage(res.message, res.errors));
        }
        setLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thêm quyền</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Giảng viên</label>
                        <div className="p-2 border rounded-md bg-muted/50 text-sm">
                            {lecturer.fullName} ({lecturer.lecturerCode})
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Chọn quyền cần thêm</label>
                        <div className="flex flex-col gap-2">
                            {!hasManagerRole && (
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={Role.MANAGER}
                                        checked={selectedRole === Role.MANAGER}
                                        onChange={() => setSelectedRole(Role.MANAGER)}
                                    />
                                    Quản lý (Manager)
                                </label>
                            )}
                            {!hasLecturerRole && (
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={Role.LECTURER}
                                        checked={selectedRole === Role.LECTURER}
                                        onChange={() => setSelectedRole(Role.LECTURER)}
                                    />
                                    Giảng viên (Lecturer)
                                </label>
                            )}
                            {hasManagerRole && hasLecturerRole && (
                                <p className="text-sm text-muted-foreground italic">
                                    Giảng viên này đã có đủ tất cả các quyền.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 border rounded-md hover:bg-muted transition text-sm font-medium"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !selectedRole}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-sm font-medium flex items-center justify-center min-w-[100px] disabled:opacity-50"
                    >
                        {loading
                            ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            : "Thêm quyền"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}