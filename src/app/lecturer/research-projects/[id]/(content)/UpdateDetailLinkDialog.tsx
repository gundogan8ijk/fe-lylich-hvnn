'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { Loader2, Link as LinkIcon } from 'lucide-react'
import { updateProjectDetailLinkAction } from '@/working-Lecturer/Project-Detail/Project-Detail-hook'
import { ProjectDetail } from '@/working-Lecturer/Project-Detail/Project-Detail-type'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    project: ProjectDetail
}

export default function UpdateDetailLinkDialog({ open, onOpenChange, project }: Props) {
    const [detailLink, setDetailLink] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (open && project) {
            setDetailLink(project.detailUrl || '')
        }
    }, [open, project])

    const handleSave = async () => {
        setSaving(true)
        try {
            if (detailLink !== (project.detailUrl || '')) {
                const ok = await updateProjectDetailLinkAction(project.id, { DetailLink: detailLink })
                if (ok) {
                    onOpenChange(false)
                }
            } else {
                onOpenChange(false)
            }
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                        <LinkIcon className="w-5 h-5 text-blue-600" />
                        Cập nhật tài liệu chi tiết
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Cập nhật đường dẫn đến tài liệu chi tiết của đề tài đã hoàn thành.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div className="space-y-1">
                        <Label htmlFor="detailLink" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Đường link tài liệu chi tiết (URL)
                        </Label>
                        <Input
                            id="detailLink"
                            value={detailLink}
                            onChange={(e) => setDetailLink(e.target.value)}
                            placeholder="https://example.com/tai-lieu-de-tai"
                            type="url"
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={saving}
                        className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700 dark:hover:bg-slate-700 cursor-pointer"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
