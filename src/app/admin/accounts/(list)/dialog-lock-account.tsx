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
import { lockAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";
import { Button } from "@/_components/ui/button";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    account: AccountItemDto;
}

export default function DialogLockAccount({ isOpen, onClose, account }: Props) {
    const { triggerRefresh } = useAccountAdminStore();
    const [loading, setLoading] = useState(false);
    
    // RevokedState: None = 1, Temporary = 2, Permanent = 3
    const [type, setType] = useState<number>(2); 
    const [reason, setReason] = useState("");
    const [timeBanned, setTimeBanned] = useState("");

    const handleLock = async () => {
        if (!account.accountId) return;
        if (type === 2 && !timeBanned) {
            notify.error("Vui lòng chọn thời gian mở khóa nếu khóa tạm thời");
            return;
        }

        setLoading(true);
        const res = await lockAccountApi({
            accountId: account.accountId,
            type: type,
            reason: reason || null,
            timeBanned: type === 2 && timeBanned ? new Date(timeBanned).toISOString() : null
        });

        if (res.code === 1) {
            notify.success("Khóa tài khoản thành công!");
            triggerRefresh();
            onClose();
            setReason("");
            setTimeBanned("");
            setType(2);
        } else {
            notify.error(getAllErrorMessage(res.message, res.errors));
        }
        setLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Khóa tài khoản</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tài khoản</label>
                        <div className="p-2 border rounded-md bg-muted/50 text-sm">
                            {account.email} {account.fullName && `(${account.fullName})`}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Loại khóa</label>
                        <select
                            value={type}
                            onChange={(e) => setType(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value={2}>Tạm thời (Có thời hạn)</option>
                            <option value={3}>Vĩnh viễn (Cấm luôn)</option>
                        </select>
                    </div>

                    {type === 2 && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thời gian mở khóa <span className="text-red-500">*</span></label>
                            <input
                                type="datetime-local"
                                value={timeBanned}
                                onChange={(e) => setTimeBanned(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Lý do khóa</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Nhập lý do..."
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Hủy
                    </Button>
                    <Button variant="destructive" onClick={handleLock} disabled={loading}>
                        {loading ? "Đang xử lý..." : "Khóa tài khoản"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
