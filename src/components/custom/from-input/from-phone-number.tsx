import { Input } from "@/components/ui/input"
import { UpdatePhoneRequest } from "@/profile-Lecturer/Lecturer-Profile-hook"

interface FormPhoneNumberProps {
    editValue: UpdatePhoneRequest
    setEditValue: (val: UpdatePhoneRequest) => void
}

const onlyNumber = (value: string) => value.replace(/\D/g, '')

export default function FormPhoneNumber({ editValue, setEditValue }: FormPhoneNumberProps) {

    const handleNumberChange = (value: string) => {
        const numbers = onlyNumber(value)

        // CHỈ 10 SỐ
        if (numbers.length <= 10) {
            setEditValue({ ...editValue, number: numbers })
        }
    }

    const handleExtensionChange = (value: string) => {
        const numbers = onlyNumber(value)

        if (numbers.length <= 6) {
            setEditValue({ ...editValue, extension: numbers })
        }
    }

    return (
        <div className="space-y-3">
            {/* Country code */}
            <div>
                <label className="text-xs font-medium text-muted-foreground">
                    Mã quốc gia
                </label>

                <div className="h-10 flex items-center px-3 rounded-md border bg-muted text-sm mt-1.5">
                    {editValue?.countryCode || '+84'}
                </div>
            </div>

            {/* Phone number */}
            <div>
                <label className="text-xs font-medium text-muted-foreground">
                    Số điện thoại mới
                </label>

                <Input
                    placeholder="Nhập số điện thoại..."
                    value={editValue?.number || ''}
                    onChange={e => handleNumberChange(e.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                />
            </div>

            {/* Extension */}
            <div>
                <label className="text-xs font-medium text-muted-foreground">
                    Số máy lẻ (nếu có)
                </label>

                <Input
                    placeholder="Ví dụ: 102"
                    value={editValue?.extension || ''}
                    onChange={e => handleExtensionChange(e.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                />
            </div>
        </div>
    )
}