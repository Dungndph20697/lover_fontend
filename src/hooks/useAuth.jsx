/**
 * 🔐 Authentication Hook
 * Hook chính để xác thực với backend API
 */

import { createContext, useContext, useState, useEffect } from 'react';
import apiUserService from '../services/apiUserService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize authentication state
    useEffect(() => {
        initializeAuth();
    }, []);

    /**
     * Khởi tạo authentication state
     */
    const initializeAuth = async () => {
        console.log('🔄 Initializing Auth...');
        setLoading(true);

        try {
            const token = apiUserService.getToken();

            if (token) {
                console.log('🔑 Found existing token, validating...');

                // Validate token bằng cách lấy user hiện tại
                const result = await apiUserService.getCurrentUser();

                if (result.success && result.user) {
                    console.log('✅ Token valid, user authenticated:', result.user);
                    setUser(result.user);
                    setIsAuthenticated(true);
                } else {
                    console.log('❌ Token invalid, clearing auth');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                console.log('🔍 No token found, user not authenticated');
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('❌ Auth initialization error:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Đăng nhập với API
     */
    const login = async (username, password) => {
        console.log('🔐 Login attempt:', { username });
        setLoading(true);

        try {
            const result = await apiUserService.login(username, password);

            if (result.success && result.user) {
                console.log('✅ Login successful:', result.user);
                setUser(result.user);
                setIsAuthenticated(true);
                return {
                    success: true,
                    user: result.user,
                    message: result.message || 'Đăng nhập thành công!'
                };
            } else {
                console.log('❌ Login failed:', result.error);
                return {
                    success: false,
                    error: result.error || 'Đăng nhập thất bại',
                    message: result.message || 'Thông tin đăng nhập không chính xác!'
                };
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            return {
                success: false,
                error: error.message,
                message: 'Lỗi kết nối đến server!'
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Đăng ký với API
     */
    const register = async (userData) => {
        console.log('📝 Register attempt:', {
            username: userData.username,
            email: userData.email
        });
        setLoading(true);

        try {
            const result = await apiUserService.register(userData);

            if (result.success && result.user) {
                console.log('✅ Registration successful:', result.user);
                setUser(result.user);
                setIsAuthenticated(true);
                return {
                    success: true,
                    user: result.user,
                    message: result.message || 'Đăng ký thành công!'
                };
            } else {
                console.log('❌ Registration failed:', result.error);
                return {
                    success: false,
                    error: result.error || 'Đăng ký thất bại',
                    message: result.message || 'Không thể tạo tài khoản!'
                };
            }
        } catch (error) {
            console.error('❌ Registration error:', error);
            return {
                success: false,
                error: error.message,
                message: 'Lỗi kết nối đến server!'
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Đăng xuất
     */
    const logout = async () => {
        console.log('🚪 Logout');
        setLoading(true);

        try {
            const result = await apiUserService.logout();

            // Luôn clear state dù API call thất bại
            setUser(null);
            setIsAuthenticated(false);

            console.log('✅ Logout completed');
            return {
                success: true,
                message: result.message || 'Đăng xuất thành công!'
            };
        } catch (error) {
            console.error('❌ Logout error:', error);

            // Vẫn clear state
            setUser(null);
            setIsAuthenticated(false);

            return {
                success: true,
                message: 'Đăng xuất thành công!'
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Cập nhật thông tin user
     */
    const updateUser = async (updateData) => {
        if (!user?.id) {
            return {
                success: false,
                error: 'User not authenticated'
            };
        }

        console.log('📝 Update user:', updateData);

        try {
            const result = await apiUserService.updateUser(user.id, updateData);

            if (result.success && result.user) {
                console.log('✅ Update successful:', result.user);
                setUser(result.user);
                return {
                    success: true,
                    user: result.user,
                    message: result.message || 'Cập nhật thành công!'
                };
            } else {
                console.log('❌ Update failed:', result.error);
                return {
                    success: false,
                    error: result.error || 'Cập nhật thất bại'
                };
            }
        } catch (error) {
            console.error('❌ Update error:', error);
            return {
                success: false,
                error: error.message || 'Lỗi cập nhật'
            };
        }
    };

    /**
     * Kiểm tra user role
     */
    const isProvider = user?.role === 'CCDV' || user?.role === 'PROVIDER';
    const isUser = user?.role === 'USER' || user?.role === 'CUSTOMER';
    const isAdmin = user?.role === 'ADMIN';

    /**
     * Context value
     */
    const value = {
        user,
        isAuthenticated,
        loading,
        isProvider,
        isUser,
        isAdmin,
        login,
        register,
        logout,
        updateUser,
        initializeAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook để sử dụng Authentication
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}

export default useAuth;