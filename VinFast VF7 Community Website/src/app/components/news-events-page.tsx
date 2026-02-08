import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, ChevronRight, ChevronLeft, Search, ArrowLeft, X, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Event {
  id: number;
  type: 'event' | 'news' | 'offline';
  title: string;
  description: string;
  image: string;
  date: string;
  location?: string;
  attendees?: number;
  registered?: boolean;
  content?: string;
}

const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return {
    question: `${num1} + ${num2} = ?`,
    answer: num1 + num2
  };
};

const mockEvents: Event[] = [
  {
    id: 1,
    type: 'event',
    title: 'VinFast VF7 Test Drive Tour 2026',
    description: 'Trải nghiệm lái thử VF7 cùng đội ngũ chuyên gia và nhận nhiều ưu đãi hấp dẫn.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    date: '15/02/2026',
    location: 'Hà Nội',
    attendees: 250,
    content: `
      <p class="mb-4">Chúng tôi hân hạnh mời quý khách hàng tham dự chương trình lái thử xe VinFast VF7 - mẫu xe điện thông minh mới nhất của chúng tôi. Đây là cơ hội tuyệt vời để trải nghiệm trực tiếp khả năng vận hành mạnh mẽ, công nghệ tiên tiến và thiết kế đột phá của VF7.</p>
      <h4 class="text-lg font-bold mb-2 text-[#D4AF37]">Nội dung chương trình:</h4>
      <ul class="list-disc list-inside mb-4 space-y-1 text-[#CCCCCC]">
        <li>Giới thiệu chi tiết về VF7 và các công nghệ mới.</li>
        <li>Trải nghiệm lái thử trên đường thử chuyên dụng.</li>
        <li>Tư vấn trực tiếp từ các chuyên gia kỹ thuật.</li>
        <li>Nhận quà tặng lưu niệm và ưu đãi đặc biệt khi đặt cọc ngay tại sự kiện.</li>
      </ul>
      <p>Chương trình hoàn toàn miễn phí và mở cửa cho tất cả mọi người. Vui lòng đăng ký trước để chúng tôi phục vụ tốt nhất.</p>
    `
  },
  {
    id: 2,
    type: 'news',
    title: 'VinFast công bố nâng cấp phần mềm OTA mới',
    description: 'Bản cập nhật mới mang đến nhiều tính năng thông minh cho VF7, bao gồm AI Assistant nâng cao và tối ưu hóa pin.',
    image: 'https://images.unsplash.com/photo-1761320142429-0672277fc080?w=800',
    date: '10/02/2026',
    content: `
      <p class="mb-4">VinFast chính thức công bố bản cập nhật phần mềm OTA (Over-The-Air) mới nhất cho dòng xe VF7. Bản cập nhật này tập trung vào việc nâng cao trải nghiệm người dùng và tối ưu hóa hiệu suất xe.</p>
      <h4 class="text-lg font-bold mb-2 text-[#D4AF37]">Các tính năng nổi bật:</h4>
      <ul class="list-disc list-inside mb-4 space-y-1 text-[#CCCCCC]">
        <li><strong>Trợ lý ảo AI nâng cao:</strong> Nhận diện giọng nói tự nhiên hơn, hỗ trợ nhiều câu lệnh điều khiển xe và tra cứu thông tin.</li>
        <li><strong>Tối ưu hóa pin:</strong> Cải thiện thuật toán quản lý năng lượng, giúp tăng quãng đường di chuyển thêm 5% trong điều kiện thực tế.</li>
        <li><strong>Giao diện giải trí mới:</strong> Thiết kế hiện đại, dễ sử dụng và tích hợp thêm các ứng dụng giải trí phổ biến.</li>
      </ul>
      <p>Bản cập nhật sẽ được tự động tải về và cài đặt trên xe của quý khách trong vòng 24 giờ tới. Xin vui lòng đảm bảo xe có kết nối internet ổn định.</p>
    `
  },
  {
    id: 3,
    type: 'offline',
    title: 'Offline meet-up VF7 Hà Nội',
    description: 'Gặp gỡ, giao lưu và chia sẻ kinh nghiệm cùng cộng đồng VF7 Hà Nội.',
    image: 'https://images.unsplash.com/photo-1762158008280-3dcb1d1cbd99?w=800',
    date: '08/02/2026',
    location: 'Café The Coffee House - Hồ Tây',
    attendees: 45,
    registered: true,
    content: `
        <p class="mb-4">Chào mừng các thành viên cộng đồng VF7 Hà Nội tham gia buổi Offline gặp gỡ đầu xuân. Đây là dịp để chúng ta cùng nhau chia sẻ niềm đam mê xe điện, kinh nghiệm sử dụng xe và gắn kết tình bạn.</p>
        <p class="mb-4"><strong class="text-[#D4AF37]">Thời gian:</strong> 09:00 - 12:00, Chủ Nhật ngày 08/02/2026.</p>
        <p class="mb-4"><strong class="text-[#D4AF37]">Địa điểm:</strong> Café The Coffee House - Hồ Tây (View bao trọn hồ).</p>
        <p>Chi phí tham dự: Campuchia (chia đều). Đã có 45 thành viên đăng ký, hãy nhanh tay để giữ chỗ nhé!</p>
    `
  },
  {
    id: 4,
    type: 'news',
    title: 'VinFast mở rộng mạng lưới trạm sạc',
    description: '100 trạm sạc nhanh mới được triển khai trên toàn quốc, rút ngắn thời gian chờ sạc.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    date: '05/02/2026',
    content: `
        <p>Nhằm đáp ứng nhu cầu ngày càng tăng của người dùng xe điện, VinFast tiếp tục mở rộng mạng lưới trạm sạc trên toàn quốc. Trong đợt này, 100 trạm sạc nhanh DC 150kW mới đã được đưa vào hoạt động tại các tỉnh miền Trung và miền Nam.</p>
        <p class="mt-4">Các trạm sạc mới được đặt tại các vị trí thuận tiện như trung tâm thương mại, trạm dừng nghỉ trên cao tốc và các khu dân cư đông đúc. VinFast cam kết mang đến sự thuận tiện tối đa cho khách hàng trên mọi hành trình.</p>
    `
  },
  {
    id: 5,
    type: 'event',
    title: 'Chương trình chăm sóc khách hàng VF7',
    description: 'Kiểm tra bảo dưỡng miễn phí cho xe VF7 trong tháng 2.',
    image: 'https://images.unsplash.com/photo-1605822167835-d32696aef686?w=800',
    date: '01/02/2026',
    location: 'Toàn quốc',
    attendees: 1000,
    content: `
        <p>Tháng tri ân khách hàng VF7! Miễn phí kiểm tra tổng quát 30 hạng mục và giảm giá 20% phụ tùng thay thế. Chương trình áp dụng tại tất cả các Xưởng dịch vụ VinFast trên toàn quốc.</p>
        <p class="mt-4">Quý khách vui lòng đặt lịch hẹn trước qua ứng dụng VinFast hoặc hotline để được phục vụ tốt nhất.</p>
    `
  },
  {
    id: 6,
    type: 'offline',
    title: 'Road trip xuyên Việt cùng VF7',
    description: 'Hành trình khám phá Việt Nam từ Bắc vào Nam cùng đoàn xe VF7.',
    image: 'https://images.unsplash.com/photo-1727802329382-b9f080571270?w=800',
    date: '20/02/2026',
    location: 'Khởi hành từ Hà Nội',
    attendees: 30,
    content: `
        <p>Hành trình "Non sông một dải" - Caravan xuyên Việt cùng VF7 sẽ khởi hành vào ngày 20/02/2026. Chuyến đi dự kiến kéo dài 15 ngày, qua 10 tỉnh thành và chinh phục những cung đường đẹp nhất Việt Nam.</p>
        <p class="mt-4">Đây là thử thách thú vị để khẳng định khả năng vận hành bền bỉ của VF7 và là cơ hội để các thành viên gắn kết, khám phá vẻ đẹp đất nước.</p>
    `
  },
];

