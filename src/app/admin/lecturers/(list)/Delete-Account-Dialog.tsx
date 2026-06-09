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
import { deleteAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lecturer: LecturerItemAccountRecord;
}

export default function DeleteAccountDialog({ isOpen, onClose, lecturer }: Props) {
    const { triggerRefresh } = useLecturerAdminStore();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!lecturer.accountId) return;
        setLoading(true);
        const res = await deleteAccountApi(lecturer.accountId);
        if (res.code === 1) {
            notify.success("Xóa tài khoản thành công!");
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
                    <DialogTitle className="text-destructive">Cảnh báo xóa tài khoản</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản của giảng viên <span className="font-semibold text-foreground">{lecturer.fullName}</span> không?
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Lưu ý: Dữ liệu hồ sơ giảng viên vẫn được giữ lại nhưng tài khoản đăng nhập sẽ bị xóa và không thể khôi phục.
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
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-destructive rounded-md hover:bg-destructive/90 transition"
                    >
                        {loading ? "Đang xử lý..." : "Xóa tài khoản"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
