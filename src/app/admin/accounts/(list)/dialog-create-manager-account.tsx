'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { notify } from "@/_components/utils/Notify";
import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { registerManagerAccountApi } from "@/working-admin/account/account-admin-service";

interface DialogCreateManagerAccountProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DialogCreateManagerAccount({ isOpen, onClose }: DialogCreateManagerAccountProps) {
    const { triggerRefresh } = useAccountAdminStore();
    
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle close and reset state
    const handleClose = () => {
        setEmail("");
        onClose();
    };

    const handleSubmit = async () => {
        if (!email) {
            notify.error("Vui lòng nhập email");
            return;
        }

        setIsSubmitting(true);
        const res = await registerManagerAccountApi({ email });
        
        if (res.code === 1) {
            notify.success("Tạo tài khoản quản lý thành công!");
            triggerRefresh(); // Refresh the list
            handleClose();
        } else {
            notify.error("Lỗi: " + res.message);
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Tạo tài khoản Quản lý</DialogTitle>
                    <DialogDescription>
                        Cấp tài khoản mới cho nhân viên Quản lý (Manager).
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Email đăng nhập <span className="text-destructive">*</span></Label>
                        <Input 
                            type="email"
                            placeholder="manager@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>Hủy</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