export function NewsEventsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'news' | 'event' | 'offline'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const featuredEvents = mockEvents.slice(0, 3);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  useEffect(() => {
    const interval = setInterval(nextFeatured, 5000);
    return () => clearInterval(interval);
  }, []);

  // Registration Modal State
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    carModel: '',
    note: ''
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'info' } | null>(null);

  // Filter Logic
  const filteredEvents = mockEvents.filter((event) => {
    // Filter by Type
    if (selectedFilter !== 'all' && event.type !== selectedFilter) return false;

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query);
    }

    // Filter by Date
    if (selectedDate) {
      const eventDay = parseInt(event.date.split('/')[0]);
      if (eventDay !== selectedDate) return false;
    }

    return true;
  });

  // Suggestions Logic
  const suggestions = searchQuery.trim()
    ? mockEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : [];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'event':
        return 'Sự kiện';
      case 'news':
        return 'Tin tức';
      case 'offline':
        return 'Offline';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-[#D61C2B] text-white shadow-[0_0_10px_rgba(214,28,43,0.4)]';
      case 'news':
        return 'bg-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]';
      case 'offline':
        return 'bg-[#00C853] text-white shadow-[0_0_10px_rgba(0,200,83,0.4)]';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedEvent(null);
  };

  const handleRegisterClick = () => {
    setShowRegistrationModal(true);
    setCaptcha(generateCaptcha());
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }

    // Success logic
    setShowRegistrationModal(false);
    setNotification({
      show: true,
      message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất.',
      type: 'success'
    });

    // Reset form
    setRegistrationForm({
      fullName: '',
      phone: '',
      email: '',
      carModel: '',
      note: ''
    });
    setCaptchaInput('');
    setCaptchaError(false);

    setTimeout(() => setNotification(null), 3000);
  };

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] pt-24 pb-12 text-[#E0E0E0]">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#D4AF37] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">Quay lại danh sách</span>
          </button>

          {/* Detail Content */}
          <div className="bg-[#151515] rounded-sm overflow-hidden shadow-2xl border border-[#333]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
            <div className="relative h-[300px] md:h-[400px]">
              <ImageWithFallback
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent opacity-80" />
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 ${getTypeColor(selectedEvent.type)} rounded-sm text-sm font-bold uppercase tracking-wider`}>
                  {getTypeLabel(selectedEvent.type)}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 -mt-20 relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight uppercase tracking-wide drop-shadow-md">
                {selectedEvent.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 text-[#CCC] border-b border-[#333] pb-8">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-medium">{selectedEvent.date}</span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-medium">{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-medium">{selectedEvent.attendees} người tham gia</span>
                  </div>
                )}
              </div>

              <div
                className="prose prose-lg max-w-none text-[#CCCCCC] prose-headings:text-white prose-strong:text-[#D4AF37] prose-a:text-[#D61C2B]"
                dangerouslySetInnerHTML={{ __html: selectedEvent.content || '' }}
              />

              {selectedEvent.type !== 'news' && (
                <div className="mt-12 pt-8 border-t border-[#333] flex justify-center">
                  <button
                    onClick={handleRegisterClick}
                    className={`px-12 py-4 rounded-sm font-bold text-lg uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_25px_rgba(214,28,43,0.5)] transform hover:-translate-y-1 ${selectedEvent.registered
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                      : 'bg-gradient-to-r from-[#D61C2B] to-[#990F1B] text-white'
                      }`}
                    style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
                    disabled={selectedEvent.registered}
                  >
                    {selectedEvent.registered ? 'Bạn đã đăng ký' : 'Đăng ký tham gia ngay'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Registration Modal */}
        {showRegistrationModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#151515] border border-[#333] rounded-sm w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-8" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-[#333] flex justify-between items-center bg-[#1A1A1A]">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Đăng ký tham gia</h2>
                  <p className="text-sm text-[#888] mt-1">{selectedEvent.title}</p>
                </div>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="p-2 hover:bg-[#333] rounded-sm transition-colors text-[#888] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleRegisterSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#A3A3A3] uppercase tracking-wide">Họ và tên <span className="text-[#D61C2B]">*</span></label>
                    <input
                      type="text"
                      required
                      value={registrationForm.fullName}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#A3A3A3] uppercase tracking-wide">Số điện thoại <span className="text-[#D61C2B]">*</span></label>
                    <input
                      type="tel"
                      required
                      value={registrationForm.phone}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#A3A3A3] uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#A3A3A3] uppercase tracking-wide">Loại xe đang sở hữu</label>
                    <div className="relative">
                      <select
                        value={registrationForm.carModel}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, carModel: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Chọn dòng xe</option>
                        <option value="VF 3">VinFast VF 3</option>
                        <option value="VF 5 Plus">VinFast VF 5 Plus</option>
                        <option value="VF 6">VinFast VF 6</option>
                        <option value="VF e34">VinFast VF e34</option>
                        <option value="VF 7">VinFast VF 7</option>
                        <option value="VF 8">VinFast VF 8</option>
                        <option value="VF 9">VinFast VF 9</option>
                        <option value="Lux A2.0">VinFast Lux A2.0</option>
                        <option value="Lux SA2.0">VinFast Lux SA2.0</option>
                        <option value="Fadil">VinFast Fadil</option>
                        <option value="President">VinFast President</option>
                        <option value="Klara">VinFast Klara (Xe máy điện)</option>
                        <option value="Other">Khác</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#666]">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#A3A3A3] uppercase tracking-wide">Thông tin bổ sung</label>
                  <textarea
                    rows={3}
                    value={registrationForm.note}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, note: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all resize-none"
                    placeholder="Ghi chú thêm cho ban tổ chức..."
                  />
                </div>

                {/* Captcha */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#A3A3A3] uppercase tracking-wide">Xác thực Captcha <span className="text-[#D61C2B]">*</span></label>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg bg-[#1A1A1A] text-[#D4AF37] px-4 py-2 rounded-sm border border-[#333] select-none tracking-widest font-mono">
                      {captcha.question}
                    </span>
                    <input
                      type="number"
                      required
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                      }}
                      className={`w-32 px-4 py-3 bg-[#0F0F0F] border rounded-sm focus:outline-none transition-all text-white ${captchaError ? 'border-red-500' : 'border-[#333] focus:border-[#D4AF37]'}`}
                      placeholder="Kết quả"
                    />
                  </div>
                  {captchaError && <p className="text-sm text-red-500 mt-1 font-bold">Kết quả không chính xác!</p>}
                </div>

                <div className="pt-6 border-t border-[#333] flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-6 py-3 rounded-sm font-bold text-[#888] border border-[#333] hover:text-white hover:border-[#666] transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#D61C2B] to-[#990F1B] text-white rounded-sm font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(214,28,43,0.4)] transition-all"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                  >
                    Gửi đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {notification && notification.show && (
          <div className="fixed top-24 right-8 z-[60] animate-in slide-in-from-right duration-300">
            <div className={`bg-[#1A1A1A] px-6 py-4 rounded-sm shadow-[0_0_20px_rgba(0,200,83,0.2)] border border-[#00C853] flex items-center gap-4`}>
              <div className="w-10 h-10 bg-[#00C853]/20 rounded-full flex items-center justify-center text-[#00C853] border border-[#00C853]/30">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider">Thành công!</h4>
                <p className="text-sm text-[#AAA]">{notification.message}</p>
              </div>
              <button onClick={() => setNotification(null)} className="text-[#666] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Calendar dates for current month

  const daysInMonth = new Date(2026, 2, 0).getDate();
  const firstDayOfMonth = new Date(2026, 1, 1).getDay();

  const eventDates = mockEvents.map((event) => parseInt(event.date.split('/')[0]));

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-16 text-[#E0E0E0]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D61C2B] opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D61C2B] opacity-5 blur-[150px] rounded-full pointer-events-none" />

      {/* Featured Banner */}
      <div className="relative h-[450px] overflow-hidden group">
        <ImageWithFallback
          src={featuredEvents[currentFeaturedIndex].image}
          alt={featuredEvents[currentFeaturedIndex].title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-16 relative">
            <div className="animate-in slide-in-from-bottom duration-700 fade-in" key={featuredEvents[currentFeaturedIndex].id}>
              <span className="inline-block px-4 py-1 bg-[#D4AF37] text-black rounded-sm mb-6 text-xs font-bold uppercase tracking-widest">
                Sự kiện nổi bật
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wide drop-shadow-2xl max-w-4xl leading-tight">
                {featuredEvents[currentFeaturedIndex].title}
              </h1>
              <p className="text-xl text-[#CCC] mb-8 max-w-2xl font-light line-clamp-2">
                {featuredEvents[currentFeaturedIndex].description}
              </p>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleEventClick(featuredEvents[currentFeaturedIndex]); }}
                className="px-10 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-sm font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all inline-flex items-center gap-3 group"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
              >
                <span>Xem chi tiết</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevFeatured}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/20 hover:border-[#D4AF37]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextFeatured}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/20 hover:border-[#D4AF37]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeaturedIndex(index)}
              className={`w-12 h-1 rounded-sm transition-all ${index === currentFeaturedIndex ? 'bg-[#D4AF37]' : 'bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Bar & Search */}
            <div className="bg-[#151515] rounded-sm p-4 shadow-sm mb-10 flex flex-col md:flex-row gap-4 justify-between items-center border border-[#333]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border ${selectedFilter === 'all'
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#0F0F0F] text-[#888] border-[#333] hover:text-white hover:border-[#666]'
                    }`}
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedFilter('news')}
                  className={`px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border ${selectedFilter === 'news'
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'bg-[#0F0F0F] text-[#888] border-[#333] hover:text-white hover:border-[#666]'
                    }`}
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                  Tin tức
                </button>
                <button
                  onClick={() => setSelectedFilter('event')}
                  className={`px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border ${selectedFilter === 'event'
                    ? 'bg-[#D61C2B] text-white border-[#D61C2B] shadow-[0_0_10px_rgba(214,28,43,0.4)]'
                    : 'bg-[#0F0F0F] text-[#888] border-[#333] hover:text-white hover:border-[#666]'
                    }`}
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                  Sự kiện
                </button>
                <button
                  onClick={() => setSelectedFilter('offline')}
                  className={`px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border ${selectedFilter === 'offline'
                    ? 'bg-[#2ECC71] text-white border-[#2ECC71] shadow-[0_0_10px_rgba(46,204,113,0.4)]'
                    : 'bg-[#0F0F0F] text-[#888] border-[#333] hover:text-white hover:border-[#666]'
                    }`}
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                  Offline
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-auto md:min-w-[300px] z-20">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tin tức, sự kiện..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-12 pr-4 py-2.5 bg-[#0F0F0F] border border-[#333] rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#555] transition-all"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] rounded-sm shadow-xl border border-[#333] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                    {suggestions.map(event => (
                      <button
                        key={event.id}
                        onClick={() => {
                          setSearchQuery(event.title);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-[#252525] transition-colors flex items-start gap-3 border-b border-[#333] last:border-0"
                      >
                        <Search className="w-4 h-4 text-[#666] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-[#E0E0E0] font-medium line-clamp-1">{event.title}</p>
                          <p className="text-xs text-[#888] line-clamp-1">{event.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Events Grid */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="bg-[#151515] rounded-sm shadow-sm overflow-hidden hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all group cursor-pointer border border-[#333] hover:border-[#D4AF37]/50 flex flex-col h-full"
                >
                  <div className="relative flex-shrink-0">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getTypeColor(event.type)} rounded-sm text-xs font-bold uppercase tracking-wider`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </div>
                    {event.type === 'event' && (
                      <div className="absolute top-4 right-4 bg-[#1A1A1A]/90 backdrop-blur-sm rounded-sm px-3 py-2 text-center border border-[#333]">
                        <div className="text-2xl font-bold text-[#D4AF37]">
                          {event.date.split('/')[0]}
                        </div>
                        <div className="text-[10px] text-[#AAA] uppercase">Tháng 2</div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2 uppercase tracking-wide">
                      {event.title}
                    </h3>
                    <p className="text-[#888] mb-4 text-sm line-clamp-2 flex-grow">{event.description}</p>
                    <div className="space-y-2 text-xs text-[#666] border-t border-[#222] pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{event.date}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{event.attendees} người tham gia</span>
                        </div>
                      )}
                    </div>
                    {event.type !== 'news' && (
                      <button
                        className={`w-full mt-5 px-6 py-2.5 rounded-sm font-bold text-sm uppercase tracking-wider transition-all ${event.registered
                          ? 'bg-[#222] text-[#666] border border-[#333]'
                          : 'bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                          }`}
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                      >
                        {event.registered ? 'Đã đăng ký' : 'Tham gia'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="bg-[#151515] rounded-sm shadow-sm overflow-hidden border border-[#333] active:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getTypeColor(event.type)} rounded-sm text-xs font-bold uppercase tracking-wider`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{event.title}</h3>
                    <p className="text-[#888] mb-4 text-sm">{event.description}</p>
                    <div className="space-y-2 text-xs text-[#666]">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-[#151515] rounded-sm p-6 shadow-sm sticky top-24 border border-[#333]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
              <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
                <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
                Lịch sự kiện
              </h3>
              <div className="text-center mb-6 border-b border-[#333] pb-4">
                <div className="text-xl font-bold text-[#E0E0E0]">Tháng 2, 2026</div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-[#888] mb-3 uppercase">
                <div>CN</div>
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const hasEvent = eventDates.includes(day);
                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                      className={`aspect-square flex items-center justify-center rounded-sm text-sm cursor-pointer transition-colors border
                        ${selectedDate === day
                          ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                          : hasEvent
                            ? 'bg-[#D61C2B] text-white font-bold shadow-[0_0_10px_rgba(214,28,43,0.5)] border-[#D61C2B]'
                            : 'text-[#666] hover:bg-[#222] hover:text-white border-transparent'
                        }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-[#333]">
                <div className="flex items-center gap-2 text-xs text-[#888]">
                  <div className="w-2 h-2 bg-[#1A73E8] rounded-full shadow-[0_0_5px_rgba(26,115,232,0.8)]" />
                  <span>Ngày có sự kiện</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
