import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";

export default function Footer({ darkMode }) {
    return (
        <footer className={`border-top ${darkMode ? "bg-dark border-secondary" : "bg-white border-light"}`}>
            <div className="container py-5">
                <div className="row g-4">
                    {/* Brand */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="mb-3">
                            <Heart className="me-2" style={{ width: '2rem', height: '2rem', color: '#e91e63' }} fill="currentColor" />
                            <span className={`h5 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                                Love Companion
                            </span>
                        </div>
                        <p className={`small ${darkMode ? "text-secondary" : "text-muted"}`}>
                            Nền tảng kết nối những trái tim cô đơn, tìm kiếm tình yêu đích thực và những mối quan hệ ý nghĩa.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className={`fw-semibold mb-3 ${darkMode ? "text-white" : "text-dark"}`}>
                            Liên kết nhanh
                        </h5>
                        <div className="d-flex flex-column gap-2">
                            <Link
                                to="/"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Trang chủ
                            </Link>
                            <Link
                                to="/companion"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Khám phá Companion
                            </Link>
                            <Link
                                to="/companion-register"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Đăng ký làm Companion
                            </Link>
                            <Link
                                to="/about"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Về chúng tôi
                            </Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className={`fw-semibold mb-3 ${darkMode ? "text-white" : "text-dark"}`}>
                            Hỗ trợ
                        </h5>
                        <div className="d-flex flex-column gap-2">
                            <Link
                                to="/help"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Trung tâm trợ giúp
                            </Link>
                            <Link
                                to="/safety"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                An toàn & Bảo mật
                            </Link>
                            <Link
                                to="/terms"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Điều khoản dịch vụ
                            </Link>
                            <Link
                                to="/privacy"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Chính sách bảo mật
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className={`fw-semibold mb-3 ${darkMode ? "text-white" : "text-dark"}`}>
                            Liên hệ
                        </h5>
                        <div className="d-flex flex-column gap-2">
                            <div className={`d-flex align-items-center small ${darkMode ? "text-secondary" : "text-muted"}`}>
                                <Mail className="me-2" style={{ width: '1rem', height: '1rem' }} />
                                <span>support@lovecompanion.com</span>
                            </div>
                            <div className={`d-flex align-items-center small ${darkMode ? "text-secondary" : "text-muted"}`}>
                                <Phone className="me-2" style={{ width: '1rem', height: '1rem' }} />
                                <span>+84 123 456 789</span>
                            </div>
                            <div className={`d-flex align-items-center small ${darkMode ? "text-secondary" : "text-muted"}`}>
                                <MapPin className="me-2" style={{ width: '1rem', height: '1rem' }} />
                                <span>Hồ Chí Minh, Việt Nam</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className={`mt-5 pt-4 border-top ${darkMode ? "border-secondary" : "border-light"}`}>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <p className={`small mb-3 mb-md-0 ${darkMode ? "text-secondary" : "text-muted"}`}>
                            © 2024 Love Companion. Tất cả quyền được bảo lưu.
                        </p>
                        <div className="d-flex align-items-center gap-3">
                            <Link
                                to="/terms"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Điều khoản
                            </Link>
                            <Link
                                to="/privacy"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Bảo mật
                            </Link>
                            <Link
                                to="/cookies"
                                className={`text-decoration-none small ${darkMode ? "text-secondary" : "text-muted"}`}
                                style={{ transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#e91e63'}
                                onMouseLeave={(e) => e.target.style.color = darkMode ? '#6c757d' : '#6c757d'}
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
