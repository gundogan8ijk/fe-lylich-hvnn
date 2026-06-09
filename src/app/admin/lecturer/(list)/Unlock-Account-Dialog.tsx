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
import { unlockAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lecturer: LecturerItemAccountRecord;
}

export default function UnlockAccountDialog({ isOpen, onClose, lecturer }: Props) {
    const { triggerRefresh } = useLecturerAdminStore();
    const [loading, setLoading] = useState(false);

    const handleUnlock = async () => {
        if (!lecturer.accountId) return;
        setLoading(true);
        const res = await unlockAccountApi({ accountId: lecturer.accountId });
        if (res.code === 1) {
            notify.success("Mở khóa tài khoản thành công!");
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
                    <DialogTitle className="text-green-600">Xác nhận mở khóa</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        Bạn có chắc chắn muốn mở khóa tài khoản cho giảng viên <span className="font-semibold text-foreground">{lecturer.fullName}</span> không?
                    </p>
                </div>

                <DialogFooter>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary/50 rounded-md hover:bg-secondary transition"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleUnlock}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                    >
                        {loading ? "Đang xử lý..." : "Mở khóa"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
