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

export const adminNavbarConfig: NavbarConfig = {
    title: 'Quản trị viên',
    avatarText: 'AD',
}

export interface Notifications {
    id: number
    title: string
    description: string
    time: string
    read: boolean
}