import { notify } from "@/_components/utils/Notify"

export async function uploadToCloudinary(file: File): Promise<string> {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET!)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
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