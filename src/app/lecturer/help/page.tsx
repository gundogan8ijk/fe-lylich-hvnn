'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/ui/card'
import { Button } from '@/_components/ui/button'
import { HelpCircle, Mail, MessageCircle } from 'lucide-react'

const faqs = [
    {
        question: 'Làm cách nào để cập nhật thông tin cá nhân?',
        answer:
            'Truy cập mục "Lý lịch cá nhân", chọn "Chỉnh sửa" và cập nhật các thông tin như họ tên, ngày sinh, địa chỉ, số điện thoại và email.',
    },
    {
        question: 'Làm thế nào để cập nhật trình độ học vấn và học hàm, học vị?',
        answer:
            'Trong phần "Quá trình đào tạo", bạn có thể thêm hoặc chỉnh sửa thông tin về bằng cấp, chuyên ngành, cơ sở đào tạo, học vị và học hàm.',
    },
    {
        question: 'Tôi có thể khai báo quá trình công tác như thế nào?',
        answer:
            'Truy cập mục "Quá trình công tác", chọn "Thêm mới" và nhập thông tin về đơn vị công tác, chức vụ, thời gian bắt đầu và kết thúc.',
    },
    {
        question: 'Làm cách nào để cập nhật các công trình nghiên cứu khoa học?',
        answer:
            'Trong mục "Nghiên cứu khoa học", bạn có thể thêm các đề tài, bài báo, sách, giáo trình và các công bố khoa học liên quan.',
    },
    {
        question: 'Tôi có thể tải lên ảnh đại diện và các tệp đính kèm không?',
        answer:
            'Có. Trong phần hồ sơ cá nhân, bạn có thể tải lên ảnh đại diện cũng như các tài liệu minh chứng như bằng cấp, chứng chỉ hoặc quyết định bổ nhiệm.',
    },
    {
        question: 'Làm thế nào để xem và in hồ sơ lý lịch?',
        answer:
            'Truy cập trang hồ sơ cá nhân và chọn chức năng "Xuất hồ sơ" để tải xuống hoặc in theo mẫu quy định.',
    },
];

export default function HelpPage() {
    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Trợ giúp</h1>
                <p className="text-muted-foreground mt-2">
                    Tìm câu trả lời cho các câu hỏi thường gặp
                </p>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">Câu hỏi thường gặp</h2>
                {faqs.map((faq, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-base">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground">{faq.answer}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Support */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageCircle size={20} />
                        Bạn cần thêm trợ giúp?
                    </CardTitle>
                    <CardDescription>
                        Liên hệ với đội hỗ trợ của chúng tôi nếu bạn có bất kỳ câu hỏi nào
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Mail size={18} className="text-primary" />
                        <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">support@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <MessageCircle size={18} className="text-primary" />
                        <div>
                            <p className="text-sm font-medium">Chat trực tiếp</p>
                            <p className="text-sm text-muted-foreground">Có sẵn 24/7</p>
                        </div>
                    </div>
                    <Button className="w-full mt-4">Liên hệ hỗ trợ</Button>
                </CardContent>
            </Card>
        </div>
    )
}
