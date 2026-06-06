'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { Loader2, Users, Edit } from 'lucide-react'
import { addParticipantAction, updateParticipantAction } from '@/Project-Lecturer-Detail/Project-Detail-hook'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    projectId: string
    editTarget?: {
        id: string
        fullName: string
        email: string | null
        role: string
    } | null
}

const ROLE_OPTIONS = [
    { value: 'Support', label: 'Sinh viên hỗ trợ' },
    { value: 'Community', label: 'Cộng tác viên' }
]

export default function AddParticipantDialog({ open, onOpenChange, projectId, editTarget }: Props) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('Support')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (open) {
            if (editTarget) {
                setFullName(editTarget.fullName)
                setEmail(editTarget.email || '')
                setRole(editTarget.role)
            } else {
                setFullName('')
                setEmail('')
                setRole('Support')
            }
        }
    }, [open, editTarget])

    const handleSave = async () => {
        if (!fullName.trim() || !role) return
        setSaving(true)
        try {
            let ok = false
            const form = {
                FullName: fullName,
                Role: role,
                Email: email.trim() ? email.trim() : null
            }

            if (editTarget) {
                ok = await updateParticipantAction(projectId, editTarget.id, form)
            } else {
                ok = await addParticipantAction(projectId, form)
            }

            if (ok) {
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
                        {editTarget ? (
                            <>
                                <Edit className="w-5 h-5 text-emerald-600" />
                                Cập nhật người tham gia
                            </>
                        ) : (
                            <>
                                <Users className="w-5 h-5 text-emerald-600" />
                                Thêm người tham gia
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        {editTarget ? 'Chỉnh sửa thông tin thành viên ngoài tham gia đề tài.' : 'Nhập thông tin sinh viên hỗ trợ hoặc cộng tác viên tham gia đề tài.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div className="space-y-1">
                        <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Họ và tên <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ và tên..."
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="username@example.com"
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Vai trò <span className="text-red-500">*</span>
                        </Label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors text-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                        >
                            {ROLE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
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
                        disabled={saving || !fullName.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {editTarget ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

