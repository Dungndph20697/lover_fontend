import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router';

export default function RegisterForm() {
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone: '',
        cccd: '',
        nickname: '',
        role: 'USER'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password || !formData.first_name || !formData.last_name) {
            setError('Vui lòng điền đầy đủ các trường bắt buộc');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Email không hợp lệ');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        console.log('📝 Attempting registration:', formData.username);

        const result = await register(formData);
        console.log('Registration result:', result);

        if (result.success) {
            console.log('✅ Registration successful, user:', result.user);
            navigate('/dashboard');
        } else {
            console.error('❌ Registration failed:', result.error);
            setError(result.message || result.error);
        }
    };

    return (
        <div className="gradient-bg d-flex align-items-center justify-content-center min-vh-100 py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="glass-card p-4">
                            <div className="text-center mb-4">
                                <h2 className="h3 fw-bold text-dark">Đăng ký tài khoản</h2>
                                <p className="text-muted">Love Companion</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="row g-3">
                                    {/* Tên đăng nhập */}
                                    <div className="col-md-6">
                                        <label htmlFor="username" className="form-label fw-medium">
                                            Tên đăng nhập *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Nhập tên đăng nhập"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label fw-medium">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-custom"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Nhập email"
                                            required
                                        />
                                    </div>

                                    {/* Họ */}
                                    <div className="col-md-6">
                                        <label htmlFor="first_name" className="form-label fw-medium">
                                            Họ *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            id="first_name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder="Nhập họ"
                                            required
                                        />
                                    </div>

                                    {/* Tên */}
                                    <div className="col-md-6">
                                        <label htmlFor="last_name" className="form-label fw-medium">
                                            Tên *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            id="last_name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder="Nhập tên"
                                            required
                                        />
                                    </div>

                                    {/* Biệt danh */}
                                    <div className="col-12">
                                        <label htmlFor="nickname" className="form-label fw-medium">
                                            Biệt danh
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            id="nickname"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            placeholder="Nhập biệt danh (tùy chọn)"
                                        />
                                    </div>

                                    {/* Số điện thoại */}
                                    <div className="col-md-6">
                                        <label htmlFor="phone" className="form-label fw-medium">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control form-control-custom"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>

                                    {/* CCCD */}
                                    <div className="col-md-6">
                                        <label htmlFor="cccd" className="form-label fw-medium">
                                            CCCD
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom"
                                            id="cccd"
                                            name="cccd"
                                            value={formData.cccd}
                                            onChange={handleChange}
                                            placeholder="Nhập số CCCD"
                                        />
                                    </div>

                                    {/* Mật khẩu */}
                                    <div className="col-md-6">
                                        <label htmlFor="password" className="form-label fw-medium">
                                            Mật khẩu *
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form-control-custom"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Nhập mật khẩu"
                                            required
                                        />
                                    </div>

                                    {/* Xác nhận mật khẩu */}
                                    <div className="col-md-6">
                                        <label htmlFor="confirmPassword" className="form-label fw-medium">
                                            Xác nhận mật khẩu *
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form-control-custom"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Nhập lại mật khẩu"
                                            required
                                        />
                                    </div>

                                    {/* Role Selection */}
                                    <div className="col-12">
                                        <label className="form-label fw-medium">Loại tài khoản</label>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="role-user"
                                                        value="USER"
                                                        checked={formData.role === 'USER'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="role-user">
                                                        <strong>Người dùng</strong>
                                                        <small className="d-block text-muted">
                                                            Tìm kiếm và kết nối với companion
                                                        </small>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="role-ccdv"
                                                        value="CCDV"
                                                        checked={formData.role === 'CCDV'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="role-ccdv">
                                                        <strong>Companion</strong>
                                                        <small className="d-block text-muted">
                                                            Cung cấp dịch vụ đồng hành
                                                        </small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-gradient-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </span>
                                                Đang đăng ký...
                                            </>
                                        ) : (
                                            'Đăng ký'
                                        )}
                                    </button>
                                </div>

                                <div className="text-center mt-4">
                                    <span className="text-muted">Đã có tài khoản? </span>
                                    <a href="/login" className="text-purple fw-medium text-decoration-none">
                                        Đăng nhập ngay
                                    </a>
                                </div>

                                <div className="mt-4">
                                    <div className="text-center">
                                        <small className="text-muted">
                                            Để demo: điền thông tin bất kỳ (email giả cũng được)
                                        </small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
