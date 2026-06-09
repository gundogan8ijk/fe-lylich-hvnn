import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/_components/ui/dialog";
import { AccountItemDto } from "@/working-admin/account/account-admin-type";
import { Lock } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    account: AccountItemDto;
}

export default function DialogLockInfo({ isOpen, onClose, account }: Props) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <Lock className="w-5 h-5" />
                        Thông tin khóa tài khoản
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <div className="font-medium">Tài khoản:</div>
                        <div className="text-sm bg-muted p-2 rounded-md">
                            {account.email} {account.fullName && `(${account.fullName})`}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="font-medium text-destructive">Trạng thái:</div>
                        <div className="text-sm bg-destructive/10 text-destructive p-2 rounded-md">
                            Tài khoản đang bị khóa
                        </div>
                    </div>

                    {account.lockoutEnd && (
                        <div className="space-y-2">
                            <div className="font-medium">Thời gian mở khóa dự kiến:</div>
                            <div className="text-sm bg-muted p-2 rounded-md">
                                {new Date(account.lockoutEnd).toLocaleString('vi-VN')}
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="font-medium">Lý do khóa:</div>
                        <div className="text-sm bg-muted p-2 rounded-md min-h-[60px] whitespace-pre-wrap">
                            {account.lockReason || "Không có lý do"}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
