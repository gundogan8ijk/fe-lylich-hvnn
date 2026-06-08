import { Award, BarChart3, BookMarked, BookOpen, Briefcase, Building2, FileText, FlaskConical, FolderKanban, GraduationCap, HelpCircle, LucideIcon, Newspaper, Settings, User, UserRoundCog, Users } from "lucide-react"

export interface SidebarItem {
    icon: LucideIcon
    label: string
    href: string
}

export const lecturerMenu: SidebarItem[] = [
    { icon: User, label: 'Lý lịch', href: '/lecturer/background' },
    { icon: UserRoundCog, label: 'Hồ Sơ', href: '/lecturer/profile' },
    { icon: BookOpen, label: 'Sách', href: '/lecturer/book' },
    { icon: FileText, label: 'Bài báo', href: '/lecturer/article' },
    { icon: FlaskConical, label: 'Đề tài', href: '/lecturer/research-projects' },
    { icon: Briefcase, label: 'Đề tài bên ngoài', href: '/lecturer/project-external' },
    { icon: Building2, label: 'khoa và giảng dạy', href: '/lecturer/teaching' },
    { icon: Settings, label: 'Cài đặt', href: '/lecturer/settings' },
    { icon: HelpCircle, label: 'Trợ giúp', href: '/lecturer/help' },
]

export const managerMenu: SidebarItem[] = [
    { icon: Users, label: 'Giảng viên', href: '/manager/lecturer' },
    { icon: Building2, label: 'Khoa', href: '/manager/department' },
    { icon: FlaskConical, label: 'Đề tài', href: '/manager/research-projects' },
    { icon: FolderKanban, label: 'Đề tài bên ngoài', href: '/manager/project-external' },
    { icon: Newspaper, label: 'Bài báo', href: '/manager/article' },
    { icon: BookMarked, label: 'Sách', href: '/manager/book' },
    { icon: GraduationCap, label: 'Bằng cấp', href: '/manager/education' },
    { icon: Award, label: 'Giải thưởng', href: '/manager/award' },
]

export const adminMenu: SidebarItem[] = [
    { icon: Users, label: 'Tài khoản', href: '/admin/accounts' },
    { icon: Building2, label: 'Khoa - Bộ môn', href: '/admin/departments' },
    { icon: UserRoundCog, label: 'Hồ Sơ', href: '/admin/profile' },
    { icon: Settings, label: 'Hệ thống', href: '/admin/settings' },
    { icon: HelpCircle, label: 'Trợ giúp', href: '/admin/help' },
]