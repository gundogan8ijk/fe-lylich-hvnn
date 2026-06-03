import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/_components/ui/alert-dialog'

interface Props {
    open: boolean
    deleting?: boolean
    description?: string
    onConfirm: () => void
    onCancel: () => void
}

export default function DeleteConfirmDialog({ open, deleting, description, onConfirm, onCancel }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={(open) => !open && onCancel()}>
            <AlertDialogContent className="rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description ?? 'Hành động này sẽ xóa vĩnh viễn và không thể hoàn tác.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting} className="rounded-lg">
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={deleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg"
                    >
                        {deleting ? 'Đang xóa...' : 'Xóa dữ liệu'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}