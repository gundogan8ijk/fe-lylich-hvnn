import { notify } from "@/_components/utils/Notify"

export async function uploadToPdfCloudinary(file: File): Promise<string> {
    if (file.type !== 'application/pdf') {
        notify.error('Chỉ chấp nhận định dạng file PDF!')
        throw new Error('Định dạng file không hợp lệ')
    }

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET!)
    formData.append('resource_type', 'raw') // ← thêm dòng này

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, {
        method: 'POST',
        body: formData
    })

    if (!res.ok) {
        notify.error('Upload thất bại')
        throw new Error('Upload thất bại')
    }

    const data = await res.json()
    return data.secure_url
}