"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Check,
  Camera,
  Coffee,
  Music,
  Users,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import BookingModal from "@/components/BookingModal";
import AppLayout from "@/components/AppLayout";

export default function CompanionProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock companion data - dynamic based on ID
  const companionDatabase = {
    '1': {
      id: '1',
      name: "Minh Anh",
      age: 25,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 127,
      location: "Hà Nội",
      description: "Tôi yêu thích khám phá những quán cafe mới và đọc sách vào cuối tuần.",
      verified: true,
      online: true,
      interests: ["Cafe", "Du lịch", "Đọc sách"],
    },
    '2': {
      id: '2',
      name: "Thu Hương",
      age: 28,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 203,
      location: "HCM",
      description: "Đam mê âm nhạc và khám phá ẩm thực từ khắp nơi trên thế giới.",
      verified: true,
      online: false,
      interests: ["Âm nhạc", "Ẩm thực", "Phim ảnh"],
    },
    '3': {
      id: '3',
      name: "Khánh Linh",
      age: 26,
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 89,
      location: "Đà Nẵng",
      description: "Tôi tập yoga mỗi sáng và thích chụp ảnh thiên nhiên vào những chuyến du lịch.",
      verified: true,
      online: true,
      interests: ["Yoga", "Thiên nhiên", "Nhiếp ảnh"],
    }
  };

  const currentId = params.id || '1';
  const companion = companionDatabase[currentId] || companionDatabase['1'];

  // Add common data
  const companionData = {
    ...companion,
    services: [
      { name: "Dạo phố", price: 300, icon: MapPin },
      { name: "Xem phim", price: 400, icon: Camera },
      { name: "Café", price: 250, icon: Coffee },
      { name: "Âm nhạc", price: 350, icon: Music },
      { name: "Sự kiện", price: 500, icon: Users },
    ],
    gallery: [
      companion.avatar,
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "Phương Linh",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face",
        rating: 5,
        date: "2024-11-01",
        text: `${companion.name} rất thân thiện và chu đáo. Trải nghiệm tuyệt vời!`,
      },
      {
        id: 2,
        user: "Minh Tuấn",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        rating: 5,
        date: "2024-10-28",
        text: "Dịch vụ tuyệt vời, đúng giờ và rất chuyên nghiệp. Sẽ book lại!",
      },
    ],
  };

  return (
    <AppLayout>
      <div className="min-vh-100 bg-body-tertiary">
        {/* Header Navigation */}
        <div className="position-fixed top-0 w-100 bg-white bg-opacity-90 backdrop-blur border-bottom" style={{ zIndex: 1050 }}>
          <div className="container">
            <div className="d-flex align-items-center justify-content-between py-3">
              <motion.button
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/companion')}
              >
                <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Quay lại</span>
              </motion.button>

              <div className="d-flex align-items-center gap-3">
                <motion.button
                  className={`btn rounded-circle p-2 ${isFavorited ? 'btn-danger' : 'btn-outline-secondary'}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart
                    style={{ width: '1.25rem', height: '1.25rem' }}
                    fill={isFavorited ? 'currentColor' : 'none'}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Photo Section */}
        <div className="position-relative" style={{ marginTop: '76px' }}>
          <div className="position-relative overflow-hidden" style={{ height: '20rem' }}>
            <img
              src={companionData.coverImage}
              alt="Cover"
              className="w-100 h-100 object-fit-cover"
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="container position-relative" style={{ marginTop: '-4rem' }}>
          <div className="row">
            <div className="col-12">
              <div className="glass-card p-4 mb-4">
                <div className="row align-items-end">
                  <div className="col-auto">
                    <motion.div
                      className="position-relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >                            <img
                        src={companionData.avatar}
                        alt={companionData.name}
                        className="rounded-circle object-fit-cover border border-4 border-white shadow-lg"
                        style={{ width: '8rem', height: '8rem' }}
                      />
                      {companionData.online && (
                        <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-4 border-white" style={{ width: '2rem', height: '2rem' }}>
                          <div className="position-absolute top-50 start-50 translate-middle bg-success rounded-circle animate-pulse" style={{ width: '0.75rem', height: '0.75rem' }}></div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <div className="col">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >                            <div className="d-flex align-items-center gap-2 mb-2">
                        <h1 className="h3 fw-bold text-dark mb-0">
                          {companionData.name}, {companionData.age}
                        </h1>
                        {companionData.verified && (
                          <span className="badge bg-primary d-flex align-items-center gap-1">
                            <Shield style={{ width: '1rem', height: '1rem' }} />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      <div className="d-flex align-items-center gap-4 mb-3">
                        <div className="d-flex align-items-center gap-1">
                          <Star className="text-warning" style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" />                                    <span className="fw-medium text-dark">
                            {companionData.rating} ({companionData.reviewCount} đánh giá)
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <MapPin className="text-muted" style={{ width: '1.25rem', height: '1.25rem' }} />
                          <span className="text-muted">{companionData.location}</span>
                        </div>
                      </div>                            <p className="text-muted mb-0" style={{ maxWidth: '32rem' }}>
                        {companionData.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="col-auto">
                    <motion.button
                      onClick={() => setShowBookingModal(true)}
                      className="btn btn-gradient-primary btn-lg px-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Đặt ngay
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="container mb-5">
          <div className="row">
            <div className="col-12">
              <h2 className="h4 fw-bold text-dark mb-4">Bảng giá dịch vụ</h2>

              <div className="row g-3">
                {companionData.services.map((service, index) => (
                  <div key={service.name} className="col-lg-2 col-md-4 col-sm-6">
                    <motion.div
                      className="glass-card h-100 p-3 text-center service-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <service.icon className="text-primary mb-3" style={{ width: '2rem', height: '2rem' }} />
                      <h5 className="fw-semibold mb-2 text-dark">{service.name}</h5>
                      <p className="h5 fw-bold text-primary mb-0">
                        {service.price.toLocaleString()}k/h
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="container mb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="d-grid gap-3 d-md-flex">
                <motion.button
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 flex-fill"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Nhắn tin</span>
                </motion.button>

                <motion.button
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 flex-fill"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Gọi điện</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="container mb-5">
          <div className="row">
            <div className="col-12">
              <h2 className="h4 fw-bold text-dark mb-4">Hình ảnh</h2>

              <div className="row g-3">
                {companionData.gallery.map((image, index) => (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                    <motion.div
                      className="position-relative overflow-hidden rounded-3 gallery-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-100 h-100 object-fit-cover"
                        style={{ height: '12rem' }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="container mb-5">
          <div className="row">
            <div className="col-12">
              <h2 className="h4 fw-bold text-dark mb-4">Đánh giá từ khách hàng</h2>

              <div className="row g-3">
                {companionData.reviews.map((review, index) => (
                  <div key={review.id} className="col-lg-6">
                    <motion.div
                      className="glass-card p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="d-flex align-items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="rounded-circle object-fit-cover"
                          style={{ width: '3rem', height: '3rem' }}
                        />
                        <div className="flex-fill">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <h6 className="fw-semibold mb-0 text-dark">{review.user}</h6>
                            <div className="d-flex align-items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="text-warning" style={{ width: '1rem', height: '1rem' }} fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted small mb-1">{review.date}</p>
                          <p className="text-dark small mb-0">{review.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          companion={companionData}
        />
      </div>
    </AppLayout>
  );
}
