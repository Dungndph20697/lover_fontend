/**
 * 🔧 API Configuration
 * Cấu hình để kết nối với backend API
 */

export const API_CONFIG = {
    // Backend API URL
    API_BASE_URL: 'http://localhost:8080/api',

    // Token storage key
    TOKEN_KEY: 'authToken',

    // API Endpoints
    ENDPOINTS: {
        login: '/users/login',
        register: '/users/register',
        logout: '/users/logout',
        getCurrentUser: '/users/me',
        getUserById: '/users/:id',
        updateUser: '/users/:id',
        checkExists: '/users/check-exists',
        getAllUsers: '/users',
    }
};

export default API_CONFIG;