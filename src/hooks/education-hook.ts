'use server'

import { Education } from '@/types/lecurer-type'
import { storeLecturer } from '@/stores/store-item/lecturer-store'
import { notify } from '@/components/utils/Notify'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

// ---------- Types ----------

export type AddEducationRequest = {
    trainingName: string
    degreeName: string
    graduatedAt: string
    status: Education['status']
}

export type UpdateEducationRequest = AddEducationRequest & {
    educationId: string
}

// ---------- Helpers ----------

function getLecturerId(): string | null {
    return storeLecturer.getState().data?.id ?? null
}

function updateEducationsInStore(updater: (prev: Education[]) => Education[]) {
    const state = storeLecturer.getState()
    if (!state.data) return
    state.setData({
        ...state.data,
        educations: updater(state.data.educations),
    })
}

// ---------- Actions ----------

export async function addEducationAction(payload: AddEducationRequest): Promise<void> {
    const id = getLecturerId()
    if (!id) return

    const res = await fetch(`${API_BASE}/lecturers/${id}/educations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        notify.error('Thêm học vấn thất bại')
        throw new Error('Add education failed')
    }

    const created: Education = await res.json()
    updateEducationsInStore((prev) => [...prev, created])
    notify.success('Đã thêm học vấn')
}

export async function updateEducationAction(payload: UpdateEducationRequest): Promise<void> {
    const id = getLecturerId()
    if (!id) return

    const res = await fetch(`${API_BASE}/lecturers/${id}/educations/${payload.educationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        notify.error('Cập nhật học vấn thất bại')
        throw new Error('Update education failed')
    }

    const updated: Education = await res.json()
    updateEducationsInStore((prev) =>
        prev.map((e) => (e.educationId === updated.educationId ? updated : e))
    )
    notify.success('Đã cập nhật học vấn')
}

export async function deleteEducationAction(educationId: string): Promise<void> {
    const id = getLecturerId()
    if (!id) return

    const res = await fetch(`${API_BASE}/lecturers/${id}/educations/${educationId}`, {
        method: 'DELETE',
    })

    if (!res.ok) {
        notify.error('Xóa học vấn thất bại')
        throw new Error('Delete education failed')
    }

    updateEducationsInStore((prev) => prev.filter((e) => e.educationId !== educationId))
    notify.success('Đã xóa học vấn')
}