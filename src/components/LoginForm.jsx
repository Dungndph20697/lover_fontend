import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router';

export default function LoginForm() {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username || !formData.password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        console.log('🔐 Attempting login:', formData.username);

        const result = await login(formData.username, formData.password);
        console.log('Login result:', result);

        if (result.success) {
            console.log('✅ Login successful, user:', result.user);
            console.log('User role:', result.user.role);
            navigate('/dashboard');
        } else {
            console.error('❌ Login failed:', result.error);
            setError(result.message || result.error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="gradient-bg d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="glass-card p-4">
                            <div className="text-center mb-4">
                                <h2 className="h3 fw-bold text-dark">Đăng nhập</h2>
                                <p className="text-muted">Love Companion</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-medium">
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-custom"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Nhập tên đăng nhập"
                                        autoComplete="username"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-medium">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-custom"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>

                                <div className="d-grid gap-2">
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
                                                Đang đăng nhập...
                                            </>
                                        ) : (
                                            'Đăng nhập'
                                        )}
                                    </button>
                                </div>

                                <div className="text-center mt-4">
                                    <span className="text-muted">Chưa có tài khoản? </span>
                                    <a href="/register" className="text-purple fw-medium text-decoration-none">
                                        Đăng ký ngay
                                    </a>
                                </div>

                                <div className="mt-4">
                                    <div className="text-center">
                                        <small className="text-muted">
                                            Để demo: sử dụng bất kỳ username/password nào
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
