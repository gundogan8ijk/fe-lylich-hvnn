export interface NavbarConfig {
    title: string
    avatarText: string
}

export const lecturerNavbarConfig: NavbarConfig = {
    title: 'Giáo Viên',
    avatarText: 'GV',
}

export const managerNavbarConfig: NavbarConfig = {
    title: 'Quản lý',
    avatarText: 'QL',
}

export interface Notifications {
    id: number
    title: string
    description: string
    time: string
    read: boolean
}