import { useNavigate } from 'react-router';
import { Battery, Users, Bot, Map, ChevronRight, Zap, Wrench, Coffee } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { CommunityBenefitsSection } from '@/app/components/community-benefits-section';
import { AchievementsTestimonialsSection } from '@/app/components/achievements-testimonials-section';
import { FoundingMembersSection } from '@/app/components/founding-members-section';
import { ThankYouLetter } from '@/app/components/thank-you-letter';
import { FadeIn } from '@/app/components/ui/fade-in';

export function HomePage() {
  const navigate = useNavigate();
  const [showLetter, setShowLetter] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  const highlights = [
    {
      id: 1,
      title: 'Hành trình xuyên Việt cùng VF7',
      tag: 'Kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1727802329382-b9f080571270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwcm9hZCUyMHRyYXZlbHxlbnwxfHx8fDE3Njk4NzczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Tips sạc nhanh tiết kiệm',
      tag: 'Hướng dẫn',
      image: 'https://images.unsplash.com/photo-1761320142429-0672277fc080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMG1vZGVybiUyMGJsdWV8ZW58MXx8fHwxNzY5ODc3MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Offline meet-up Hà Nội',
      tag: 'Sự kiện',
      image: 'https://images.unsplash.com/photo-1762158008280-3dcb1d1cbd99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGNvbW11bml0eXxlbnwxfHx8fDE3Njk4NzczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const partners = [
    'VinFast', 'EVN', 'Petrolimex', 'VinMart', 'GreenFeed', 'ABC Charging'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#1e1b4b]/60 to-[#0f172a]/90 z-[1]" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Futuristic Technology"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Liquid Blobs Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] z-[2] pointer-events-none opacity-60">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
        </div>

        {/* Glass Card Content */}
        <div className="relative z-10 px-4 w-full max-w-5xl mx-auto">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-[2.5rem] pt-8 px-8 pb-12 md:pt-16 md:px-16 md:pb-24 text-center transform transition-all duration-700 animate-breathe">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] pb-2 leading-tight">
              Cộng đồng VinFast VF7
            </h1>
            <p className="text-lg md:text-2xl mb-10 text-blue-100/90 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              Kết nối hành trình xanh – Lan tỏa giá trị bền vững
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate('/community')}
                className="px-10 py-4 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(0,210,211,0.5)] transition-all transform hover:scale-105 active:scale-95"
              >
                Tham gia ngay
              </button>
              <button
                onClick={() => navigate('/map')}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all transform hover:scale-105 active:scale-95"
              >
                Khám phá bản đồ
              </button>
            </div>

            {/* Why this community link */}
            <div className="mt-12">
              <button
                onClick={() => setShowLetter(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-200/30 bg-white/5 backdrop-blur-sm text-blue-100 transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] text-sm font-medium tracking-wider uppercase"
              >
                <span>Hành trình khởi nguồn🌱</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ThankYouLetter isOpen={showLetter} onClose={() => setShowLetter(false)} />

      {/* User Benefits - Slide Left */}
      {/* <section className="py-20 px-4 bg-white overflow-hidden">
        <FadeIn direction="left" duration={1500} className="w-full">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <FadeIn key={index} delay={index * 300 + 750} duration={1200}>
                  <div
                    className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 h-full"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#2D3436]">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section> */}

      {/* Community Benefits Section - Slide Right */}
      <FadeIn direction="right" duration={1500} className="w-full">
        <CommunityBenefitsSection />
      </FadeIn>

      {/* Counter Stats - Slide Left */}


      {/* Achievements & Testimonials Section - Slide Right */}
      <FadeIn direction="right" duration={1500} className="w-full">
        <AchievementsTestimonialsSection />
      </FadeIn>

      {/* Map Preview - Internal Layout (Already Animated) */}
      <section className="py-20 px-4 bg-[#F5F6FA] overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" duration={2250} className="h-full flex flex-col justify-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-[#2D3436]">
                  Bản đồ dịch vụ toàn diện
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Tìm kiếm trạm sạc, gara bảo dưỡng, và điểm hẹn cộng đồng gần bạn nhất.
                  Cập nhật liên tục với thông tin chi tiết và đánh giá từ người dùng thực tế.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-[#2ECC71]" />
                    <span className="text-gray-700">450+ trạm sạc khắp Việt Nam</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wrench className="w-6 h-6 text-[#1A73E8]" />
                    <span className="text-gray-700">200+ gara ủy quyền</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Coffee className="w-6 h-6 text-[#00D2D3]" />
                    <span className="text-gray-700">150+ điểm hẹn cộng đồng</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/map')}
                  className="px-8 py-4 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full font-semibold hover:shadow-xl transition-all inline-flex items-center space-x-2"
                >
                  <span>Xem bản đồ đầy đủ</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={300} duration={2250}>
              <div className="relative">
                <div className="aspect-square bg-gray-300 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/map')}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                    alt="Map preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A73E8]/80 to-transparent flex items-end justify-center p-8">
                    <span className="text-white font-semibold text-lg">Nhấn để khám phá →</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Highlights - Slide Right */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <FadeIn direction="right" duration={1500} className="w-full">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#2D3436]">Những tin tức và sự kiện được cập nhật liên tục </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                    }`}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className={`w-full object-cover ${index === 0 ? 'h-[500px]' : 'h-64'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 group-hover:from-black/90 transition-all">
                    <span className="inline-block px-3 py-1 bg-[#1A73E8] text-white text-sm rounded-full mb-3 w-fit">
                      {item.tag}
                    </span>
                    <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* AI Assistant Preview - Slide Left */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5F6FA] to-white overflow-hidden">
        <FadeIn direction="left" duration={1500} className="w-full">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-2xl mb-4">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[#2D3436]">Trợ lý AI thông minh</h2>
                <p className="text-gray-600">Hỏi đáp mọi thắc mắc về VF7 của bạn</p>
              </div>

              {/* Sample Chat */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-end">
                  <div className="bg-[#1A73E8] text-white px-6 py-3 rounded-3xl rounded-tr-sm max-w-xs">
                    Làm sao để tối ưu quãng đường di chuyển?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-3xl rounded-tl-sm max-w-md">
                    <p className="mb-2">Để tối ưu quãng đường với VF7, bạn nên:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sử dụng chế độ Eco khi đi trong thành phố</li>
                      <li>Duy trì tốc độ đều, tránh tăng tốc đột ngột</li>
                      <li>Tận dụng phanh tái sinh năng lượng</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#1A73E8] transition-colors"
                />
                <button
                  onClick={() => navigate('/community')}
                  className="px-8 py-4 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Hỏi ngay
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Founding Members Section - Slide Right */}
      <FadeIn direction="right" duration={1500} className="w-full">
        <FoundingMembersSection />
      </FadeIn>

      {/* Partners - Slide Left */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <FadeIn direction="left" duration={1500} className="w-full">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#2D3436]">Đối tác của chúng tôi</h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="px-8 py-4 text-2xl font-bold text-gray-400 hover:text-[#1A73E8] transition-colors cursor-pointer hover:scale-110 duration-300"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA - Slide Up */}
      <section className="relative py-32 px-4 overflow-hidden">
        <FadeIn direction="up" duration={1500} className="w-full h-full absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D3436] to-[#1A73E8]">
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
          <p className="text-xl mb-8 opacity-90">
            Tham gia ngay để nhận thông tin mới nhất và kết nối với cộng đồng
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-white text-[#1A73E8] rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-block animate-pulse-glow"
          >
            Đăng ký thành viên
          </a>
        </FadeIn>
      </section>
    </div>
  );
}