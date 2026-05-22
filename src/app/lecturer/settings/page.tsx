'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Cài đặt lớp</h1>
                <p className="text-muted-foreground mt-2">
                    Quản lý cài đặt cho các lớp học của bạn
                </p>
            </div>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Thông báo</CardTitle>
                    <CardDescription>
                        Kiểm soát cách bạn nhận thông báo
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Thông báo bài tập mới</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Nhận thông báo khi sinh viên nộp bài tập
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Thông báo câu hỏi</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Nhận thông báo khi sinh viên đặt câu hỏi
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Nhắc nhở lớp học</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Nhận nhắc nhở trước khi lớp bắt đầu
                            </p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Bảo mật</CardTitle>
                    <CardDescription>
                        Quản lý quyền truy cập và bảo mật
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="password" className="text-sm font-medium">
                            Đổi mật khẩu
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Mật khẩu hiện tại"
                            className="mt-2"
                        />
                        <Input
                            type="password"
                            placeholder="Mật khẩu mới"
                            className="mt-2"
                        />
                        <Input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            className="mt-2"
                        />
                        <Button className="mt-4">Cập nhật mật khẩu</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Class Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Cài đặt lớp học</CardTitle>
                    <CardDescription>
                        Cấu hình các tùy chọn cho các lớp học của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Cho phép sinh viên tự đăng ký</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Sinh viên có thể tự thêm vào lớp học
                            </p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Hiển thị bảng xếp hạng</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Hiển thị điểm số công khai cho sinh viên
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
