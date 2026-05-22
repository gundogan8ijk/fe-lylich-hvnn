export interface NavbarConfig {
    title: string
    avatarText: string
}

export const lecturerNavbarConfig: NavbarConfig = {
    title: 'Giáo Viên',
    avatarText: 'GV',
}

export const studentNavbarConfig: NavbarConfig = {
    title: 'Sinh Viên',
    avatarText: 'SV',
}

export interface Notifications {
    id: number
    title: string
    description: string
    time: string
    read: boolean
}