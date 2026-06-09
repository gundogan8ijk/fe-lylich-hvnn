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
import { lockAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { notify } from "@/_components/utils/Notify";
import { getAllErrorMessage } from "@/_lib/response-helper";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lecturer: LecturerItemAccountRecord;
}

export default function LockAccountDialog({ isOpen, onClose, lecturer }: Props) {
    const { triggerRefresh } = useLecturerAdminStore();
    const [loading, setLoading] = useState(false);
    
    // RevokedState: None = 1, Temporary = 2, Permanent = 3
    const [type, setType] = useState<number>(2); 
    const [reason, setReason] = useState("");
    const [timeBanned, setTimeBanned] = useState("");

    const handleLock = async () => {
        if (!lecturer.accountId) return;
        if (type === 2 && !timeBanned) {
            notify.error("Vui lòng chọn thời gian mở khóa nếu khóa tạm thời");
            return;
        }

        setLoading(true);
        const res = await lockAccountApi({
            accountId: lecturer.accountId,
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
                    <DialogTitle>Khóa tài khoản giảng viên</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Giảng viên</label>
                        <div className="p-2 border rounded-md bg-muted/50 text-sm">
                            {lecturer.fullName} ({lecturer.lecturerCode})
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
                        onClick={handleLock}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition"
                    >
                        {loading ? "Đang xử lý..." : "Khóa tài khoản"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
