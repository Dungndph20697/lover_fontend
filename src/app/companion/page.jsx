import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Star, MapPin, Heart } from "lucide-react";
import { Link } from "react-router";
import AppLayout from "@/components/AppLayout";

export default function CompanionPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedInterest, setSelectedInterest] = useState("");

    const companions = [
        {
            id: 1,
            name: "Minh Anh",
            age: 25,
            location: "Hà Nội",
            interests: ["Cafe", "Du lịch", "Đọc sách"],
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop",
            rating: 4.8,
            reviews: 127,
            bio: "Tôi yêu thích khám phá những quán cafe mới và đọc sách vào cuối tuần."
        },
        {
            id: 2,
            name: "Thu Hương",
            age: 28,
            location: "HCM",
            interests: ["Âm nhạc", "Ẩm thực", "Phim ảnh"],
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
            rating: 4.9,
            reviews: 203,
            bio: "Đam mê âm nhạc và khám phá ẩm thực từ khắp nơi trên thế giới."
        },
        {
            id: 3,
            name: "Khánh Linh",
            age: 26,
            location: "Đà Nẵng",
            interests: ["Yoga", "Thiên nhiên", "Nhiếp ảnh"],
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop",
            rating: 4.7,
            reviews: 89,
            bio: "Tôi tập yoga mỗi sáng và thích chụp ảnh thiên nhiên vào những chuyến du lịch."
        },
        {
            id: 4,
            name: "Phương Mai",
            age: 24,
            location: "Hà Nội",
            interests: ["Shopping", "Làm đẹp", "Du lịch"],
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            rating: 4.6,
            reviews: 156,
            bio: "Yêu thích mua sắm và khám phá những địa điểm du lịch thú vị."
        },
        {
            id: 5,
            name: "Thanh Nga",
            age: 29,
            location: "HCM",
            interests: ["Gym", "Nấu ăn", "Đọc sách"],
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&auto=format&auto=format",
            rating: 4.9,
            reviews: 234,
            bio: "Tập gym đều đặn và thích nấu những món ăn healthy cho bản thân."
        },
        {
            id: 6,
            name: "Bảo An",
            age: 27,
            location: "Đà Nẵng",
            interests: ["Bóng đá", "Game", "Công nghệ"],
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            rating: 4.5,
            reviews: 178,
            bio: "Đam mê bóng đá và công nghệ, thích chơi game vào thời gian rảnh."
        }
    ];

    const locations = ["Tất cả", "Hà Nội", "HCM", "Đà Nẵng"];
    const interests = ["Tất cả", "Cafe", "Du lịch", "Âm nhạc", "Ẩm thực", "Yoga", "Shopping", "Gym", "Game"];

    const filteredCompanions = companions.filter(companion => {
        const matchesSearch = companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            companion.bio.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = !selectedLocation || selectedLocation === "Tất cả" || companion.location === selectedLocation;
        const matchesInterest = !selectedInterest || selectedInterest === "Tất cả" ||
            companion.interests.some(interest => interest === selectedInterest);

        return matchesSearch && matchesLocation && matchesInterest;
    });

    return (
        <AppLayout>
            <div className="min-vh-100 bg-body-tertiary">
                {/* Hero Header */}
                <div className="hero-gradient-bg position-relative overflow-hidden">
                    <div className="hero-overlay"></div>
                    <div className="container position-relative">
                        <div className="row align-items-center justify-content-center min-vh-50">
                            <div className="col-lg-8 text-center py-5">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="mb-4"
                                >
                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                        <div className="hero-icon-bg me-3">
                                            <Heart className="text-white" style={{ width: '3rem', height: '3rem' }} fill="currentColor" />
                                        </div>
                                        <h1 className="display-2 fw-bold text-white mb-0 hero-title">
                                            Khám phá Companion
                                        </h1>
                                    </div>
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="fs-4 text-white-75 mb-4 hero-subtitle"
                                >
                                    Tìm kiếm và kết nối với những companion tuyệt vời phù hợp với bạn
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="d-flex flex-wrap justify-content-center gap-3 mb-4"
                                >
                                    <div className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill fs-6">
                                        <Star className="me-1" style={{ width: '1rem', height: '1rem' }} fill="currentColor" />
                                        {filteredCompanions.length} Companion
                                    </div>
                                    <div className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill fs-6">
                                        <MapPin className="me-1" style={{ width: '1rem', height: '1rem' }} />
                                        Toàn quốc
                                    </div>
                                    <div className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill fs-6">
                                        <Heart className="me-1" style={{ width: '1rem', height: '1rem' }} fill="currentColor" />
                                        Tin cậy
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="hero-floating-elements">
                            <div className="floating-shape floating-shape-1"></div>
                            <div className="floating-shape floating-shape-2"></div>
                            <div className="floating-shape floating-shape-3"></div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="container position-relative" style={{ zIndex: 10, marginTop: '-4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="glass-card p-4 shadow-lg"
                    >
                        <div className="row g-4">
                            {/* Search */}
                            <div className="col-md-4">
                                <div className="position-relative">
                                    <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ width: '1.25rem', height: '1.25rem' }} />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm companion..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="form-control-custom ps-5 filter-input"
                                    />
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="col-md-4">
                                <div className="position-relative">
                                    <MapPin className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ width: '1.25rem', height: '1.25rem' }} />
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="form-control-custom ps-5 filter-input"
                                    >
                                        <option value="">Chọn địa điểm</option>
                                        {locations.map(location => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Interest Filter */}
                            <div className="col-md-4">
                                <div className="position-relative">
                                    <Filter className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ width: '1.25rem', height: '1.25rem' }} />
                                    <select
                                        value={selectedInterest}
                                        onChange={(e) => setSelectedInterest(e.target.value)}
                                        className="form-control-custom ps-5 filter-input"
                                    >
                                        <option value="">Chọn sở thích</option>
                                        {interests.map(interest => (
                                            <option key={interest} value={interest}>{interest}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Results */}
                <div className="container py-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="d-flex align-items-center justify-content-between mb-4"
                    >
                        <div>
                            <h2 className="h4 fw-bold text-dark mb-1">Kết quả tìm kiếm</h2>
                            <p className="text-muted mb-0">
                                Tìm thấy <span className="text-primary fw-semibold">{filteredCompanions.length}</span> companion phù hợp
                            </p>
                        </div>
                        {filteredCompanions.length > 0 && (
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-primary rounded-pill">
                                    <Filter style={{ width: '1rem', height: '1rem' }} className="me-1" />
                                    Lọc
                                </button>
                            </div>
                        )}
                    </motion.div>

                    <div className="row g-4">
                        {filteredCompanions.map((companion, index) => (
                            <div key={companion.id} className="col-lg-4 col-md-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card overflow-hidden h-100 companion-card"
                                >
                                    <div className="position-relative">
                                        <img
                                            src={companion.image}
                                            alt={companion.name}
                                            className="card-img-top companion-image"
                                            style={{ height: '20rem', objectFit: 'cover' }}
                                        />

                                        {/* Favorite Button */}
                                        <button className="btn btn-outline-light position-absolute top-0 end-0 m-3 rounded-circle p-2 favorite-btn">
                                            <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                                        </button>

                                        {/* Rating */}
                                        <div className="position-absolute bottom-0 start-0 m-3 bg-light bg-opacity-90 px-3 py-1 rounded-pill d-flex align-items-center">
                                            <Star className="text-warning me-1" style={{ width: '1rem', height: '1rem' }} fill="currentColor" />
                                            <span className="fw-semibold small me-1">{companion.rating}</span>
                                            <span className="text-muted small">({companion.reviews})</span>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="mb-3">
                                            <h5 className="card-title fw-semibold mb-1">
                                                {companion.name}, {companion.age}
                                            </h5>
                                            <div className="d-flex align-items-center text-muted">
                                                <MapPin className="me-1" style={{ width: '1rem', height: '1rem' }} />
                                                <span className="small">{companion.location}</span>
                                            </div>
                                        </div>

                                        <p className="card-text text-muted small mb-3" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {companion.bio}
                                        </p>

                                        <div className="mb-3">
                                            <div className="d-flex flex-wrap gap-2">
                                                {companion.interests.slice(0, 3).map((interest, i) => (
                                                    <span
                                                        key={i}
                                                        className="badge rounded-pill"
                                                        style={{
                                                            backgroundColor: 'var(--bs-pink-100)',
                                                            color: 'var(--bs-pink-600)'
                                                        }}
                                                    >
                                                        {interest}
                                                    </span>
                                                ))}
                                                {companion.interests.length > 3 && (
                                                    <span className="badge bg-secondary rounded-pill">
                                                        +{companion.interests.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <Link
                                            to={`/companion/${companion.id}`}
                                            className="btn btn-gradient-primary w-100"
                                        >
                                            Xem hồ sơ
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {filteredCompanions.length === 0 && (
                        <div className="text-center py-5">
                            <div className="text-muted">
                                <Heart className="mx-auto mb-4 opacity-50" style={{ width: '4rem', height: '4rem' }} />
                                <h3 className="fs-4 fw-semibold mb-2">Không tìm thấy companion phù hợp</h3>
                                <p>Hãy thử thay đổi bộ lọc để tìm kiếm companion khác</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
