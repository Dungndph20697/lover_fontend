'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import apiUserService from '../services/apiUserService';
import {
    Camera,
    Upload,
    Save,
    X,
    Edit3,
    Plus,
    Trash2,
    MapPin,
    Coffee,
    Music,
    Users,
    Heart,
    Star
} from 'lucide-react';

export default function ProfileEditor({ user, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: user?.nickname || `${user?.first_name} ${user?.last_name}` || '',
        age: user?.year_of_birth ? new Date().getFullYear() - user.year_of_birth : 24,
        description: user?.description || 'Mô tả về bản thân...',
        location: user?.city || 'Hà Nội',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
        coverImage: user?.cover_image || 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop',
        // New fields to match database schema
        hobbies: user?.hobbies || '',
        height: user?.height || '',
        weight: user?.weight || '',
        requirement: user?.requirement || '',
        facebook_link: user?.facebook_link || '',
        services: user?.services || [
            { name: "Dạo phố", price: 300, icon: "MapPin" },
            { name: "Xem phim", price: 400, icon: "Camera" },
            { name: "Café", price: 250, icon: "Coffee" },
        ]
    });

    const [uploading, setUploading] = useState({ avatar: false, cover: false });
    const [saving, setSaving] = useState(false);

    const iconMap = {
        MapPin,
        Camera,
        Coffee,
        Music,
        Users,
        Heart,
        Star
    };

    const availableIcons = ['MapPin', 'Camera', 'Coffee', 'Music', 'Users', 'Heart', 'Star'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleServiceChange = (index, field, value) => {
        const newServices = [...formData.services];
        newServices[index][field] = value;
        setFormData(prev => ({
            ...prev,
            services: newServices
        }));
    };

    const addService = () => {
        setFormData(prev => ({
            ...prev,
            services: [...prev.services, { name: "Dịch vụ mới", price: 300, icon: "Heart" }]
        }));
    };

    const removeService = (index) => {
        const newServices = formData.services.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            services: newServices
        }));
    };

    const handleImageUpload = async (type, event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(prev => ({ ...prev, [type]: true }));

        try {
            // Giả lập upload - trong thực tế sẽ gọi API upload
            const imageUrl = URL.createObjectURL(file);

            if (type === 'avatar') {
                handleInputChange('avatar', imageUrl);
            } else if (type === 'cover') {
                handleInputChange('coverImage', imageUrl);
            }

            // Giả lập delay upload
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(prev => ({ ...prev, [type]: false }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Update profile data
            await apiUserService.updateCCDVProfile(user.id, formData);

            // Update services data
            await apiUserService.updateCCDVServices(user.id, formData.services);

            console.log('✅ Profile and services updated successfully');

            // Call parent callback with updated data
            if (onSave) {
                onSave({
                    ...user,
                    ...formData,
                    cover_image: formData.coverImage,
                    city: formData.location
                });
            }
        } catch (error) {
            console.error('❌ Error updating profile:', error);
            alert('Có lỗi xảy ra khi cập nhật profile. Vui lòng thử lại!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4 profile-editor-overlay"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-4 w-100 profile-editor-container profile-editor-animate"
                style={{ maxWidth: '56rem', maxHeight: '90vh', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="bg-primary p-4 text-white profile-editor-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="h3 fw-bold mb-0">Chỉnh sửa hồ sơ</h2>
                        <button
                            onClick={onCancel}
                            className="btn btn-link text-white p-2"
                            style={{ textDecoration: 'none' }}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSave} className="p-4 profile-editor-form" style={{ maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
                    {/* Cover Image */}
                    <div className="mb-4">
                        <label className="form-label fw-medium">Ảnh bìa</label>
                        <div className="position-relative rounded-3" style={{ height: '12rem', overflow: 'hidden' }}>
                            <img
                                src={formData.coverImage}
                                alt="Cover"
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />
                            <label className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center cursor-pointer profile-image-upload-overlay"
                                style={{ backgroundColor: 'rgba(0,0,0,0.2)', opacity: 0 }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload('cover', e)}
                                    className="d-none"
                                />
                                <div className="bg-white bg-opacity-20 rounded-3 p-3 text-white profile-upload-button">
                                    {uploading.cover ? (
                                        <div className="spinner-border spinner-border-sm text-white" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        <Upload size={24} />
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Avatar & Basic Info */}
                    <div className="row g-4 mb-4">
                        {/* Avatar */}
                        <div className="col-md-6">
                            <label className="form-label fw-medium mb-3">Ảnh đại diện</label>
                            <div className="d-flex flex-column align-items-center avatar-upload-container">
                                <div className="position-relative mb-3 avatar-preview" style={{ width: '150px', height: '150px' }}>
                                    <img
                                        src={formData.avatar}
                                        alt="Avatar"
                                        className="rounded-circle border border-4 border-primary shadow-lg w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />

                                    {/* Upload Overlay */}
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-circle avatar-overlay"
                                        style={{
                                            background: 'rgba(0,0,0,0.6)',
                                            opacity: 0
                                        }}>

                                        <label className="cursor-pointer d-flex flex-column align-items-center text-white">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload('avatar', e)}
                                                className="d-none"
                                            />
                                            {uploading.avatar ? (
                                                <div className="d-flex flex-column align-items-center">
                                                    <div className="spinner-border text-white mb-2" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <small className="fw-medium">Đang tải...</small>
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-column align-items-center">
                                                    <Camera size={28} className="mb-2" />
                                                    <small className="fw-medium">Đổi ảnh</small>
                                                </div>
                                            )}
                                        </label>
                                    </div>

                                    {/* Camera Icon Button */}
                                    <div className="position-absolute bottom-0 end-0">
                                        <label className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center cursor-pointer avatar-camera-btn"
                                            style={{ width: '40px', height: '40px', border: '3px solid white' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload('avatar', e)}
                                                className="d-none"
                                            />
                                            {uploading.avatar ? (
                                                <div className="spinner-border spinner-border-sm text-white" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                <Camera size={18} />
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Upload Instructions */}
                                <div className="text-center avatar-upload-instructions">
                                    <small className="text-muted">Click vào ảnh hoặc nút camera để thay đổi</small>
                                    <br />
                                    <small className="text-muted">Định dạng: JPG, PNG. Tối đa 5MB</small>
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label fw-medium">Tên hiển thị</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Tuổi</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 18)}
                                    className="form-control"
                                    min="18"
                                    max="60"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Địa điểm</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="form-label fw-medium">Mô tả bản thân</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={4}
                            className="form-control"
                            placeholder="Chia sẻ về bản thân, kinh nghiệm và điều đặc biệt của bạn..."
                        />
                    </div>

                    {/* Additional Information */}
                    <div className="mb-4">
                        <h3 className="h5 fw-semibold text-dark mb-3">Thông tin bổ sung</h3>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-medium">Sở thích</label>
                                <input
                                    type="text"
                                    value={formData.hobbies}
                                    onChange={(e) => handleInputChange('hobbies', e.target.value)}
                                    className="form-control"
                                    placeholder="Sở thích của bạn..."
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-medium">Chiều cao (cm)</label>
                                <input
                                    type="number"
                                    value={formData.height}
                                    onChange={(e) => handleInputChange('height', e.target.value)}
                                    className="form-control"
                                    placeholder="165"
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-medium">Cân nặng (kg)</label>
                                <input
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    className="form-control"
                                    placeholder="55"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-medium">Yêu cầu đặc biệt</label>
                                <textarea
                                    value={formData.requirement}
                                    onChange={(e) => handleInputChange('requirement', e.target.value)}
                                    rows={3}
                                    className="form-control"
                                    placeholder="Các yêu cầu đặc biệt từ khách hàng..."
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-medium">Link Facebook</label>
                                <input
                                    type="url"
                                    value={formData.facebook_link}
                                    onChange={(e) => handleInputChange('facebook_link', e.target.value)}
                                    className="form-control"
                                    placeholder="https://facebook.com/yourprofile"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h3 className="h5 fw-semibold text-dark mb-0">Dịch vụ</h3>
                            <button
                                type="button"
                                onClick={addService}
                                className="btn btn-outline-primary btn-sm"
                            >
                                <Plus size={16} className="me-1" />
                                Thêm dịch vụ
                            </button>
                        </div>

                        <div className="row g-3">
                            {formData.services.map((service, index) => {
                                const IconComponent = iconMap[service.icon] || Heart;
                                return (
                                    <div key={index} className="col-md-6 col-lg-4">
                                        <div className="card h-100 service-card-editor">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="text-primary">
                                                        <IconComponent size={24} />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeService(index)}
                                                        className="btn btn-outline-danger btn-sm"
                                                        disabled={formData.services.length <= 1}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label fw-medium">Tên dịch vụ</label>
                                                    <input
                                                        type="text"
                                                        value={service.name}
                                                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label fw-medium">Giá (K VNĐ)</label>
                                                    <input
                                                        type="number"
                                                        value={service.price}
                                                        onChange={(e) => handleServiceChange(index, 'price', parseInt(e.target.value) || 0)}
                                                        className="form-control"
                                                        min="0"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="form-label fw-medium">Icon</label>
                                                    <select
                                                        value={service.icon}
                                                        onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                                                        className="form-select"
                                                    >
                                                        {availableIcons.map(icon => (
                                                            <option key={icon} value={icon}>{icon}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Save Actions */}
                    <div className="d-flex justify-content-end gap-3 pt-3 border-top">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn btn-outline-secondary"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn btn-primary"
                        >
                            {saving ? (
                                <>
                                    <div className="spinner-border spinner-border-sm me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save size={16} className="me-2" />
                                    Lưu thay đổi
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
