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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Chỉnh sửa hồ sơ</h2>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {/* Cover Image */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Ảnh bìa</label>
                        <div className="relative h-48 rounded-xl overflow-hidden group">
                            <img
                                src={formData.coverImage}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                            <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload('cover', e)}
                                    className="hidden"
                                />
                                <div className="bg-white/20 backdrop-blur-lg rounded-lg p-3 text-white">
                                    {uploading.cover ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                                    ) : (
                                        <Upload className="w-6 h-6" />
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Avatar & Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Avatar */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Ảnh đại diện</label>
                            <div className="relative w-32 h-32 group">
                                <img
                                    src={formData.avatar}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-200"
                                />
                                <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 group-hover:bg-black/40 transition-all rounded-full opacity-0 group-hover:opacity-100">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload('avatar', e)}
                                        className="hidden"
                                    />
                                    <div className="bg-white/20 backdrop-blur-lg rounded-full p-2 text-white">
                                        {uploading.avatar ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                        ) : (
                                            <Camera className="w-5 h-5" />
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Mô tả bản thân</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            placeholder="Chia sẻ về bản thân, kinh nghiệm và điều đặc biệt của bạn..."
                        />
                    </div>

                    {/* Additional Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin bổ sung</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sở thích</label>
                                <input
                                    type="text"
                                    value={formData.hobbies}
                                    onChange={(e) => handleInputChange('hobbies', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Đọc sách, Du lịch, Xem phim..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                <input
                                    type="url"
                                    value={formData.facebook_link}
                                    onChange={(e) => handleInputChange('facebook_link', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="https://facebook.com/yourprofile"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
                                <input
                                    type="number"
                                    value={formData.height}
                                    onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || '')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="175.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
                                <input
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || '')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="68.0"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Yêu cầu hợp tác</label>
                            <textarea
                                value={formData.requirement}
                                onChange={(e) => handleInputChange('requirement', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                placeholder="Trao đổi rõ ràng trước khi hợp tác, đúng giờ..."
                            />
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">Bảng giá dịch vụ</label>
                            <button
                                type="button"
                                onClick={addService}
                                className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Thêm dịch vụ</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.services.map((service, index) => {
                                const IconComponent = iconMap[service.icon] || Heart;

                                return (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        {/* Icon Selector */}
                                        <div className="flex-shrink-0">
                                            <select
                                                value={service.icon}
                                                onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            >
                                                {availableIcons.map(iconName => (
                                                    <option key={iconName} value={iconName}>{iconName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                                            <IconComponent className="w-5 h-5 text-purple-600" />
                                        </div>

                                        {/* Service Name */}
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={service.name}
                                                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Tên dịch vụ"
                                            />
                                        </div>

                                        {/* Price */}
                                        <div className="w-32">
                                            <div className="flex items-center">
                                                <input
                                                    type="number"
                                                    value={service.price}
                                                    onChange={(e) => handleServiceChange(index, 'price', parseInt(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                                <span className="ml-2 text-sm text-gray-500">k/h</span>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        {formData.services.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeService(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    <span>Đang lưu...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Lưu thay đổi</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
