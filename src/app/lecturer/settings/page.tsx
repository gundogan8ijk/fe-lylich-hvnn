'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/ui/card'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { Switch } from '@/_components/ui/switch'

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Cài đặt</h1>
                <p className="text-muted-foreground mt-2">
                    Quản lý cài đặt 
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
                            <Label className="text-sm font-medium">Thông báo hệ thống</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Nhận thông báo hệ thống
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">Thông báo từ phía ban quản lí</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Nhận thông báo khi khi có kết quả từ ban quản lí
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-sm font-medium">thông báo từ đồng nghiệp</Label>
                            <p className="text-xs text-muted-foreground mt-1">
                                thông báo khi có hợp tác chung
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
        </div>
    )
}
