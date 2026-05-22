'use client'

import { useState } from 'react'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export interface Education {
    id: string
    trainingName: string
    degreeName: string
    status: string
    graduatedAt: string
}

interface EducationTableProps {
    educations: Education[]
    onAdd: (education: Omit<Education, 'id'>) => void
    onEdit: (id: string, education: Omit<Education, 'id'>) => void
    onDelete: (id: string) => void
}

export function EducationTable({
    educations,
    onAdd,
    onEdit,
    onDelete,
}: EducationTableProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        trainingName: '',
        degreeName: '',
        status: '',
        graduatedAt: '',
    })

    const editingEducation = editingId
        ? educations.find((e) => e.id === editingId)
        : null

    const handleOpenAddDialog = () => {
        setFormData({
            trainingName: '',
            degreeName: '',
            status: '',
            graduatedAt: '',
        })
        setEditingId(null)
        setIsAddDialogOpen(true)
    }

    const handleOpenEditDialog = (education: Education) => {
        setFormData({
            trainingName: education.trainingName,
            degreeName: education.degreeName,
            status: education.status,
            graduatedAt: education.graduatedAt,
        })
        setEditingId(education.id)
        setIsEditDialogOpen(true)
    }

    const handleSave = async () => {
        if (
            !formData.trainingName ||
            !formData.degreeName ||
            !formData.status ||
            !formData.graduatedAt
        ) {
            alert('Vui lòng điền đầy đủ thông tin')
            return
        }

        setIsLoading(true)
        try {
            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 500))

            if (editingId) {
                onEdit(editingId, {
                    trainingName: formData.trainingName,
                    degreeName: formData.degreeName,
                    status: formData.status,
                    graduatedAt: formData.graduatedAt,
                })
                setIsEditDialogOpen(false)
            } else {
                onAdd({
                    trainingName: formData.trainingName,
                    degreeName: formData.degreeName,
                    status: formData.status,
                    graduatedAt: formData.graduatedAt,
                })
                setIsAddDialogOpen(false)
            }

            setFormData({
                trainingName: '',
                degreeName: '',
                status: '',
                graduatedAt: '',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setIsLoading(true)
        try {
            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 300))
            onDelete(id)
            setDeleteConfirmId(null)
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return ''
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        } catch {
            return dateString
        }
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg sm:text-xl">Quá trình học tập</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Quản lý thông tin học vấn và bằng cấp của bạn
                        </CardDescription>
                    </div>
                    <Button onClick={handleOpenAddDialog} size="sm" className="w-full sm:w-auto">
                        <Plus size={16} className="mr-2" />
                        Thêm mới
                    </Button>
                </CardHeader>

                <CardContent>
                    {educations.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-sm text-muted-foreground">
                                Chưa có thông tin học vấn. Hãy thêm thông tin của bạn.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto -mx-6 sm:mx-0">
                            <div className="px-6 sm:px-0">
                                <table className="w-full text-xs sm:text-sm">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left py-3 px-2 sm:px-4 font-semibold">
                                                Chương trình đào tạo
                                            </th>
                                            <th className="text-left py-3 px-2 sm:px-4 font-semibold hidden sm:table-cell">
                                                Bằng cấp
                                            </th>
                                            <th className="text-left py-3 px-2 sm:px-4 font-semibold hidden md:table-cell">
                                                Trạng thái
                                            </th>
                                            <th className="text-left py-3 px-2 sm:px-4 font-semibold hidden lg:table-cell">
                                                Ngày tốt nghiệp
                                            </th>
                                            <th className="text-right py-3 px-2 sm:px-4 font-semibold">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {educations.map((education) => (
                                            <tr
                                                key={education.id}
                                                className="border-b border-border hover:bg-accent transition-colors"
                                            >
                                                <td className="py-3 px-2 sm:px-4 font-medium truncate">
                                                    {education.trainingName}
                                                </td>
                                                <td className="py-3 px-2 sm:px-4 text-muted-foreground hidden sm:table-cell truncate">
                                                    {education.degreeName}
                                                </td>
                                                <td className="py-3 px-2 sm:px-4 hidden md:table-cell">
                                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs whitespace-nowrap">
                                                        {education.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 sm:px-4 text-muted-foreground hidden lg:table-cell text-xs sm:text-sm">
                                                    {formatDate(education.graduatedAt)}
                                                </td>
                                                <td className="py-3 px-2 sm:px-4 text-right">
                                                    <div className="flex justify-end gap-1 sm:gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleOpenEditDialog(education)}
                                                            className="h-8 w-8 p-0 sm:w-auto sm:px-2"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <Edit2 size={16} className="sm:mr-1" />
                                                            <span className="hidden sm:inline">Sửa</span>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setDeleteConfirmId(education.id)}
                                                            className="h-8 w-8 p-0 sm:w-auto sm:px-2 text-destructive hover:text-destructive"
                                                            title="Xóa"
                                                        >
                                                            <Trash2 size={16} className="sm:mr-1" />
                                                            <span className="hidden sm:inline">Xóa</span>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
                if (!open) {
                    setIsAddDialogOpen(false)
                    setIsEditDialogOpen(false)
                    setEditingId(null)
                }
            }}>
                <DialogContent className="max-w-md mx-4 sm:mx-0">
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? 'Chỉnh sửa thông tin học tập' : 'Thêm thông tin học tập'}
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            {editingId
                                ? 'Cập nhật thông tin học vấn của bạn'
                                : 'Thêm một trình độ học vấn mới'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="training" className="text-xs sm:text-sm">
                                Chương trình đào tạo *
                            </Label>
                            <Input
                                id="training"
                                placeholder="Ví dụ: Đại học Công nghệ Thông tin"
                                value={formData.trainingName}
                                onChange={(e) =>
                                    setFormData({ ...formData, trainingName: e.target.value })
                                }
                                className="text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="degree" className="text-xs sm:text-sm">
                                Bằng cấp *
                            </Label>
                            <Input
                                id="degree"
                                placeholder="Ví dụ: Tiến sĩ, Thạc sĩ, Cử nhân"
                                value={formData.degreeName}
                                onChange={(e) =>
                                    setFormData({ ...formData, degreeName: e.target.value })
                                }
                                className="text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-xs sm:text-sm">
                                Trạng thái *
                            </Label>
                            <Input
                                id="status"
                                placeholder="Ví dụ: Đã tốt nghiệp, Đang học"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                                className="text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="graduated" className="text-xs sm:text-sm">
                                Ngày tốt nghiệp *
                            </Label>
                            <Input
                                id="graduated"
                                type="date"
                                value={formData.graduatedAt}
                                onChange={(e) =>
                                    setFormData({ ...formData, graduatedAt: e.target.value })
                                }
                                className="text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-6">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddDialogOpen(false)
                                setIsEditDialogOpen(false)
                                setEditingId(null)
                            }}
                            disabled={isLoading}
                            className="text-xs sm:text-sm"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="text-xs sm:text-sm"
                        >
                            {isLoading ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => {
                if (!open) setDeleteConfirmId(null)
            }}>
                <AlertDialogContent className="max-w-xs mx-4 sm:mx-0">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base sm:text-lg">
                            Xác nhận xóa
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs sm:text-sm">
                            Bạn chắc chắn muốn xóa thông tin này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-3 justify-end">
                        <AlertDialogCancel className="text-xs sm:text-sm">
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                            disabled={isLoading}
                            className="text-xs sm:text-sm"
                        >
                            {isLoading ? 'Đang xóa...' : 'Xóa'}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
