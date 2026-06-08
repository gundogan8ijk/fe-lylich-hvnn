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
import { registerLecturerAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import notify from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { Role } from "@/Authen/auth-type";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lecturer: LecturerItemAccountRecord;
}

export default function CreateAccountDialog({ isOpen, onClose, lecturer }: Props) {
    const { refresh } = useLecturerAdminStore();
    const [email, setEmail] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleRole = (role: string) => {
        setSelectedRoles(prev =>
            prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
        );
    };

    const handleSubmit = async () => {
        if (!email) {
            notify.error("Vui lòng nhập email");
            return;
        }
        if (selectedRoles.length === 0) {
            notify.error("Vui lòng chọn ít nhất 1 role");
            return;
        }

        setLoading(true);
        const res = await registerLecturerAccountApi({
            lecturerId: lecturer.lecturerId,
            email,
            roles: selectedRoles,
        });

        if (res.code === 1) {
            notify.success("Tạo tài khoản và phân quyền thành công");
            refresh();
            onClose();
            setEmail("");
            setSelectedRoles([]);
        } else {
            notify.error(getAllErrorMessage(res.message, res.errors));
        }
        setLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo tài khoản & Phân quyền</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Giảng viên</label>
                        <div className="p-2 border rounded-md bg-muted/50 text-sm">
                            {lecturer.fullName} ({lecturer.lecturerCode})
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Vai trò (Roles) <span className="text-red-500">*</span></label>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={selectedRoles.includes(Role.ADMIN)}
                                    onChange={() => toggleRole(Role.ADMIN)}
                                />
                                Quản trị viên (Admin)
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={selectedRoles.includes(Role.MANAGER)}
                                    onChange={() => toggleRole(Role.MANAGER)}
                                />
                                Quản lý (Manager)
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={selectedRoles.includes(Role.LECTURER)}
                                    onChange={() => toggleRole(Role.LECTURER)}
                                />
                                Giảng viên (Lecturer)
                            </label>
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
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-sm font-medium flex items-center justify-center min-w-[100px]"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div> : "Tạo tài khoản"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
