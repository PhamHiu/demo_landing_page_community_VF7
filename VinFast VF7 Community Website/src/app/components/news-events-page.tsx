import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Clock, ChevronRight, Search, ArrowLeft, X, CheckCircle } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
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
      <h4 class="text-lg font-bold mb-2">Nội dung chương trình:</h4>
      <ul class="list-disc list-inside mb-4 space-y-1">
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
      <h4 class="text-lg font-bold mb-2">Các tính năng nổi bật:</h4>
      <ul class="list-disc list-inside mb-4 space-y-1">
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
        <p class="mb-4"><strong>Thời gian:</strong> 09:00 - 12:00, Chủ Nhật ngày 08/02/2026.</p>
        <p class="mb-4"><strong>Địa điểm:</strong> Café The Coffee House - Hồ Tây (View bao trọn hồ).</p>
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
        return 'bg-[#1A73E8] text-white';
      case 'news':
        return 'bg-[#00D2D3] text-white';
      case 'offline':
        return 'bg-[#2ECC71] text-white';
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
      <div className="min-h-screen bg-[#F5F6FA] pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1A73E8] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Quay lại danh sách</span>
          </button>

          {/* Detail Content */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="relative h-[300px] md:h-[400px]">
              <ImageWithFallback
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 ${getTypeColor(selectedEvent.type)} rounded-full text-sm font-bold shadow-md`}>
                  {getTypeLabel(selectedEvent.type)}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-6">
                {selectedEvent.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8 text-gray-600 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#1A73E8]" />
                  <span className="font-medium">{selectedEvent.date}</span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1A73E8]" />
                    <span className="font-medium">{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#1A73E8]" />
                    <span className="font-medium">{selectedEvent.attendees} người tham gia</span>
                  </div>
                )}
              </div>

              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedEvent.content || '' }}
              />

              {selectedEvent.type !== 'news' && (
                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                  <button
                    onClick={handleRegisterClick}
                    className={`px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${selectedEvent.registered
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white'
                      }`}
                    disabled={selectedEvent.registered}
                  >
                    {selectedEvent.registered ? 'Bạn đã đăng ký sự kiện này' : 'Đăng ký tham gia ngay'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Registration Modal */}
        {showRegistrationModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-[#2D3436]">Đăng ký tham gia</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedEvent.title}</p>
                </div>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleRegisterSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={registrationForm.fullName}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      value={registrationForm.phone}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Loại xe đang sở hữu</label>
                    <div className="relative">
                      <select
                        value={registrationForm.carModel}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, carModel: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all appearance-none text-gray-700"
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
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Thông tin bổ sung</label>
                  <textarea
                    rows={3}
                    value={registrationForm.note}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, note: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all resize-none"
                    placeholder="Ghi chú thêm cho ban tổ chức..."
                  />
                </div>

                {/* Captcha */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Xác thực Captcha <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg bg-blue-50 text-[#1A73E8] px-4 py-2 rounded-lg border border-blue-100 select-none">
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
                      className={`w-32 px-4 py-3 bg-white border rounded-xl focus:outline-none transition-all ${captchaError ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#1A73E8]'}`}
                      placeholder="Kết quả"
                    />
                  </div>
                  {captchaError && <p className="text-sm text-red-500 mt-1">Kết quả không chính xác, vui lòng thử lại!</p>}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-[#1557B0] transition-colors shadow-lg shadow-blue-500/30"
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
            <div className="bg-white px-6 py-4 rounded-xl shadow-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#2D3436]">Thành công!</h4>
                <p className="text-sm text-gray-500">{notification.message}</p>
              </div>
              <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Calendar dates for current month
  const currentMonth = new Date(2026, 1); // February 2026
  const daysInMonth = new Date(2026, 2, 0).getDate();
  const firstDayOfMonth = new Date(2026, 1, 1).getDay();

  const eventDates = mockEvents.map((event) => parseInt(event.date.split('/')[0]));

  return (
    <div className="min-h-screen bg-[#F5F6FA] pt-16">
      {/* Featured Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600"
          alt="Featured event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12">
            <span className="inline-block px-4 py-2 bg-[#1A73E8] text-white rounded-full mb-4">
              Sự kiện nổi bật
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              VinFast VF7 Test Drive Tour 2026
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Trải nghiệm lái thử VF7 cùng đội ngũ chuyên gia và nhận nhiều ưu đãi hấp dẫn
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#1A73E8] rounded-full font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              <span>Đăng ký tham gia</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Bar & Search */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${selectedFilter === 'all'
                    ? 'bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedFilter('news')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${selectedFilter === 'news'
                    ? 'bg-[#00D2D3] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Tin tức
                </button>
                <button
                  onClick={() => setSelectedFilter('event')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${selectedFilter === 'event'
                    ? 'bg-[#1A73E8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Sự kiện
                </button>
                <button
                  onClick={() => setSelectedFilter('offline')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${selectedFilter === 'offline'
                    ? 'bg-[#2ECC71] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Offline
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-auto md:min-w-[300px] z-20">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all"
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {suggestions.map(event => (
                      <button
                        key={event.id}
                        onClick={() => {
                          setSearchQuery(event.title);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-0"
                      >
                        <Search className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-[#2D3436] font-medium line-clamp-1">{event.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{event.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Events Grid */}
            <Masonry columnsCount={2} gutter="24px" className="hidden md:block">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getTypeColor(event.type)} rounded-full text-sm font-medium`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </div>
                    {event.type === 'event' && (
                      <div className="absolute top-4 right-4 bg-white rounded-2xl px-3 py-2 text-center shadow-lg">
                        <div className="text-2xl font-bold text-[#1A73E8]">
                          {event.date.split('/')[0]}
                        </div>
                        <div className="text-xs text-gray-600">Tháng 2</div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2D3436] mb-2 group-hover:text-[#1A73E8] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} người tham gia</span>
                        </div>
                      )}
                    </div>
                    {event.type !== 'news' && (
                      <button
                        className={`w-full mt-4 px-6 py-3 rounded-full font-medium transition-all ${event.registered
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white hover:shadow-lg'
                          }`}
                      >
                        {event.registered ? 'Đã đăng ký' : 'Tham gia'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </Masonry>

            {/* Mobile View */}
            <div className="md:hidden space-y-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getTypeColor(event.type)} rounded-full text-sm font-medium`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2D3436] mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
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
            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-[#2D3436] mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#1A73E8]" />
                Lịch sự kiện
              </h3>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-[#2D3436]">Tháng 2, 2026</div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500 mb-2">
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
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm ${hasEvent
                        ? 'bg-[#1A73E8] text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                        } cursor-pointer transition-colors`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-[#1A73E8] rounded-full" />
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
