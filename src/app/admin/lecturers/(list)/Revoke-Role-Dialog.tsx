import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { LecturerItemAccountRecord } from "@/working-admin/lecturer/lecturer-admin-type";
import { revokeRoleAccountApi } from "@/working-admin/lecturer/lecturer-admin-service";
import { notify } from "@/_components/utils/Notify";
import { useLecturerAdminStore } from "@/working-admin/lecturer/lecturer-admin-store";
import { AlertCircle, Loader2 } from "lucide-react";
import { getAllErrorMessage } from "@/_lib/response-helper";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lecturer: LecturerItemAccountRecord;
    roleToRevoke: string;
}

export default function RevokeRoleDialog({ isOpen, onClose, lecturer, roleToRevoke }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const triggerRefresh = useLecturerAdminStore((state) => state.triggerRefresh);

    const handleRevokeRole = async () => {
        if (!lecturer.accountId) return;

        setIsSubmitting(true);
        try {
            const res = await revokeRoleAccountApi({
                accountId: lecturer.accountId,
                roleName: roleToRevoke,
            });

            if (res.code === 1) {
                notify.success(`Đã xóa quyền ${roleToRevoke} thành công`);
                triggerRefresh();
                onClose();
            } else {
                notify.error(getAllErrorMessage(res.message, res.errors));
            }
        } catch (error) {
            notify.error("Có lỗi xảy ra khi xóa quyền");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isSubmitting && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="w-5 h-5" />
                        Xác nhận xóa quyền
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                        Bạn có chắc chắn muốn xóa quyền <strong className="text-foreground">{roleToRevoke}</strong> của tài khoản này không?
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-muted p-3 rounded-md text-sm my-2">
                    <span className="font-medium text-foreground">Tài khoản: </span> 
                    {lecturer.fullName} ({lecturer.lecturerCode})
                </div>

                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Hủy
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleRevokeRole} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            "Xóa quyền"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
