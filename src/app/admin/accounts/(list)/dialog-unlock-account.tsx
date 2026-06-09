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
import { unlockAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { Button } from "@/_components/ui/button";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    account: AccountItemDto;
}

export default function DialogUnlockAccount({ isOpen, onClose, account }: Props) {
    const { triggerRefresh } = useAccountAdminStore();
    const [loading, setLoading] = useState(false);

    const handleUnlock = async () => {
        if (!account.accountId) return;
        setLoading(true);
        const res = await unlockAccountApi({ accountId: account.accountId });
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
                        Bạn có chắc chắn muốn mở khóa tài khoản <span className="font-semibold text-foreground">{account.email}</span> không?
                    </p>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Hủy
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleUnlock} disabled={loading}>
                        {loading ? "Đang xử lý..." : "Mở khóa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
