import { Award, BarChart3, BookMarked, BookOpen, BookOpenText, Briefcase, Building2, FileText, FlaskConical, FolderKanban, GraduationCap, HelpCircle, LayoutDashboard, LucideIcon, Newspaper, Settings, User, UserCog, UserRoundCog, Users } from "lucide-react"

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
    { icon: LayoutDashboard, label: 'Tổng quan', href: '/admin/overview' },
    { icon: BarChart3,       label: 'Thống kê giảng viên', href: '/admin/lecturer-charts' },
    { icon: BookOpenText,    label: 'Thống kê nghiên cứu', href: '/admin/research-charts' },
    { icon: Users,           label: 'Quản lý tài khoản', href: '/admin/accounts' },
    { icon: UserCog,         label: 'tài khoản giảng viên', href: '/admin/lecturers' },
];