import { Link } from 'react-router';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-[#E0E0E0]">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/logo-vf7.svg"
                  alt="VF7 Community Logo"
                  className="h-10 w-auto"
                />
                <span className="font-bold text-xl text-white">VinFast VF7</span>
              </Link>
            </div>
            <p className="text-[#A3A3A3] text-sm">
              Cộng đồng VinFast VF7 - Kết nối đam mê, chia sẻ hành trình cùng xe điện Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-[#A3A3A3] hover:text-[#00F0FF] text-sm transition-colors">Trang chủ</Link></li>
              <li><Link to="/map" className="text-[#A3A3A3] hover:text-[#00F0FF] text-sm transition-colors">Bản đồ dịch vụ</Link></li>
              <li><Link to="/community" className="text-[#A3A3A3] hover:text-[#00F0FF] text-sm transition-colors">Cộng đồng</Link></li>
              <li><Link to="/news" className="text-[#A3A3A3] hover:text-[#00F0FF] text-sm transition-colors">Tin tức</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-[#A3A3A3] text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>1900 23 23 89</span>
              </li>
              <li className="flex items-start space-x-2 text-[#A3A3A3] text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>vf7community@vinfast.vn</span>
              </li>
              <li className="flex items-start space-x-2 text-[#A3A3A3] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#1C1C1C] hover:bg-[#D61C2B] border border-[#2E2E2E] rounded-sm flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1C1C1C] hover:bg-[#D61C2B] border border-[#2E2E2E] rounded-sm flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1C1C1C] hover:bg-[#D61C2B] border border-[#2E2E2E] rounded-sm flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2E2E2E] mt-8 pt-8 text-center text-[#A3A3A3] text-sm">
          <p>© 2026 VinFast VF7 Community. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}