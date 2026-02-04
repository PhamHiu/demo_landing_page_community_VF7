import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send, Crown } from 'lucide-react';

interface Admin {
  name: string;
  role: string;
  avatar: string;
}

const admins: Admin[] = [
  {
    name: 'Nguyễn Văn An',
    role: 'Quản trị viên',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
  },
  {
    name: 'Trần Thị Bình',
    role: 'Điều hành viên',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  },
  {
    name: 'Lê Hoàng Cường',
    role: 'Hỗ trợ kỹ thuật',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'feedback',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] pt-16">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4">
            Liên hệ & Hợp tác
          </h1>
          <p className="text-xl text-gray-600">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Kết nối với Ban Quản Trị</h2>
              
              {/* Admin List */}
              <div className="space-y-4 mb-8">
                {admins.map((admin, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                    />
                    <div>
                      <h3 className="font-semibold">{admin.name}</h3>
                      <p className="text-white/80 text-sm">{admin.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Hotline</div>
                    <div className="font-semibold">1900 23 23 89</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Email</div>
                    <div className="font-semibold">vf7community@vinfast.vn</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm">Địa chỉ</div>
                    <div className="font-semibold">Hà Nội, Việt Nam</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="font-semibold mb-4">Theo dõi chúng tôi</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Partner Tiers */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#2D3436] mb-6">Chương trình đối tác</h3>
              <div className="space-y-4">
                <div className="p-6 border-2 border-yellow-400 rounded-2xl bg-gradient-to-br from-yellow-50 to-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-6 h-6 text-yellow-600" />
                    <h4 className="text-xl font-bold text-yellow-900">Gold Partner</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Logo hiển thị nổi bật trên website</li>
                    <li>• Ưu tiên tổ chức sự kiện</li>
                    <li>• Hỗ trợ marketing toàn diện</li>
                    <li>• Báo cáo chi tiết hàng tháng</li>
                  </ul>
                </div>
                <div className="p-6 border-2 border-gray-300 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-6 h-6 text-gray-500" />
                    <h4 className="text-xl font-bold text-gray-900">Silver Partner</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Logo hiển thị trên trang đối tác</li>
                    <li>• Tham gia sự kiện cộng đồng</li>
                    <li>• Hỗ trợ marketing cơ bản</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#2D3436] mb-6">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#1A73E8] bg-transparent focus:outline-none transition-colors"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#1A73E8] bg-transparent focus:outline-none transition-colors"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#1A73E8] bg-transparent focus:outline-none transition-colors"
                  placeholder="0912 345 678"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Bạn muốn liên hệ về việc gì?</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#1A73E8] bg-transparent focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="feedback">Góp ý</option>
                  <option value="sponsor">Tài trợ</option>
                  <option value="partnership">Hợp tác</option>
                  <option value="complaint">Khiếu nại</option>
                  <option value="support">Hỗ trợ kỹ thuật</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#1A73E8] rounded-xl bg-gray-50 focus:outline-none transition-colors resize-none"
                  rows={6}
                  placeholder="Nhập nội dung tin nhắn..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Gửi tin nhắn</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
