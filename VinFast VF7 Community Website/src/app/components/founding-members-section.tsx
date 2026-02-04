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
      description: 'Chuyên gia công nghệ xe điện với 10 năm kinh nghiệm trong ngành ô tô. Đam mê xây dựng cộng đồng VF7.',
      icon: Crown,
      color: 'from-[#FFD700] to-[#FFA500]',
    },
    {
      id: 2,
      name: 'Trần Thị Mai',
      role: 'Co-founder',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      description: 'Chuyên viên marketing và quản lý cộng đồng. Đã tổ chức hơn 50 sự kiện offline cho các CLB xe.',
      icon: Star,
      color: 'from-[#1A73E8] to-[#00D2D3]',
    },
    {
      id: 3,
      name: 'Lê Văn Đức',
      role: 'Technical Lead',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
      description: 'Kỹ sư phần mềm phát triển nền tảng website và AI chatbot. Tập trung vào trải nghiệm người dùng.',
      icon: Shield,
      color: 'from-[#2ECC71] to-[#1A73E8]',
    },
    {
      id: 4,
      name: 'Phạm Hồng Nhung',
      role: 'Community Manager',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
      description: 'Quản lý nội dung và tương tác cộng đồng hàng ngày. Hỗ trợ thành viên và điều phối sự kiện.',
      icon: Star,
      color: 'from-[#8B5CF6] to-[#00D2D3]',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white to-[#F5F6FA]">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2D3436]">
            Ban sáng lập
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ đam mê và tâm huyết xây dựng cộng đồng VF7 mạnh mẽ nhất Việt Nam
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`group relative transform transition-all duration-500 h-full ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                {/* Avatar Section */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Role Badge */}
                  <div className={`absolute top-4 right-4 flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r ${member.color} rounded-full shadow-lg`}>
                    <member.icon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-semibold">{member.role}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#2D3436] group-hover:text-[#1A73E8] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {member.description}
                  </p>

                  {/* Contact Icons */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 mt-auto">
                    <button
                      className="p-2 rounded-full bg-gray-100 hover:bg-[#1A73E8] text-gray-600 hover:text-white transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-gray-100 hover:bg-[#00D2D3] text-gray-600 hover:text-white transition-all duration-300"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A73E8] via-[#00D2D3] to-[#2ECC71] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#1A73E8]/10 to-[#00D2D3]/10 rounded-full border border-[#1A73E8]/20">
            <p className="text-gray-600">
              <span className="font-semibold text-[#1A73E8]">Cộng đồng VF7</span> được điều hành bởi đội ngũ tình nguyện, vì đam mê và yêu xe điện 🚗⚡
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
