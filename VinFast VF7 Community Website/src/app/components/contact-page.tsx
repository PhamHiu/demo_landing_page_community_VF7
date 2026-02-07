
import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send, Crown, ArrowRight, User, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

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
    <div className="min-h-screen bg-[#0F0F0F] pt-24 pb-12 text-[#E0E0E0] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D61C2B] opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A73E8] opacity-5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-700 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wide drop-shadow-2xl">
            Liên hệ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#AA771C]">&</span> Hợp tác
          </h1>
          <p className="text-xl text-[#AAA] max-w-4xl mx-auto font-light">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn để xây dựng cộng đồng <span className="text-[#D4AF37] font-bold">VF7</span> vững mạnh
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in delay-100">
            {/* Admin Connection Card */}
            <div className="bg-[#151515] rounded-sm p-8 border border-[#333] relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <h2 className="text-2xl font-bold mb-8 text-white uppercase tracking-wider flex items-center gap-3">
                <Crown className="w-6 h-6 text-[#D4AF37]" />
                Kết nối Ban Quản Trị
              </h2>

              {/* Admin List */}
              <div className="space-y-4 mb-8">
                {admins.map((admin, index) => (
                  <div key={index} className="flex items-center gap-4 bg-[#0F0F0F] border border-[#333] rounded-sm p-4 hover:border-[#1A73E8]/50 transition-colors group/item">
                    <ImageWithFallback
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#333] group-hover/item:border-[#1A73E8] transition-colors"
                    />
                    <div>
                      <h3 className="font-bold text-white group-hover/item:text-[#1A73E8] transition-colors">{admin.name}</h3>
                      <p className="text-[#888] text-xs uppercase tracking-wider">{admin.role}</p>
                    </div>
                    <button className="ml-auto p-2 text-[#666] hover:text-[#1A73E8] transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-6 pt-6 border-t border-[#333]">
                <div className="flex items-center gap-4 group/info">
                  <div className="w-12 h-12 bg-[#222] rounded-sm flex items-center justify-center border border-[#333] group-hover/info:border-[#D4AF37] group-hover/info:text-[#D4AF37] transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#666] text-xs uppercase tracking-widest mb-1">Hotline</div>
                    <div className="font-bold text-lg text-white">1900 23 23 89</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group/info">
                  <div className="w-12 h-12 bg-[#222] rounded-sm flex items-center justify-center border border-[#333] group-hover/info:border-[#D4AF37] group-hover/info:text-[#D4AF37] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#666] text-xs uppercase tracking-widest mb-1">Email</div>
                    <div className="font-bold text-lg text-white">vf7community@vinfast.vn</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group/info">
                  <div className="w-12 h-12 bg-[#222] rounded-sm flex items-center justify-center border border-[#333] group-hover/info:border-[#D4AF37] group-hover/info:text-[#D4AF37] transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#666] text-xs uppercase tracking-widest mb-1">Địa chỉ</div>
                    <div className="font-bold text-lg text-white">Hà Nội, Việt Nam</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-[#333]">
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#222] hover:bg-[#1877F2] hover:text-white text-[#888] rounded-sm flex items-center justify-center transition-all border border-[#333] hover:border-[#1877F2]"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#222] hover:bg-[#E4405F] hover:text-white text-[#888] rounded-sm flex items-center justify-center transition-all border border-[#333] hover:border-[#E4405F]"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#222] hover:bg-[#FF0000] hover:text-white text-[#888] rounded-sm flex items-center justify-center transition-all border border-[#333] hover:border-[#FF0000]"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Partner Tiers */}
            <div className="bg-[#151515] rounded-sm p-8 shadow-sm border border-[#333]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Chương trình đối tác</h3>
              <div className="space-y-4">
                <div className="p-6 border border-[#D4AF37]/30 rounded-sm bg-gradient-to-r from-[#D4AF37]/10 to-transparent hover:border-[#D4AF37] transition-colors group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37] opacity-10 blur-[40px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity" />
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-6 h-6 text-[#D4AF37]" />
                    <h4 className="text-lg font-bold text-[#D4AF37] uppercase tracking-wider">Gold Partner</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-[#CCCCCC]">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D4AF37] rounded-full" /> Logo hiển thị nổi bật trên website</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D4AF37] rounded-full" /> Ưu tiên tổ chức sự kiện</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#D4AF37] rounded-full" /> Hỗ trợ marketing toàn diện</li>
                  </ul>
                </div>
                <div className="p-6 border border-[#A0A0A0]/30 rounded-sm bg-gradient-to-r from-[#A0A0A0]/10 to-transparent hover:border-[#A0A0A0] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-6 h-6 text-[#A0A0A0]" />
                    <h4 className="text-lg font-bold text-[#A0A0A0] uppercase tracking-wider">Silver Partner</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-[#CCCCCC]">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#A0A0A0] rounded-full" /> Logo hiển thị trên trang đối tác</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#A0A0A0] rounded-full" /> Tham gia sự kiện cộng đồng</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#A0A0A0] rounded-full" /> Hỗ trợ marketing cơ bản</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#151515] rounded-sm p-8 shadow-2xl border border-[#333] animate-in slide-in-from-right duration-700 fade-in delay-200" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Gửi tin nhắn</h2>
            <p className="text-[#888] text-sm mb-8">Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24h.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">Họ và tên <span className="text-[#D61C2B]">*</span></label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-[#666] group-focus-within:text-[#D4AF37] transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all placeholder-[#444]"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">Số điện thoại</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-[#666] group-focus-within:text-[#D4AF37] transition-colors" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all placeholder-[#444]"
                      placeholder="0912 345 678"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">Email <span className="text-[#D61C2B]">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#666] group-focus-within:text-[#D4AF37] transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all placeholder-[#444]"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">Vấn đề liên hệ</label>
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all cursor-pointer appearance-none"
                  >
                    <option value="feedback">Góp ý phát triển cộng đồng</option>
                    <option value="sponsor">Tài trợ & Quảng cáo</option>
                    <option value="partnership">Đăng ký đối tác</option>
                    <option value="complaint">Khiếu nại thành viên</option>
                    <option value="support">Hỗ trợ kỹ thuật website</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowRight className="w-4 h-4 text-[#666] rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">Nội dung <span className="text-[#D61C2B]">*</span></label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all resize-none placeholder-[#444]"
                  rows={6}
                  placeholder="Nhập nội dung tin nhắn chi tiết..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#D61C2B] to-[#990F1B] text-white rounded-sm font-bold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(214,28,43,0.5)] transition-all flex items-center justify-center gap-2 group"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
              >
                <span>Gửi tin nhắn</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
