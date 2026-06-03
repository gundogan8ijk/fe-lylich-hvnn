import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/_components/ui/alert-dialog'

interface Props {
    open: boolean
    submitting?: boolean
    title?: string
    description?: string
    onConfirm: () => void
    onCancel: () => void
}

export default function SubmitConfirmDialog({ 
    open, 
    submitting, 
    title, 
    description, 
    onConfirm, 
    onCancel 
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={(open) => !open && onCancel()}>
            <AlertDialogContent className="rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title ?? 'Xác nhận nộp phê duyệt?'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description ?? 'Hành động này sẽ gửi thông tin lên hệ thống để kiểm duyệt và không thể chỉnh sửa trong lúc chờ duyệt.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={submitting} className="rounded-lg">
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={submitting}
                        className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
                    >
                        {submitting ? 'Đang nộp...' : 'Xác nhận nộp'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}