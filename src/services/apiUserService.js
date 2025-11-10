/**
 * 🌐 Real API User Service
 * Service để kết nối với backend API thực tại http://localhost:8080/api/users
 */

import { API_CONFIG } from '../config/apiConfig.js';

class ApiUserService {
    constructor() {
        this.baseURL = API_CONFIG.API_BASE_URL;
        this.tokenKey = API_CONFIG.TOKEN_KEY;
    }

    /**
     * Generic API call method
     * @param {string} endpoint 
     * @param {object} options 
     * @returns {Promise<object>}
     */
    async apiCall(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem(this.tokenKey);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            mode: 'cors',
            credentials: 'include',
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        console.log('🌐 API Call:', { url, method: config.method || 'GET' });

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ API Response:', data);
            return data;

        } catch (error) {
            console.error('❌ API Error:', error);
            throw error;
        }
    }

    /**
     * Đăng nhập user
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<object>}
     */
    async login(username, password) {
        try {
            console.log('🔐 Attempting login with API:', { username });

            // Use Basic Authentication instead of JSON body
            const credentials = btoa(`${username}:${password}`);

            const response = await this.apiCall('/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            // Lưu token nếu có
            if (response.token) {
                localStorage.setItem(this.tokenKey, response.token);
                console.log('💾 Token saved to localStorage');
            }

            return {
                success: true,
                user: response.user || response,
                token: response.token,
                message: response.message || 'Đăng nhập thành công'
            };

        } catch (error) {
            console.error('❌ Login failed:', error);
            return {
                success: false,
                error: error.message || 'Đăng nhập thất bại',
                message: 'Không thể đăng nhập. Vui lòng kiểm tra thông tin!'
            };
        }
    }

    /**
     * Đăng ký user mới
     * @param {object} userData 
     * @returns {Promise<object>}
     */
    async register(userData) {
        try {
            console.log('📝 Attempting registration with API:', {
                username: userData.username,
                email: userData.email
            });

            const response = await this.apiCall('/users', {
                method: 'POST',
                body: JSON.stringify(userData),
            });

            // Lưu token nếu có
            if (response.token) {
                localStorage.setItem(this.tokenKey, response.token);
            }

            return {
                success: true,
                user: response.user || response,
                token: response.token,
                message: response.message || 'Đăng ký thành công'
            };

        } catch (error) {
            console.error('❌ Registration failed:', error);
            return {
                success: false,
                error: error.message || 'Đăng ký thất bại',
                message: 'Không thể đăng ký. Vui lòng thử lại!'
            };
        }
    }

    /**
     * Lấy thông tin user hiện tại
     * @returns {Promise<object>}
     */
    async getCurrentUser() {
        try {
            const token = localStorage.getItem(this.tokenKey);
            if (!token) {
                throw new Error('No authentication token found');
            }

            console.log('👤 Getting current user with API');

            const response = await this.apiCall('/users/me', {
                method: 'GET',
            });

            return {
                success: true,
                user: response.user || response
            };

        } catch (error) {
            console.error('❌ Get current user failed:', error);

            // Xóa token không hợp lệ
            localStorage.removeItem(this.tokenKey);

            return {
                success: false,
                error: error.message || 'Không thể lấy thông tin user',
                message: 'Phiên đăng nhập đã hết hạn'
            };
        }
    }

    /**
     * Lấy thông tin user theo ID
     * @param {number|string} userId 
     * @returns {Promise<object>}
     */
    async getUserById(userId) {
        try {
            console.log('👤 Getting user by ID:', userId);

            const response = await this.apiCall(`/users/${userId}`, {
                method: 'GET',
            });

            return {
                success: true,
                user: response.user || response
            };

        } catch (error) {
            console.error('❌ Get user by ID failed:', error);
            return {
                success: false,
                error: error.message || 'Không thể lấy thông tin user'
            };
        }
    }

    /**
     * Kiểm tra username/email đã tồn tại
     * @param {string} username 
     * @param {string} email 
     * @returns {Promise<object>}
     */
    async checkUserExists(username, email) {
        try {
            console.log('🔍 Checking user exists:', { username, email });

            const response = await this.apiCall('/users/check-exists', {
                method: 'POST',
                body: JSON.stringify({ username, email }),
            });

            return {
                success: true,
                usernameExists: response.usernameExists || false,
                emailExists: response.emailExists || false
            };

        } catch (error) {
            console.error('❌ Check user exists failed:', error);
            return {
                success: false,
                error: error.message || 'Không thể kiểm tra user'
            };
        }
    }

    /**
     * Cập nhật thông tin user
     * @param {number|string} userId 
     * @param {object} updateData 
     * @returns {Promise<object>}
     */
    async updateUser(userId, updateData) {
        try {
            console.log('📝 Updating user:', { userId, updateData });

            const response = await this.apiCall(`/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
            });

            return {
                success: true,
                user: response.user || response,
                message: response.message || 'Cập nhật thành công'
            };

        } catch (error) {
            console.error('❌ Update user failed:', error);
            return {
                success: false,
                error: error.message || 'Cập nhật thất bại'
            };
        }
    }

    /**
     * Đăng xuất
     * @returns {Promise<object>}
     */
    async logout() {
        try {
            console.log('🚪 Logging out with API');

            // Gọi API logout nếu có token
            const token = localStorage.getItem(this.tokenKey);
            if (token) {
                await this.apiCall('/users', {
                    method: 'DELETE',
                });
            }

            // Xóa token khỏi localStorage
            localStorage.removeItem(this.tokenKey);

            return {
                success: true,
                message: 'Đăng xuất thành công'
            };

        } catch (error) {
            console.error('❌ Logout failed:', error);

            // Vẫn xóa token dù API call thất bại
            localStorage.removeItem(this.tokenKey);

            return {
                success: true,
                message: 'Đăng xuất thành công'
            };
        }
    }

    /**
     * Lấy danh sách tất cả users (for testing)
     * @returns {Promise<object>}
     */
    async getAllUsers() {
        try {
            console.log('📋 Getting all users');

            const response = await this.apiCall('/users', {
                method: 'GET',
            });

            return {
                success: true,
                users: response.users || response
            };

        } catch (error) {
            console.error('❌ Get all users failed:', error);
            return {
                success: false,
                error: error.message || 'Không thể lấy danh sách users'
            };
        }
    }

    /**
     * Kiểm tra trạng thái authentication
     * @returns {boolean}
     */
    isAuthenticated() {
        const token = localStorage.getItem(this.tokenKey);
        return !!token;
    }

    /**
     * Lấy token hiện tại
     * @returns {string|null}
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    // ===== CCDV SPECIFIC METHODS =====

    /**
     * Lấy CCDV profile của user
     * @param {number|string} userId 
     * @returns {Promise<object>}
     */
    async getCCDVProfile(userId) {
        try {
            console.log('👤 Getting CCDV profile for user:', userId);

            const response = await this.apiCall(`/users/${userId}/ccdv-profile`, {
                method: 'GET',
            });

            return {
                success: true,
                profile: response.profile || response
            };

        } catch (error) {
            console.error('❌ Get CCDV profile failed:', error);

            // Return default profile if not found
            return {
                success: true,
                profile: {
                    id: userId,
                    displayName: 'User',
                    location: 'Hà Nội',
                    rating: 0,
                    totalReviews: 0,
                    isVerified: false,
                    avatar: null,
                    bio: '',
                    services: [],
                    gallery: [],
                    availability: {},
                    contactInfo: {},
                    pricing: {}
                }
            };
        }
    }

    /**
     * Cập nhật CCDV profile
     * @param {number|string} userId 
     * @param {object} profileData 
     * @returns {Promise<object>}
     */
    async updateCCDVProfile(userId, profileData) {
        try {
            console.log('📝 Updating CCDV profile for user:', userId);

            const response = await this.apiCall(`/users/${userId}/ccdv-profile`, {
                method: 'PUT',
                body: JSON.stringify(profileData),
            });

            return {
                success: true,
                profile: response.profile || response,
                message: 'Cập nhật profile thành công'
            };

        } catch (error) {
            console.error('❌ Update CCDV profile failed:', error);
            return {
                success: false,
                error: error.message || 'Cập nhật profile thất bại'
            };
        }
    }

    /**
     * Lấy thống kê CCDV của user
     * @param {number|string} userId 
     * @returns {Promise<object>}
     */
    async getCCDVStats(userId) {
        try {
            console.log('📊 Getting CCDV stats for user:', userId);

            const response = await this.apiCall(`/users/${userId}/ccdv-stats`, {
                method: 'GET',
            });

            return {
                success: true,
                stats: response.stats || response
            };

        } catch (error) {
            console.error('❌ Get CCDV stats failed:', error);

            // Return default stats if not found
            return {
                success: true,
                stats: {
                    totalBookings: 0,
                    completedBookings: 0,
                    totalEarnings: 0,
                    averageRating: 0,
                    totalReviews: 0,
                    responseTime: '30 phút',
                    activeServices: 0
                }
            };
        }
    }

    /**
     * Lấy danh sách loại dịch vụ có sẵn
     * @returns {Promise<object>}
     */
    async getServiceTypes() {
        try {
            console.log('🔧 Getting service types');

            const response = await this.apiCall('/service-types', {
                method: 'GET',
            });

            return {
                success: true,
                serviceTypes: response.serviceTypes || response
            };

        } catch (error) {
            console.error('❌ Get service types failed:', error);

            // Return default service types if not found
            return {
                success: true,
                serviceTypes: [
                    {
                        id: 'companion',
                        name: 'Companion',
                        description: 'Dịch vụ đồng hành, trò chuyện',
                        icon: 'Users',
                        basePrice: 100000
                    },
                    {
                        id: 'date',
                        name: 'Date',
                        description: 'Đi chơi, ăn uống cùng nhau',
                        icon: 'Heart',
                        basePrice: 200000
                    },
                    {
                        id: 'event',
                        name: 'Event',
                        description: 'Tham dự sự kiện, tiệc tùng',
                        icon: 'Calendar',
                        basePrice: 300000
                    },
                    {
                        id: 'travel',
                        name: 'Travel',
                        description: 'Du lịch cùng nhau',
                        icon: 'MapPin',
                        basePrice: 500000
                    }
                ]
            };
        }
    }

    /**
     * Cập nhật dịch vụ CCDV của user
     * @param {number|string} userId 
     * @param {array} services 
     * @returns {Promise<object>}
     */
    async updateCCDVServices(userId, services) {
        try {
            console.log('🛠️ Updating CCDV services for user:', userId);

            const response = await this.apiCall(`/users/${userId}/ccdv-services`, {
                method: 'PUT',
                body: JSON.stringify({ services }),
            });

            return {
                success: true,
                services: response.services || services,
                message: 'Cập nhật dịch vụ thành công'
            };

        } catch (error) {
            console.error('❌ Update CCDV services failed:', error);
            return {
                success: false,
                error: error.message || 'Cập nhật dịch vụ thất bại'
            };
        }
    }
}

// Export singleton instance
export default new ApiUserService();