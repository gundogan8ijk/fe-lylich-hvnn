import { BarChart3, BookOpen, Briefcase, Building2, FileText, FlaskConical, HelpCircle, LucideIcon, Settings, UserRoundCog, Users } from "lucide-react"

export interface SidebarItem {
    icon: LucideIcon
    label: string
    href: string
}

export const lecturerMenu: SidebarItem[] = [
    { icon: BookOpen, label: 'Sách', href: '/lecturer/book' },
    { icon: FileText, label: 'Bài báo', href: '/lecturer/article' },
    { icon: UserRoundCog, label: 'Hồ Sơ', href: '/lecturer/profile' },
    { icon: FlaskConical, label: 'Đề tài', href: '/lecturer/research-projects' },
    { icon: Briefcase, label: 'Đề tài bên ngoài', href: '/lecturer/project-external' },
    { icon: Building2, label: 'khoa và giảng dạy', href: '/lecturer/teaching' },
    { icon: Settings, label: 'Cài đặt', href: '/lecturer/settings' },
    { icon: HelpCircle, label: 'Trợ giúp', href: '/lecturer/help' },
]

export const managerMenu: SidebarItem[] = [
    { icon: BookOpen, label: 'Lớp học', href: '/manager/classes' },
    { icon: Users, label: 'Sinh viên', href: '/manager/students' },
    { icon: UserRoundCog, label: 'Hồ Sơ', href: '/manager/profile' },
    { icon: FileText, label: 'Đề tài', href: '/manager/research-projects' },
    { icon: BarChart3, label: 'Đánh giá', href: '/manager/grades' },
    { icon: Settings, label: 'Cài đặt lớp', href: '/manager/settings' },
    { icon: HelpCircle, label: 'Trợ giúp', href: '/manager/help' },
]