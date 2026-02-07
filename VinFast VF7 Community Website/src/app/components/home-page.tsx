import { useNavigate } from 'react-router';
import { Battery, Users, Bot, Map, ChevronRight, ChevronLeft, Zap, Wrench, Coffee } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { CommunityBenefitsSection } from '@/app/components/community-benefits-section';
import { AchievementsTestimonialsSection } from '@/app/components/achievements-testimonials-section';
import { FoundingMembersSection } from '@/app/components/founding-members-section';
import { ThankYouLetter } from '@/app/components/thank-you-letter';
import { FadeIn } from '@/app/components/ui/fade-in';
import { ChatbotCar } from './chatbot-car';

export function HomePage() {
  const navigate = useNavigate();
  const [showLetter, setShowLetter] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Carousel Slides
  const heroSlides = [
    {
      image: '/vinfast-vf-7-gray.jpg',
      alt: 'VF7 Grey Sport'
    },
    {
      image: '/club-vf7.jpg',
      alt: 'VF7 Showroom'
    },
    {
      image: '/cong-dong-vf-7.jpg',
      alt: 'VF7 Community'
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: Map,
      title: 'Tra cứu dịch vụ',
      description: 'Tìm trạm sạc, gara gần nhất',
    },
    {
      icon: Battery,
      title: 'Mẹo dùng xe',
      description: 'Kinh nghiệm từ cộng đồng',
    },
    {
      icon: Bot,
      title: 'AI Support 24/7',
      description: 'Trợ lý thông minh luôn sẵn sàng',
    },
    {
      icon: Users,
      title: 'Kết nối cộng đồng',
      description: 'Gặp gỡ những người cùng đam mê',
    },
  ];

  // Events data matching the reference design
  const events = [
    {
      id: 1,
      title: 'Offline Cafe Cuối Tuần',
      date: '15 Thg 02',
      location: 'Highland Coffee, Hồ Gươm',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Hướng Dẫn Update Phần Mềm',
      date: '22 Thg 02',
      location: 'Online - Zoom Meeting',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Road Trip Sapa',
      date: '01 Thg 03',
      location: 'Khởi hành từ Hà Nội',
      attendees: 28,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Workshop Bảo Dưỡng Xe',
      date: '08 Thg 03',
      location: 'VinFast Showroom, Cầu Giấy',
      attendees: 35,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop',
    },
  ];


  const partners = [
    'VinFast', 'EVN', 'Petrolimex', 'VinMart', 'GreenFeed', 'ABC Charging'
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section with Image Carousel */}
      <section className="relative h-screen overflow-hidden bg-[#0F0F0F] pt-24 md:pt-32">
        {/* Carousel Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <ImageWithFallback
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/70 via-[#0F0F0F]/50 to-[#0F0F0F] z-[1]" />

        {/* Metallic Gold Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#D4AF37] z-[2] opacity-60" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#D4AF37] z-[2] opacity-60" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-[#D4AF37] z-[2] opacity-60" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#D4AF37] z-[2] opacity-60" />

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#1A1A1A]/80 border border-[#D4AF37]/50 text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#1A1A1A]/80 border border-[#D4AF37]/50 text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${index === currentSlide
                ? 'w-8 h-3 bg-[#D61C2B] rounded-full shadow-[0_0_15px_rgba(214,28,43,0.6)]'
                : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/70'
                }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 w-full max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight uppercase text-center">
            Cộng đồng <span className="text-[#D61C2B]">VinFast VF7</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-[#E0E0E0] font-light tracking-wide max-w-3xl mx-auto leading-relaxed text-center drop-shadow-md">
            Kết nối hành trình xanh – Lan tỏa giá trị bền vững
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {/* Primary CTA - Deep Red with Glow */}
            <button
              onClick={() => navigate('/community')}
              className="px-10 py-4 bg-gradient-to-r from-[#8B0000] to-[#D61C2B] text-white font-bold text-lg shadow-[0_0_30px_rgba(139,0,0,0.5)] hover:shadow-[0_0_50px_rgba(214,28,43,0.7)] transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              Tham gia ngay
            </button>
            {/* Secondary CTA - Metallic Border */}
            <button
              onClick={() => navigate('/map')}
              className="px-10 py-4 bg-transparent border-2 border-[#C0C0C0]/60 text-white font-bold text-lg hover:bg-[#C0C0C0]/10 hover:border-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider backdrop-blur-sm"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              Khám phá bản đồ
            </button>
          </div>
        </div>

        {/* Journey Button - Gold */}
        <div className="mt-12 flex justify-center relative z-20">
          <button
            onClick={() => setShowLetter(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/10 text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] font-semibold tracking-wider uppercase"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            <span>🌱 Hành trình khởi nguồn</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <ThankYouLetter isOpen={showLetter} onClose={() => setShowLetter(false)} />

      {/* Community Benefits Section */}
      <FadeIn direction="right" duration={1500} className="w-full">
        <CommunityBenefitsSection />
      </FadeIn>

      {/* Achievements & Testimonials Section */}
      <FadeIn direction="right" duration={1500} className="w-full">
        <AchievementsTestimonialsSection />
      </FadeIn>

      {/* Map Preview - Dark Mode with Cyan Glow */}
      <section className="py-20 px-4 bg-[#0F0F0F] overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" duration={2250} className="h-full flex flex-col justify-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-white">
                  Bản đồ dịch vụ toàn diện
                </h2>
                <p className="text-lg text-[#A3A3A3] mb-8">
                  Tìm kiếm trạm sạc, gara bảo dưỡng, và điểm hẹn cộng đồng gần bạn nhất.
                  Cập nhật liên tục với thông tin chi tiết và đánh giá từ người dùng thực tế.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <span className="text-[#E0E0E0]">450+ trạm sạc khắp Việt Nam</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D61C2B]/20 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-[#D61C2B]" />
                    </div>
                    <span className="text-[#E0E0E0]">200+ gara ủy quyền</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <span className="text-[#E0E0E0]">150+ điểm hẹn cộng đồng</span>
                  </div>
                </div>
                {/* Cyan Ghost Button */}
                <button
                  onClick={() => navigate('/map')}
                  className="px-8 py-4 bg-transparent border-2 border-[#00F0FF] text-[#00F0FF] rounded-full font-semibold hover:bg-[#00F0FF]/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all inline-flex items-center space-x-2"
                >
                  <span>Tìm trạm sạc</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={300} duration={2250}>
              <div className="relative">
                {/* Cyan Glow Border Container */}
                <div className="aspect-square bg-[#1C1C1C] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.15)] border border-[#00F0FF]/30 hover:shadow-[0_0_60px_rgba(0,240,255,0.25)] hover:scale-105 transition-all cursor-pointer" onClick={() => navigate('/map')}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                    alt="Map preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent flex items-end justify-center p-8">
                    <span className="text-[#00F0FF] font-semibold text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                      Nhấn để khám phá
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SỰ KIỆN & TIN TỨC - Metallic Design */}
      <section className="py-24 px-4 bg-[#0F0F0F] overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1A1A1A] to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D61C2B] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />

        <FadeIn direction="up" duration={1500} className="w-full">
          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-16">
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-2">
                  <span className="text-gradient-silver">SỰ KIỆN</span>
                  <span className="text-[#D61C2B] mx-3">&</span>
                  <span className="text-gradient-gold">TIN TỨC</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-[#D61C2B] to-transparent rounded-full" />
              </div>

              <button
                className="hidden md:flex items-center gap-2 text-[#A3A3A3] hover:text-[#D4AF37] transition-colors group uppercase text-sm font-bold tracking-widest"
                onClick={() => navigate('/news')}
              >
                <span>Xem tất cả</span>
                <div className="w-8 h-[1px] bg-[#333] group-hover:bg-[#D4AF37] transition-colors relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-current rotate-45" />
                </div>
              </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group relative h-full transition-all duration-500 hover:-translate-y-2 preserve-3d perspective-1000"
                  style={{ filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' }}
                >
                  {/* Metallic Border Gradient (Now Relative) */}
                  <div className="relative h-full bg-gradient-to-br from-[#444] via-[#222] to-[#444] p-[1px]"
                    style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>

                    {/* Interior Card Content */}
                    <div className="h-full w-full bg-[#151515] hover:bg-[#1A1A1A] transition-colors relative overflow-hidden"
                      style={{ clipPath: 'polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)' }}>

                      {/* Image Area */}
                      <div className="relative h-48 overflow-hidden group-hover:shadow-glow-red transition-shadow duration-500">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent opacity-80" />

                        {/* Date Badge */}
                        <div className="absolute top-0 right-0 p-4">
                          <div className="bg-[#1A1A1A]/90 backdrop-blur border border-[#D61C2B]/30 p-2 text-center min-w-[60px]" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)' }}>
                            <span className="block text-[#D61C2B] font-bold text-lg leading-none">{event.date.split(' ')[0]}</span>
                            <span className="block text-[#A3A3A3] text-[10px] uppercase font-bold tracking-wider mt-1">{event.date.split(' ').slice(1).join(' ')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 relative">
                        <h3 className="text-white font-bold text-lg mb-4 line-clamp-2 group-hover:text-[#D61C2B] transition-colors">{event.title}</h3>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-[#A3A3A3] text-sm group-hover:text-[#E0E0E0] transition-colors">
                            <Map className="w-4 h-4 text-[#D4AF37]" />
                            <span className="truncate">{event.location}</span>
                          </div>

                          <div className="flex items-center gap-3 text-[#A3A3A3] text-sm group-hover:text-[#E0E0E0] transition-colors">
                            <Users className="w-4 h-4 text-[#D4AF37]" />
                            <span>{event.attendees} tham dự</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="absolute bottom-0 left-0 w-full p-6 pt-0 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <button className="w-full py-3 bg-[#D61C2B] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#B31824] transition-colors flex items-center justify-center gap-2"
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                            <span>Đăng ký ngay</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-12 md:hidden text-center">
              <button
                className="px-8 py-3 border border-[#333] text-[#A3A3A3] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all uppercase text-sm font-bold tracking-widest"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                onClick={() => navigate('/news')}
              >
                Xem tất cả
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* AI Assistant Preview - Cyberpunk Gold Style */}
      <section className="py-20 px-4 bg-[#0F0F0F] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 blur-[150px] rounded-full pointer-events-none" />

        <FadeIn direction="left" duration={1500} className="w-full">
          <div className="container mx-auto max-w-4xl">
            <div className="relative bg-[#151515] p-8 md:p-12 border border-[#333] group hover:border-[#D4AF37]/50 transition-colors duration-500"
              style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-60" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] opacity-60" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-60" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] opacity-60" />

              <div className="text-center mb-10 relative z-10">
                {/* Gold Pulse Animation */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-ping opacity-20" />
                  <div className="relative p-4 bg-gradient-to-br from-[#D4AF37] to-[#AA771C] rounded-xl mb-4 shadow-[0_0_30px_rgba(212,175,55,0.4)] transform rotate-45">
                    <Bot className="w-10 h-10 text-[#0F0F0F] -rotate-45" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white uppercase tracking-wider">Trợ lý <span className="text-gradient-gold">AI Thông Minh</span></h2>
                <p className="text-[#A3A3A3]">Hỏi đáp mọi thắc mắc về VF7 của bạn</p>
              </div>

              {/* Sample Chat - Dark Metallic Style */}
              <div className="space-y-6 mb-10 relative z-10">
                {/* User Bubble */}
                <div className="flex justify-end">
                  <div className="bg-[#2E2E2E] text-gray-200 px-6 py-3 border-l-4 border-[#333] max-w-xs shadow-lg"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), 100% 100%, 0 100%, 0 10px)' }}>
                    Làm sao để tối ưu quãng đường di chuyển?
                  </div>
                </div>

                {/* AI Bubble */}
                <div className="flex justify-start">
                  <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#E0E0E0] px-6 py-4 max-w-md relative shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
                    <p className="mb-3 font-medium text-[#D4AF37]">Để tối ưu quãng đường với VF7, bạn nên:</p>
                    <ul className="space-y-2 text-sm text-[#CCCCCC]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">›</span> Sử dụng chế độ Eco khi đi trong thành phố
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">›</span> Duy trì tốc độ đều, tránh tăng tốc đột ngột
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">›</span> Tận dụng phanh tái sinh năng lượng
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-0 relative z-10">
                <input
                  type="text"
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-6 py-4 bg-[#0F0F0F] border border-[#333] border-r-0 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all text-white placeholder-[#555]"
                />
                <button
                  onClick={() => navigate('/community?tab=ai')}
                  className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#0F0F0F] font-bold uppercase tracking-wider hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:bg-[#FFD700] transition-all"
                  style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
                >
                  Hỏi ngay
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Founding Members Section */}
      <FadeIn direction="right" duration={1500} className="w-full">
        <FoundingMembersSection />
      </FadeIn>

      {/* Partners - Grayscale */}
      <section className="py-20 px-4 bg-[#0F0F0F] border-t border-[#2E2E2E] overflow-hidden">
        <FadeIn direction="left" duration={1500} className="w-full">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Đối tác của chúng tôi</h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="px-8 py-4 text-2xl font-bold text-[#A3A3A3] hover:text-white transition-colors cursor-pointer hover:scale-110 duration-300 grayscale hover:grayscale-0"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Final CTA - Red Gradient with Gold Button */}
      <section className="relative py-32 px-4 overflow-hidden">
        <FadeIn direction="up" duration={1500} className="w-full h-full absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#990F1B] via-[#D61C2B] to-[#0F0F0F]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1727802329382-b9f080571270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwcm9hZCUyMHRyYXZlbHxlbnwxfHx8fDE3Njk4NzczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="CTA Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        </FadeIn>

        <FadeIn direction="up" duration={1500} delay={450} className="relative z-10 container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sẵn sàng lăn bánh cùng chúng tôi?
          </h2>
          <p className="text-xl mb-8 text-[#E0E0E0]">
            Tham gia ngay để nhận thông tin mới nhất và kết nối với cộng đồng
          </p>
          {/* Gold Button - Highest Contrast */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-[#D4AF37] text-[#0F0F0F] rounded-full font-bold text-lg shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-105 transition-all transform inline-block"
          >
            Đăng ký thành viên
          </a>
        </FadeIn>
      </section>

      {/* Animated Chatbot Car */}
      <ChatbotCar />
    </div>
  );
}