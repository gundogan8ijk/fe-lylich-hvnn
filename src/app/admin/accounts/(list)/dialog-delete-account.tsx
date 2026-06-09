"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/_components/ui/dialog";
import { AccountItemDto } from "@/working-admin/account/account-admin-type";
import { deleteAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { Button } from "@/_components/ui/button";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    account: AccountItemDto;
}

export default function DialogDeleteAccount({ isOpen, onClose, account }: Props) {
    const { triggerRefresh } = useAccountAdminStore();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!account.accountId) return;
        setLoading(true);
        const res = await deleteAccountApi(account.accountId);
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
                        Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản <span className="font-semibold text-foreground">{account.email}</span> không?
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Lưu ý: Dữ liệu hồ sơ vẫn được giữ lại nhưng tài khoản đăng nhập sẽ bị xóa và không thể khôi phục.
                    </p>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Hủy
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? "Đang xử lý..." : "Xóa tài khoản"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
