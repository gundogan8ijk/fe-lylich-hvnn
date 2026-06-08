import { Input } from "@/_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { AddressRequest } from '@/working-Lecturer/profile/infor/Lecturer-Profile-hook'
import { useEffect, useReducer } from "react"

interface FormAddressProps {
    value: AddressRequest
    setValue: (val: AddressRequest) => void
}

type Province = { code: number; name: string }
type District = { code: number; name: string }
type Ward = { code: number; name: string }

const BASE = "https://provinces.open-api.vn/api"
const onlyNumber = (value: string) => value.replace(/\D/g, '')

// ✅ Gom hết state vào 1 reducer — tránh setState đồng bộ nhiều lần
type AddressState = {
    provinces: Province[]
    districts: District[]
    wards: Ward[]
    selectedProvince: Province | null
    selectedDistrict: District | null
    loadingProvinces: boolean
    loadingDistricts: boolean
    loadingWards: boolean
}

type AddressAction =
    | { type: 'SET_PROVINCES'; payload: Province[] }
    | { type: 'SELECT_PROVINCE'; payload: Province }
    | { type: 'SET_DISTRICTS'; payload: District[] }
    | { type: 'SELECT_DISTRICT'; payload: District }
    | { type: 'SET_WARDS'; payload: Ward[] }
    | { type: 'SET_LOADING_PROVINCES'; payload: boolean }
    | { type: 'SET_LOADING_DISTRICTS'; payload: boolean }
    | { type: 'SET_LOADING_WARDS'; payload: boolean }

const initialState: AddressState = {
    provinces: [],
    districts: [],
    wards: [],
    selectedProvince: null,
    selectedDistrict: null,
    loadingProvinces: false,
    loadingDistricts: false,
    loadingWards: false,
}

function addressReducer(state: AddressState, action: AddressAction): AddressState {
    switch (action.type) {
        case 'SET_PROVINCES':
            return { ...state, provinces: action.payload, loadingProvinces: false }
        case 'SET_LOADING_PROVINCES':
            return { ...state, loadingProvinces: action.payload }

        case 'SELECT_PROVINCE':
            // ✅ Reset district/ward cùng lúc trong 1 action — không cascade
            return {
                ...state,
                selectedProvince: action.payload,
                selectedDistrict: null,
                districts: [],
                wards: [],
                loadingDistricts: true,
            }
        case 'SET_DISTRICTS':
            return { ...state, districts: action.payload, loadingDistricts: false }
        case 'SET_LOADING_DISTRICTS':
            return { ...state, loadingDistricts: action.payload }

        case 'SELECT_DISTRICT':
            return {
                ...state,
                selectedDistrict: action.payload,
                wards: [],
                loadingWards: true,
            }
        case 'SET_WARDS':
            return { ...state, wards: action.payload, loadingWards: false }
        case 'SET_LOADING_WARDS':
            return { ...state, loadingWards: action.payload }

        default:
            return state
    }
}

function useAddress() {
    const [state, dispatch] = useReducer(addressReducer, initialState)

    // Load tỉnh 1 lần khi mount
    useEffect(() => {
        dispatch({ type: 'SET_LOADING_PROVINCES', payload: true })
        fetch(`${BASE}/p/`)
            .then(r => r.json())
            .then(data => dispatch({ type: 'SET_PROVINCES', payload: data }))
    }, [])

    // Load quận khi chọn tỉnh
    useEffect(() => {
        if (!state.selectedProvince) return
        fetch(`${BASE}/p/${state.selectedProvince.code}?depth=2`)
            .then(r => r.json())
            .then(data => dispatch({ type: 'SET_DISTRICTS', payload: data.districts ?? [] }))
    }, [state.selectedProvince])

    // Load xã khi chọn quận
    useEffect(() => {
        if (!state.selectedDistrict) return
        fetch(`${BASE}/d/${state.selectedDistrict.code}?depth=2`)
            .then(r => r.json())
            .then(data => dispatch({ type: 'SET_WARDS', payload: data.wards ?? [] }))
    }, [state.selectedDistrict])

    const onSelectProvince = (code: number) => {
        const found = state.provinces.find(p => p.code === code)
        if (found) dispatch({ type: 'SELECT_PROVINCE', payload: found })
    }

    const onSelectDistrict = (code: number) => {
        const found = state.districts.find(d => d.code === code)
        if (found) dispatch({ type: 'SELECT_DISTRICT', payload: found })
    }

    return { ...state, onSelectProvince, onSelectDistrict }
}

