import { Linkedin, Mail, Shield, Crown, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function FoundingMembersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const members = [
    {
      id: 1,
      name: 'Nguyễn Hoàng Minh',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
      description: 'Chuyên gia công nghệ xe điện, người tiên phong xây dựng cộng đồng VF7.',
      icon: Crown,
      color: 'from-[#D4AF37] to-[#FFA500]',
    },
    {
      id: 2,
      name: 'Trần Thị Mai',
      role: 'Co-founder',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      description: 'Chuyên viên marketing & sự kiện, linh hồn của các buổi offline.',
      icon: Star,
      color: 'from-[#C0C0C0] to-[#E6E6E6]',
    },
    {
      id: 3,
      name: 'Lê Văn Đức',
      role: 'Tech Lead',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
      description: 'Kỹ sư phát triển nền tảng, đảm bảo trải nghiệm số mượt mà.',
      icon: Shield,
      color: 'from-[#CD7F32] to-[#B87333]',
    },
    {
      id: 4,
      name: 'Phạm Hồng Nhung',
      role: 'Manager',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
      description: 'Quản lý cộng đồng, cầu nối hỗ trợ thành viên hàng ngày.',
      icon: Star,
      color: 'from-[#D61C2B] to-[#FF4D4D]',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#0F0F0F] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#1C1C1C] via-[#0F0F0F] to-transparent opacity-60 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header - Metallic Style */}
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-2 relative z-10">
              <span className="text-white">Ban</span> <span className="text-gradient-gold">Sáng Lập</span>
            </h2>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#D4AF37]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />
          </div>
          <p className="text-lg text-[#A3A3A3] max-w-4xl mx-auto mt-6">
            Đội ngũ đam mê và tâm huyết xây dựng cộng đồng VF7 mạnh mẽ nhất Việt Nam
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card Container with Angular Clip Path */}
              <div className="relative h-full group-hover:-translate-y-2 transition-transform duration-300">

                {/* Border Gradient (Now Running Animation) */}
                <div className="relative h-full running-border-on-hover p-[2px]"
                  style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>

                  {/* Content Inner */}
                  <div className="h-full bg-[#262626] hover:bg-[#2A2A2A] transition-colors relative overflow-hidden flex flex-col items-center pt-8 pb-6 px-4 text-center"
                    style={{ clipPath: 'polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)' }}>

                    {/* Golden Ring Avatar */}
                    <div className="relative w-32 h-32 mb-6">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${member.color} blur opacity-40 group-hover:opacity-70 transition-opacity`} />
                      <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors p-1">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover transition-all duration-500"
                        />
                      </div>
                      {/* Role Icon Badge */}
                      <div className="absolute -bottom-2 -right-2 bg-[#1A1A1A] border border-[#D4AF37] p-2 rounded-full shadow-lg">
                        <member.icon className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
                      {member.name}
                    </h3>
                    <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                      {member.role}
                    </p>

                    <div className="w-8 h-0.5 bg-[#333] mb-4 group-hover:w-16 group-hover:bg-[#D4AF37] transition-all duration-300" />

                    <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Social Buttons */}
                    <div className="flex gap-4 mt-auto opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="text-white hover:text-[#00F0FF] transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button className="text-white hover:text-[#D61C2B] transition-colors">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-3 bg-[#1A1A1A] border border-[#333] text-[#A3A3A3] text-sm"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
            <span className="text-[#D4AF37] font-bold">Cộng đồng VF7</span> hoạt động phi lợi nhuận & vì đam mê
          </div>
        </div>
      </div>
    </section>
  );
}
