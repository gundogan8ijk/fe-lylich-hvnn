'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Textarea } from '@/_components/ui/textarea'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { Loader2, Edit3 } from 'lucide-react'
import { updateProjectAction } from '@/Project-Lecturer-Detail/Project-Detail-hook'
import { ProjectDetail } from '@/Project-Lecturer-Detail/Project-Detail-type'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    project: ProjectDetail
}

export default function UpdateProjectDialog({ open, onOpenChange, project }: Props) {
    const [title, setTitle] = useState('')
    const [describe, setDescribe] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (open && project) {
            setTitle(project.title)
            setDescribe(project.describe || '')
        }
    }, [open, project])

    const handleSave = async () => {
        if (!title.trim()) return
        setSaving(true)
        try {
            let success = true

            // Sửa basic nếu khác biệt
            if (title !== project.title || describe !== (project.describe || '')) {
                const ok = await updateProjectAction(project.id, { Title: title, Describe: describe })
                if (!ok) success = false
            }

            if (success) {
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
                        <Edit3 className="w-5 h-5 text-emerald-600" />
                        Chỉnh sửa thông tin đề tài
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Cập nhật các thông tin cơ bản và tài liệu đính kèm cho đề tài của bạn.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div className="space-y-1">
                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tên đề tài <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tên đề tài nghiên cứu..."
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="describe" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Mô tả chi tiết
                        </Label>
                        <Textarea
                            id="describe"
                            value={describe}
                            onChange={(e) => setDescribe(e.target.value)}
                            placeholder="Mô tả nội dung nghiên cứu, mục tiêu, kết quả mong đợi..."
                            rows={4}
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
                        disabled={saving || !title.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

