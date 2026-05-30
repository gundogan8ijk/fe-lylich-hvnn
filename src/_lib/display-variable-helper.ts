export { getInitials, getYear, getDateOnly, formatDateForInput,getLabel }

//tên → viết tắt
const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
}

//lấy năm
function getYear(date: string | Date): string {
    return new Date(date).getFullYear().toString()
}

/** Date | string → "dd/MM/yyyy", trả "" nếu null/undefined */
function getDateOnly(dateInput: string | Date | null | undefined): string {
    if (!dateInput) return ''
    const date = new Date(dateInput)
    const day   = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}/${month}/${date.getFullYear()}`
}

/** "dd/MM/yyyy" → "yyyy-MM-dd" cho <input type="date"> */
function formatDateForInput(date?: string): string {
    if (!date) return ''
    const parts = date.split('/')
    if (parts.length !== 3) return ''
    const [day, month, year] = parts
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

//lấy nhãn tiếng việt
function getLabel<T extends string>(
    options: { value: T; label: string }[],
    value: T,
): string {
    return options.find((o) => o.value === value)?.label ?? value
}

