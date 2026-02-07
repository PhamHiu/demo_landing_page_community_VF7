
import { X, Heart, Star } from 'lucide-react';

interface ThankYouLetterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ThankYouLetter({ isOpen, onClose }: ThankYouLetterProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop with noise texture overlay */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-700"
                onClick={onClose}
            />

            {/* Letter Modal - Luxury Card Style */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 ease-out perspective-1000 group">

                {/* Gold Glow Behind */}
                <div className="absolute inset-0 bg-[#D4AF37] blur-[100px] opacity-20 rounded-full pointer-events-none transform scale-75 group-hover:scale-100 transition-transform duration-1000" />

                <div
                    className="relative bg-[#050505] border border-[#D4AF37]/30 rounded-lg shadow-2xl overflow-hidden"
                    style={{
                        boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.9)',
                        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05), transparent 70%)'
                    }}
                >
                    {/* Decorative Corner borders */}
                    <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#D4AF37]/50 rounded-tl-lg pointer-events-none" />
                    <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#D4AF37]/50 rounded-tr-lg pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-[#D4AF37]/50 rounded-bl-lg pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#D4AF37]/50 rounded-br-lg pointer-events-none" />

                    {/* Close Button - Minimalist */}
                    <div className="absolute top-6 right-6 z-20">
                        <button
                            onClick={onClose}
                            className="text-[#666] hover:text-[#D4AF37] transition-colors transform hover:rotate-90 duration-300"
                        >
                            <X className="w-6 h-6 stroke-[1.5]" />
                        </button>
                    </div>

                    {/* Content Container */}
                    <div className="p-12 md:p-16 text-center space-y-10 relative z-10">

                        {/* Header Icons */}
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-20 rounded-full" />
                                <Heart className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37]/10 stroke-[1.5] relative z-10 animate-pulse" />
                            </div>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                        </div>

                        {/* Title using Sans-Serif Font with Elegance */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide leading-tight drop-shadow-md uppercase">
                            Thư ngỏ <span className="text-[#D4AF37] font-light">từ người sáng lập</span>
                        </h2>

                        {/* Body Text - Justified Alignment */}
                        <div className="space-y-6 text-[#E0E0E0] leading-loose text-lg text-justify font-light opacity-90">
                            <p>
                                Trước hết, tôi xin chân thành cảm ơn bạn đã ghé thăm website và quan tâm đến cộng đồng VinFast VF7.
                                Sự hiện diện của bạn là động lực để chúng tôi không ngừng hoàn thiện và phát triển. Website này được
                                xây dựng như một không gian kết nối những người yêu VF7, với slogan <strong className="text-[#D4AF37] uppercase font-bold">“Kết nối hành trình xanh – Lan tỏa giá trị bền vững”</strong>,
                                nơi chia sẻ trải nghiệm, kiến thức và các công cụ hữu ích xoay quanh xe điện và lối sống tích cực.
                            </p>

                            <p>
                                Trên mỗi hành trình, người dùng VF7 không chỉ cần trạm sạc mà còn cần những địa điểm chờ thuận tiện
                                như quán ăn, nhà nghỉ hay các dịch vụ thiết yếu, cũng như sự hỗ trợ kịp thời khi xảy ra những sự cố
                                bất ngờ. Website cung cấp bản đồ được tùy biến theo nhu cầu cộng đồng, hiển thị các điểm đã được xác
                                thực, đồng thời tạo không gian trao đổi kinh nghiệm và hỗ trợ hỏi – đáp nhanh, giúp tiết kiệm thời gian
                                và tăng sự an tâm khi di chuyển.
                            </p>

                            <p>
                                Tầm nhìn của chúng tôi là xây dựng một cộng đồng VF7 lấy môi trường xanh làm giá trị cốt lõi, thúc đẩy
                                giao thông bền vững và ứng dụng công nghệ theo hướng thiết thực, phục vụ cộng đồng. Với vai trò là người
                                khởi xướng, tôi mong muốn góp một phần nhỏ vào việc hình thành một cộng đồng VF7 văn minh, vững mạnh,
                                mang lại giá trị ý nghĩa cho người dùng và cho xã hội.
                            </p>
                        </div>

                        {/* Signature Section */}
                        <div className="pt-10 space-y-4">
                            <style>
                                {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
                            </style>
                            <div className="w-16 h-1 mx-auto bg-[#D4AF37] rounded-full opacity-70" />
                            <p className="text-lg text-[#D4AF37] italic">
                                Xin chân thành cảm ơn bạn đã đồng hành và ủng hộ cộng đồng VinFast VF7.
                            </p>
                            <p className="text-4xl md:text-6xl text-white font-normal tracking-wide opacity-90" style={{ fontFamily: 'Great Vibes, cursive' }}>
                                Admin Team
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="pt-8">
                            <button
                                onClick={onClose}
                                className="px-10 py-3 border border-[#D4AF37]/30 text-[#D4AF37] text-sm uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 ease-out"
                            >
                                Đóng thư này
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