const FormField = ({ label, required, children }: {
    label: string
    required?: boolean
    children: React.ReactNode
}) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
        </label>
        {children}
    </div>
)

export default function FormAddress({ value, setValue }: FormAddressProps) {
    const {
        provinces, districts, wards,
        selectedProvince, selectedDistrict,
        loadingProvinces, loadingDistricts, loadingWards,
        onSelectProvince, onSelectDistrict,
    } = useAddress()

    return (
        <div className="w-full space-y-6 rounded-lg border border-border bg-card p-6">

            <FormField label="Số nhà / Đường" required>
                <Input
                    value={value.street || ''}
                    onChange={e => setValue({ ...value, street: e.target.value })}
                    placeholder="VD: 123 Lê Lợi"
                    className="rounded-md"
                />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Tỉnh / Thành" required>
                    <Select
                        disabled={loadingProvinces}
                        onValueChange={val => {
                            const code = Number(val)
                            onSelectProvince(code)
                            const name = provinces.find(p => p.code === code)?.name ?? ''
                            setValue({ ...value, province: name, district: '', ward: '' })
                        }}
                    >
                        <SelectTrigger className="rounded-md">
                            <SelectValue placeholder={loadingProvinces ? "Đang tải..." : "Chọn tỉnh / thành"} />
                        </SelectTrigger>
                        <SelectContent>
                            {provinces.map(p => (
                                <SelectItem key={p.code} value={String(p.code)}>{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Quận / Huyện" required>
                    <Select
                        disabled={!selectedProvince || loadingDistricts}
                        onValueChange={val => {
                            const code = Number(val)
                            onSelectDistrict(code)
                            const name = districts.find(d => d.code === code)?.name ?? ''
                            setValue({ ...value, district: name, ward: '' })
                        }}
                    >
                        <SelectTrigger className="rounded-md">
                            <SelectValue placeholder={
                                !selectedProvince ? "Chọn tỉnh trước"
                                    : loadingDistricts ? "Đang tải..."
                                        : "Chọn quận / huyện"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map(d => (
                                <SelectItem key={d.code} value={String(d.code)}>{d.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Phường / Xã" required>
                    <Select
                        disabled={!selectedDistrict || loadingWards}
                        onValueChange={val => {
                            const code = Number(val)
                            const name = wards.find(w => w.code === code)?.name ?? ''
                            setValue({ ...value, ward: name })
                        }}
                    >
                        <SelectTrigger className="rounded-md">
                            <SelectValue placeholder={
                                !selectedDistrict ? "Chọn quận trước"
                                    : loadingWards ? "Đang tải..."
                                        : "Chọn phường / xã"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {wards.map(w => (
                                <SelectItem key={w.code} value={String(w.code)}>{w.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Thành phố">
                    <Input
                        value={value.city || ''}
                        onChange={e => setValue({ ...value, city: e.target.value })}
                        placeholder="VD: TP. Hồ Chí Minh"
                        className="rounded-md"
                    />
                </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Quốc gia" required>
                    <Input
                        value={value.country || 'Vietnam'}
                        onChange={e => setValue({ ...value, country: e.target.value })}
                        placeholder="Vietnam"
                        className="rounded-md"
                    />
                </FormField>

                <FormField label="Mã bưu điện" required>
                    <Input
                        value={value.zipCode || ''}
                        onChange={e => setValue({ ...value, zipCode: onlyNumber(e.target.value) })}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={20}
                        placeholder="VD: 700000"
                        className="rounded-md"
                    />
                </FormField>
            </div>

            <FormField label="Ghi chú">
                <Input
                    value={value.comments || ''}
                    onChange={e => setValue({ ...value, comments: e.target.value })}
                    placeholder="Thêm thông tin nếu cần..."
                    className="rounded-md"
                />
            </FormField>
        </div>
    )
}