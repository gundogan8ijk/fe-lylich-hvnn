import { BarChart3, BookOpen, FileText, HelpCircle, LucideIcon, Settings, UserRoundCog, Users } from "lucide-react"

export interface SidebarItem {
    icon: LucideIcon
    label: string
    href: string
}

export const lecturerMenu: SidebarItem[] = [
    { icon: BookOpen, label: 'Lớp học', href: '/lecturer/classes' },
    { icon: Users, label: 'Sinh viên', href: '/lecturer/students' },
    { icon: UserRoundCog, label: 'Hồ Sơ', href: '/lecturer/profile' },
    { icon: FileText, label: 'Bài giảng', href: '/lecturer/lectures' },
    { icon: BarChart3, label: 'Đánh giá', href: '/lecturer/grades' },
    { icon: Settings, label: 'Cài đặt lớp', href: '/lecturer/settings' },
    { icon: HelpCircle, label: 'Trợ giúp', href: '/lecturer/help' },
]