import { motion } from "motion/react";
import { Heart, Users, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="gradient-bg">
      {/* Hero Section */}
      <div className="container hero-container">
        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="col-lg-10 text-center">
            <div className="d-flex align-items-center justify-content-center mb-4">
              <Heart className="me-3 text-purple" style={{ width: '4rem', height: '4rem' }} />
              <h1 className="hero-title gradient-text mb-0">
                Love Companion
              </h1>
            </div>

            <h2 className="hero-subtitle">
              Kết Nối Những Người Bạn Đồng Hành
            </h2>

            <p className="hero-description">
              Tìm kiếm và kết nối với những người bạn đồng hành tuyệt vời.
              Chia sẻ những khoảnh khắc đặc biệt và tạo nên những kỷ niệm khó quên.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <motion.a
                href="/login"
                className="btn btn-gradient-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Bắt Đầu Ngay
              </motion.a>

              <motion.a
                href="/companion"
                className="btn btn-outline-gradient btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Khám Phá Companion
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="row g-4 mt-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3 className="h5 fw-semibold text-gray-800 mb-3">
                Kết Nối Dễ Dàng
              </h3>
              <p className="text-muted">
                Tìm kiếm và kết nối với những người có cùng sở thích và mong muốn
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3 className="h5 fw-semibold text-gray-800 mb-3">
                An Toàn Bảo Mật
              </h3>
              <p className="text-muted">
                Hệ thống xác thực nghiêm ngặt đảm bảo an toàn cho mọi người dùng
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mx-auto">
            <div className="feature-card">
              <Sparkles className="feature-icon" />
              <h3 className="h5 fw-semibold text-gray-800 mb-3">
                Trải Nghiệm Tuyệt Vời
              </h3>
              <p className="text-muted">
                Giao diện hiện đại, dễ sử dụng với những tính năng thông minh
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}