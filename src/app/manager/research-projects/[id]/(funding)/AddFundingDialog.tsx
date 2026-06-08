'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/_components/ui/dialog'
import { Button } from '@/_components/ui/button'
import { Label } from '@/_components/ui/label'
import { Input } from '@/_components/ui/input'
import { Textarea } from '@/_components/ui/textarea'
import { Loader2, Wallet } from 'lucide-react'
import { addFundingByManagerAction } from '@/working-manager/project-detail/project-detail-hook'

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    projectId: string
}

const SOURCE_OPTIONS = [
    { value: 'StateBudget', label: 'Ngân sách Nhà nước (StateBudget)' },
    { value: 'CorporateFunding', label: 'Tài trợ Doanh nghiệp (CorporateFunding)' },
    { value: 'SelfFunded', label: 'Tự túc / Tự tài trợ (SelfFunded)' }
]

export default function AddFundingDialog({ open, onOpenChange, projectId }: Props) {
    const [source, setSource] = useState('StateBudget')
    const [amount, setAmount] = useState<number>(0)
    const [description, setDescription] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (open) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
            setSource('StateBudget')
            setAmount(0)
            setDescription('')
        }
    }, [open])

    const handleSave = async () => {
        if (!source || amount <= 0) return
        setSaving(true)
        try {
            const ok = await addFundingByManagerAction({
                Source: source,
                Amount: amount,
                Description: description.trim()
            })
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
                        <Wallet className="w-5 h-5 text-indigo-600" />
                        Thêm nguồn kinh phí
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Thêm thông tin về nguồn vốn tài trợ và kinh phí thực hiện đề tài.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    {/* Source */}
                    <div className="space-y-1">
                        <Label htmlFor="source" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Nguồn kinh phí <span className="text-red-500">*</span>
                        </Label>
                        <select
                            id="source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors text-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                        >
                            {SOURCE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount */}
                    <div className="space-y-1">
                        <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Kinh phí (VNĐ) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            min={0}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="Nhập số tiền..."
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Mô tả chi tiết
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ghi chú thêm về kinh phí..."
                            rows={3}
                            className="bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-sm resize-none"
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
                        disabled={saving || amount <= 0}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                    >
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Thêm kinh phí
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
