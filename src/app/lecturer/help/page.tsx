'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, Mail, MessageCircle } from 'lucide-react'

const faqs = [
    {
        question: 'Làm cách nào để tạo một lớp học mới?',
        answer:
            'Truy cập phần "Lớp học" và nhấp vào nút "Tạo lớp học mới". Điền các thông tin cần thiết như tên lớp, mã lớp, phòng học và lịch biểu.',
    },
    {
        question: 'Tôi có thể thêm sinh viên vào lớp như thế nào?',
        answer:
            'Bạn có thể thêm sinh viên bằng cách vào trang "Sinh viên", nhấp "Thêm sinh viên" và nhập thông tin của họ. Hoặc bạn có thể chia sẻ mã lớp để sinh viên tự đăng ký.',
    },
    {
        question: 'Làm cách nào để tạo và tải bài giảng?',
        answer:
            'Truy cập phần "Bài giảng" và nhấp vào "Tạo bài giảng mới". Bạn có thể tải lên tài liệu, video hoặc tạo nội dung trực tiếp trong hệ thống.',
    },
    {
        question: 'Làm cách nào để đánh giá bài tập của sinh viên?',
        answer:
            'Vào trang "Đánh giá", chọn bài tập cần chấm và nhấp "Chấm điểm". Bạn có thể nhập điểm và thêm ghi chú cho mỗi sinh viên.',
    },
]

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
