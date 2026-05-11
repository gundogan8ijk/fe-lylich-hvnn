import { MapPin, Phone, Mail, Globe } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          
          {/* Cột 1: Thông tin chính */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-700 uppercase tracking-wider">
              Học viện Nông Nghiệp Việt Nam
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cơ sở đào tạo nguồn nhân lực chất lượng cao, trung tâm nghiên cứu khoa học, chuyển giao công nghệ và hoạt động cộng đồng.
            </p>
          </div>

          {/* Cột 2: Liên hệ (Thông tin bạn cung cấp) */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-slate-800">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                <span>Đường Ngô Xuân Quảng, xã Gia Lâm, thành phố Hà Nội.</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-5 h-5 text-green-600 shrink-0" />
                <a href="tel:02462617519" className="hover:text-green-700 transition-colors">
                  024 6261 7519
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh hoặc Mạng xã hội */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-slate-800">Kết nối với chúng tôi</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full hover:bg-green-50 hover:border-green-200 transition-all">
                <Globe className="w-5 h-5 text-green-600" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full hover:bg-green-50 hover:border-green-200 transition-all">
                <Mail className="w-5 h-5 text-red-500" />
              </a>
            </div>
          </div>

        </div>

        {/* Dòng bản quyền dưới cùng */}
        <div className="border-t border-slate-200 pt-8 text-center">
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} Học viện Nông Nghiệp Việt Nam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}