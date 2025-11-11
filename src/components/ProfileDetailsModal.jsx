import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X,
    Edit3,
    Star,
    MapPin,
    Calendar,
    Eye,
    Users,
    Heart,
    Camera,
    Shield,
    Check
} from 'lucide-react';

const ProfileDetailsModal = ({
    isOpen,
    onClose,
    profileData,
    darkMode,
    onEdit
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                        style={{ zIndex: 1050 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="position-fixed top-50 start-50 translate-middle"
                        style={{
                            zIndex: 1055,
                            width: '90vw',
                            maxWidth: '800px',
                            maxHeight: '90vh'
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className={`glass-card shadow-lg ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
                            style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>

                            {/* Modal Header */}
                            <div className={`d-flex justify-content-between align-items-center p-4 border-bottom ${darkMode ? 'border-secondary' : 'border-light'}`}>
                                <h4 className={`mb-0 fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>
                                    Thông tin chi tiết
                                </h4>
                                <div className="d-flex gap-2">
                                    <button
                                        onClick={onEdit}
                                        className="btn-edit-primary"
                                        title="Chỉnh sửa thông tin"
                                    >
                                        <Edit3 size={16} />
                                        <span>Chỉnh sửa</span>
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className={`btn btn-outline-secondary rounded-pill p-2 ${darkMode ? 'border-secondary text-light' : ''}`}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>

                                {/* Profile Header Section */}
                                <div className="position-relative p-4">
                                    {/* Avatar and Basic Info */}
                                    <div className="row align-items-center mb-4">
                                        <div className="col-auto">
                                            <div className="position-relative">
                                                <img
                                                    src={profileData.avatar}
                                                    alt={profileData.name}
                                                    className="rounded-4 shadow border border-3 border-white"
                                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                                />

                                                {/* Status Indicators */}
                                                {profileData.verified && (
                                                    <div className="position-absolute bottom-0 end-0 translate-middle-y bg-primary text-white rounded-pill p-2 shadow">
                                                        <Check size={14} />
                                                    </div>
                                                )}
                                                {profileData.online && (
                                                    <div
                                                        className="position-absolute top-0 end-0 bg-success rounded-circle border border-3 border-white"
                                                        style={{ width: "20px", height: "20px" }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h2 className={`fw-bold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}>
                                                {profileData.name}
                                            </h2>
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-purple bg-opacity-25 text-purple" : "bg-purple bg-opacity-10 text-purple"}`}>
                                                    {profileData.age} tuổi
                                                </span>
                                                <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-secondary bg-opacity-25 text-secondary" : "bg-secondary bg-opacity-10 text-secondary"}`}>
                                                    <MapPin size={14} className="me-1" />
                                                    {profileData.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-3 col-6">
                                            <div className={`profile-stat-item text-center ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'} p-3 rounded-3`}>
                                                <div className="d-flex align-items-center justify-content-center mb-2">
                                                    <Star size={16} className="text-warning me-1" fill="currentColor" />
                                                </div>
                                                <div className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{profileData.rating}</div>
                                                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>Đánh giá</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className={`profile-stat-item text-center ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'} p-3 rounded-3`}>
                                                <div className="d-flex align-items-center justify-content-center mb-2">
                                                    <Calendar size={16} className="text-primary me-1" />
                                                </div>
                                                <div className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{profileData.stats.totalBookings}</div>
                                                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>Lượt đặt</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className={`profile-stat-item text-center ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'} p-3 rounded-3`}>
                                                <div className="d-flex align-items-center justify-content-center mb-2">
                                                    <Eye size={16} className="text-success me-1" />
                                                </div>
                                                <div className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{profileData.stats.profileViews}</div>
                                                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>Lượt xem</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <div className={`profile-stat-item text-center ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'} p-3 rounded-3`}>
                                                <div className="d-flex align-items-center justify-content-center mb-2">
                                                    <Users size={16} className="text-info me-1" />
                                                </div>
                                                <div className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>{profileData.reviewCount}</div>
                                                <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>Đánh giá</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Information Section */}
                                <div className="p-4 pt-0">
                                    {/* Personal Details */}
                                    <div className="mb-4">
                                        <h5 className={`fw-semibold mb-3 ${darkMode ? 'text-light-emphasis' : 'text-muted'} text-uppercase`}>
                                            Thông tin cá nhân
                                        </h5>
                                        <div className="row g-3">
                                            {profileData.height && (
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            <div className={`p-2 rounded ${darkMode ? "bg-info bg-opacity-10" : "bg-info bg-opacity-10"}`}>
                                                                <Users size={16} className="text-info" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={`small ${darkMode ? "text-light-emphasis" : "text-muted"}`}>Chiều cao</div>
                                                            <div className={`fw-medium ${darkMode ? "text-light" : "text-dark"}`}>{profileData.height} cm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {profileData.weight && (
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            <div className={`p-2 rounded ${darkMode ? "bg-primary bg-opacity-10" : "bg-primary bg-opacity-10"}`}>
                                                                <Heart size={16} className="text-primary" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={`small ${darkMode ? "text-light-emphasis" : "text-muted"}`}>Cân nặng</div>
                                                            <div className={`fw-medium ${darkMode ? "text-light" : "text-dark"}`}>{profileData.weight} kg</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {profileData.nationality && (
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            <div className={`p-2 rounded ${darkMode ? "bg-success bg-opacity-10" : "bg-success bg-opacity-10"}`}>
                                                                <MapPin size={16} className="text-success" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={`small ${darkMode ? "text-light-emphasis" : "text-muted"}`}>Quốc tịch</div>
                                                            <div className={`fw-medium ${darkMode ? "text-light" : "text-dark"}`}>{profileData.nationality}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-center">
                                                    <div className="me-3">
                                                        <div className={`p-2 rounded ${darkMode ? "bg-warning bg-opacity-10" : "bg-warning bg-opacity-10"}`}>
                                                            <Calendar size={16} className="text-warning" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={`small ${darkMode ? "text-light-emphasis" : "text-muted"}`}>Tham gia</div>
                                                        <div className={`fw-medium ${darkMode ? "text-light" : "text-dark"}`}>Tháng 11, 2024</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Section */}
                                    <div className="mb-4">
                                        <h5 className={`fw-semibold mb-3 ${darkMode ? 'text-light-emphasis' : 'text-muted'} text-uppercase`}>
                                            Giới thiệu
                                        </h5>
                                        <div className={`p-3 rounded-3 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'}`}>
                                            <p className={`mb-0 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                                {profileData.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hobbies Section */}
                                    {profileData.hobbies && profileData.hobbies.length > 0 && (
                                        <div className="mb-4">
                                            <h5 className={`fw-semibold mb-3 ${darkMode ? 'text-light-emphasis' : 'text-muted'} text-uppercase`}>
                                                Sở thích
                                            </h5>
                                            <div className="d-flex flex-wrap gap-2">
                                                {profileData.hobbies.map((hobby, index) => (
                                                    <span
                                                        key={index}
                                                        className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-info bg-opacity-25 text-info" : "bg-info bg-opacity-10 text-info"}`}
                                                    >
                                                        {hobby}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Service Statistics */}
                                    <div>
                                        <h5 className={`fw-semibold mb-3 ${darkMode ? 'text-light-emphasis' : 'text-muted'} text-uppercase`}>
                                            Thống kê dịch vụ
                                        </h5>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div className={`text-center p-3 rounded-3 ${darkMode ? 'bg-primary bg-opacity-10' : 'bg-primary bg-opacity-10'}`}>
                                                    <div className={`fw-bold fs-4 text-primary`}>{profileData.services?.length || 0}</div>
                                                    <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>Dịch vụ</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className={`text-center p-3 rounded-3 ${darkMode ? 'bg-success bg-opacity-10' : 'bg-success bg-opacity-10'}`}>
                                                    <div className={`fw-bold fs-4 text-success`}>{profileData.hire_count || 0}</div>
                                                    <div className={`small ${darkMode ? 'text-light-emphasis' : 'text-muted'}`}>Lần thuê</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className={`d-flex justify-content-end gap-2 p-4 border-top ${darkMode ? 'border-secondary' : 'border-light'}`}>
                                <button
                                    onClick={onClose}
                                    className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}
                                >
                                    Đóng
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit();
                                        onClose();
                                    }}
                                    className="btn btn-gradient-primary"
                                >
                                    <Edit3 size={16} className="me-2" />
                                    Chỉnh sửa thông tin
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileDetailsModal;
