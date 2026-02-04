import { Link } from 'react-router';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2D3436] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">VF7</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Cộng đồng VinFast VF7 - Kết nối đam mê, chia sẻ hành trình cùng xe điện Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-[#00D2D3] text-sm transition-colors">Trang chủ</Link></li>
              <li><Link to="/map" className="text-gray-300 hover:text-[#00D2D3] text-sm transition-colors">Bản đồ dịch vụ</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-[#00D2D3] text-sm transition-colors">Cộng đồng</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-[#00D2D3] text-sm transition-colors">Tin tức</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>1900 23 23 89</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>vf7community@vinfast.vn</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-[#1A73E8] rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-[#1A73E8] rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-[#1A73E8] rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 VinFast VF7 Community. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}