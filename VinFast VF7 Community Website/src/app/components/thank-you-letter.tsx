
import { X, Heart } from 'lucide-react';

interface ThankYouLetterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ThankYouLetter({ isOpen, onClose }: ThankYouLetterProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Letter Modal */}
            <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] p-6 text-white text-center rounded-t-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Thư ngỏ từ người sáng lập</h2>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-6 text-gray-700 leading-relaxed text-lg">
                    <p>
                        Trước hết, tôi xin chân thành cảm ơn bạn đã ghé thăm website và quan tâm đến cộng đồng VinFast VF7.
                        Sự hiện diện của bạn là động lực để chúng tôi không ngừng hoàn thiện và phát triển. Website này được
                        xây dựng như một không gian kết nối những người yêu VF7, với slogan <strong className="text-[#1A73E8]">“Kết nối hành trình xanh – Lan tỏa giá trị bền vững”</strong>,
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

                    <div className="pt-6 border-t border-gray-100 text-center">
                        <p className="font-medium text-[#2D3436] italic">
                            Xin chân thành cảm ơn bạn đã đồng hành và ủng hộ cộng đồng VinFast VF7.
                        </p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-gray-50 rounded-b-3xl text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        Đóng thư
                    </button>
                </div>
            </div>
        </div>
    );
}
