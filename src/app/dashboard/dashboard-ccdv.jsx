"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Edit3,
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
  Eye,
  TrendingUp,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router";
import ProfileEditor from "../../components/ProfileEditor";
import apiUserService from "../../services/apiUserService.js";

export default function DashboardCCDV() {
  const { user, isAuthenticated, loading, isProvider, isUser, logout } =
    useAuth();
  const navigate = useNavigate();
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // Load dữ liệu CCDV từ JSON
  React.useEffect(() => {
    const loadCCDVData = async () => {
      if (user && user.role.name === "Service_provider") {
        try {
          setLoadingData(true);

          // Load CCDV profile
          const ccdvResult = await apiUserService.getCCDVProfile(user.id);

          // Load stats
          const statsResult = await apiUserService.getCCDVStats(user.id);

          // Load service types để map với services
          const serviceTypesResult = await apiUserService.getServiceTypes();

          const ccdvProfile = ccdvResult.profile;
          const stats = statsResult.stats;
          const serviceTypes = serviceTypesResult.serviceTypes || [];

          if (ccdvProfile) {
            // Tính tuổi từ năm sinh
            const currentYear = new Date().getFullYear();
            const age = currentYear - ccdvProfile.year_of_birth;

            // Map services with service types
            const mappedServices = ccdvProfile.services.map((userService) => {
              const serviceType = serviceTypes.find(
                (st) => st.id === userService.service_id
              );
              return {
                id: serviceType?.id,
                name: serviceType?.name || "Unknown Service",
                price: Math.round(
                  (serviceType?.price_per_hour || 70000) / 1000
                ), // Convert to k
                icon: getIconForService(serviceType?.name),
                note: userService.note,
              };
            });

            setProfileData({
              id: ccdvProfile.id,
              name: ccdvProfile.full_name,
              age: age,
              avatar: ccdvProfile.avatar,
              coverImage:
                "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop",
              rating: stats.averageRating,
              reviewCount: Math.floor(stats.averageRating * 30), // Estimate
              location: ccdvProfile.city,
              description: ccdvProfile.description,
              verified: true,
              online: true,
              services: mappedServices,
              stats: {
                totalBookings: stats.totalBookings,
                totalEarnings: stats.totalEarnings,
                monthlyBookings: stats.monthlyBookings,
                monthlyEarnings: stats.monthlyEarnings,
                averageRating: stats.averageRating,
                profileViews: stats.profileViews,
              },
              hobbies: ccdvProfile.hobbies,
              height: ccdvProfile.height,
              weight: ccdvProfile.weight,
              nationality: ccdvProfile.nationality,
              hire_count: ccdvProfile.hire_count,
            });
          } else {
            // Fallback data if no CCDV profile found
            setProfileData({
              name:
                user?.nickname ||
                `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
                "Tên của bạn",
              age: 24,
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
              coverImage:
                "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop",
              rating: 4.9,
              reviewCount: 128,
              location: "Hà Nội",
              description:
                "Chuyên viên tư vấn dịch vụ với nhiều năm kinh nghiệm.",
              verified: true,
              online: true,
              services: [
                { name: "Dạo phố", price: 300, icon: "MapPin" },
                { name: "Xem phim", price: 400, icon: "Camera" },
                { name: "Café", price: 250, icon: "Coffee" },
              ],
              stats: stats || {
                totalBookings: 0,
                totalEarnings: 0,
                monthlyBookings: 0,
                monthlyEarnings: 0,
                averageRating: 5.0,
                profileViews: 100,
              },
            });
          }

          setStatsData(stats);
        } catch (error) {
          console.error("Error loading CCDV data:", error);

          // Set fallback profile data even on error
          setProfileData({
            name:
              user?.nickname ||
              `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
              "Tên của bạn",
            age: 24,
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
            coverImage:
              "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop",
            rating: 4.9,
            reviewCount: 128,
            location: "Hà Nội",
            description:
              "Chuyên viên tư vấn dịch vụ với nhiều năm kinh nghiệm.",
            verified: true,
            online: true,
            services: [
              { name: "Dạo phố", price: 300, icon: "MapPin" },
              { name: "Xem phim", price: 400, icon: "Camera" },
              { name: "Café", price: 250, icon: "Coffee" },
            ],
            stats: {
              totalBookings: 0,
              totalEarnings: 0,
              monthlyBookings: 0,
              monthlyEarnings: 0,
              averageRating: 5.0,
              profileViews: 100,
            },
          });

          setStatsData({
            totalBookings: 0,
            totalEarnings: 0,
            monthlyBookings: 0,
            monthlyEarnings: 0,
            averageRating: 5.0,
            profileViews: 100,
          });
        } finally {
          console.log("🏁 CCDV Dashboard: Data loading completed");
          setLoadingData(false);
        }
      } else {
        console.log("⚠️ CCDV Dashboard: User not available or not provider", {
          user: !!user,
          isProvider,
        });
        setLoadingData(false);
      }
    };

    loadCCDVData();
  }, [user, isProvider]);

  // Function to map service names to icons
  const getIconForService = (serviceName) => {
    if (!serviceName) return "Heart";

    const name = serviceName.toLowerCase();
    if (name.includes("phố") || name.includes("du lịch")) return "MapPin";
    if (name.includes("phim") || name.includes("xem")) return "Camera";
    if (name.includes("café") || name.includes("cafe")) return "Coffee";
    if (name.includes("âm nhạc") || name.includes("nhạc")) return "Music";
    if (
      name.includes("sinh nhật") ||
      name.includes("sự kiện") ||
      name.includes("bạn bè")
    )
      return "Users";
    if (name.includes("trò chuyện")) return "MessageCircle";
    if (name.includes("online")) return "Phone";
    return "Heart";
  };

  const iconMap = {
    MapPin,
    Camera,
    Coffee,
    Music,
    Users,
    Heart,
    Star,
    MessageCircle,
    Phone,

    Shield,
    Eye,
    TrendingUp,
    DollarSign,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router';
import ProfileEditor from '../../components/ProfileEditor';
import ProfileDetailsModal from '../../components/ProfileDetailsModal';
import apiUserService from '../../services/apiUserService.js';

export default function DashboardCCDV() {
    const { user, isAuthenticated, loading, isProvider, isUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfileEditor, setShowProfileEditor] = useState(false);
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [statsData, setStatsData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);

    // Add custom CSS for reverse spin animation
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes reverse-spin {
                from {
                    transform: rotate(360deg);
                }
                to {
                    transform: rotate(0deg);
                }
            }
            .animate-reverse-spin {
                animation: reverse-spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Debug user info
    React.useEffect(() => {
        console.log('🎯 CCDV Dashboard loaded with user:', {
            user_id: user?.id,
            role: user?.role,
            role_id: user?.role_id,
            isProvider,
            isUser,
            userObject: user
        });
    }, [user, isProvider, isUser]);

    // Load dữ liệu CCDV từ JSON
    React.useEffect(() => {
        const loadCCDVData = async () => {
            console.log('🔄 CCDV Dashboard: Starting data load...', { user, isProvider });

            if (user && isProvider) {
                try {
                    setLoadingData(true);
                    console.log('📊 CCDV Dashboard: Loading profile for user', user.id);

                    // Load CCDV profile
                    const ccdvResult = await apiUserService.getCCDVProfile(user.id);
                    console.log('📋 CCDV Dashboard: Profile loaded', ccdvResult);

                    // Load stats  
                    const statsResult = await apiUserService.getCCDVStats(user.id);
                    console.log('📈 CCDV Dashboard: Stats loaded', statsResult);

                    // Load service types để map với services
                    const serviceTypesResult = await apiUserService.getServiceTypes();
                    console.log('🔧 CCDV Dashboard: Service types loaded', serviceTypesResult.serviceTypes?.length || 0);

                    const ccdvProfile = ccdvResult.profile;
                    const stats = statsResult.stats;
                    const serviceTypes = serviceTypesResult.serviceTypes || [];

                    if (ccdvProfile) {
                        // Tính tuổi từ năm sinh
                        const currentYear = new Date().getFullYear();
                        const age = currentYear - ccdvProfile.year_of_birth;

                        // Map services with service types
                        const mappedServices = ccdvProfile.services.map(userService => {
                            const serviceType = serviceTypes.find(st => st.id === userService.service_id);
                            return {
                                id: serviceType?.id,
                                name: serviceType?.name || 'Unknown Service',
                                price: Math.round((serviceType?.price_per_hour || 70000) / 1000), // Convert to k
                                icon: getIconForService(serviceType?.name),
                                note: userService.note
                            };
                        });

                        setProfileData({
                            id: ccdvProfile.id,
                            name: ccdvProfile.full_name,
                            age: age,
                            avatar: ccdvProfile.avatar,
                            coverImage: `https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop`, // Default cover
                            rating: stats.averageRating,
                            reviewCount: Math.floor(stats.averageRating * 30), // Estimate
                            location: ccdvProfile.city,
                            description: ccdvProfile.description,
                            verified: true,
                            online: true,
                            services: mappedServices,
                            stats: {
                                totalBookings: stats.totalBookings,
                                totalEarnings: stats.totalEarnings,
                                monthlyBookings: stats.monthlyBookings,
                                monthlyEarnings: stats.monthlyEarnings,
                                averageRating: stats.averageRating,
                                profileViews: stats.profileViews
                            },
                            hobbies: ccdvProfile.hobbies,
                            height: ccdvProfile.height,
                            weight: ccdvProfile.weight,
                            nationality: ccdvProfile.nationality,
                            hire_count: ccdvProfile.hire_count
                        });

                        console.log('✅ CCDV Dashboard: Profile data set successfully');
                    } else {
                        // Fallback data if no CCDV profile found
                        console.log('⚠️ CCDV Dashboard: No profile found, using fallback data');
                        setProfileData({
                            name: user?.nickname || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Tên của bạn',
                            age: 24,
                            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
                            coverImage: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop',
                            rating: 4.9,
                            reviewCount: 128,
                            location: 'Hà Nội',
                            description: 'Chuyên viên tư vấn dịch vụ với nhiều năm kinh nghiệm.',
                            verified: true,
                            online: true,
                            services: [
                                { name: "Dạo phố", price: 300, icon: "MapPin" },
                                { name: "Xem phim", price: 400, icon: "Camera" },
                                { name: "Café", price: 250, icon: "Coffee" },
                            ],
                            stats: stats || {
                                totalBookings: 0,
                                totalEarnings: 0,
                                monthlyBookings: 0,
                                monthlyEarnings: 0,
                                averageRating: 5.0,
                                profileViews: 100
                            }
                        });
                    }

                    setStatsData(stats);
                } catch (error) {
                    console.error('Error loading CCDV data:', error);

                    // Set fallback profile data even on error
                    setProfileData({
                        name: user?.nickname || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Tên của bạn',
                        age: 24,
                        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
                        coverImage: 'https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=1200&h=400&fit=crop',
                        rating: 4.9,
                        reviewCount: 128,
                        location: 'Hà Nội',
                        description: 'Chuyên viên tư vấn dịch vụ với nhiều năm kinh nghiệm.',
                        verified: true,
                        online: true,
                        services: [
                            { name: "Dạo phố", price: 300, icon: "MapPin" },
                            { name: "Xem phim", price: 400, icon: "Camera" },
                            { name: "Café", price: 250, icon: "Coffee" },
                        ],
                        stats: {
                            totalBookings: 0,
                            totalEarnings: 0,
                            monthlyBookings: 0,
                            monthlyEarnings: 0,
                            averageRating: 5.0,
                            profileViews: 100
                        }
                    });

                    setStatsData({
                        totalBookings: 0,
                        totalEarnings: 0,
                        monthlyBookings: 0,
                        monthlyEarnings: 0,
                        averageRating: 5.0,
                        profileViews: 100
                    });
                } finally {
                    console.log('🏁 CCDV Dashboard: Data loading completed');
                    setLoadingData(false);
                }
            } else {
                console.log('⚠️ CCDV Dashboard: User not available or not provider', { user: !!user, isProvider });
                setLoadingData(false);
            }
        };

        loadCCDVData();
    }, [user, isProvider]);

    // Function to map service names to icons
    const getIconForService = (serviceName) => {
        if (!serviceName) return "Heart";

        const name = serviceName.toLowerCase();
        if (name.includes('phố') || name.includes('du lịch')) return "MapPin";
        if (name.includes('phim') || name.includes('xem')) return "Camera";
        if (name.includes('café') || name.includes('cafe')) return "Coffee";
        if (name.includes('âm nhạc') || name.includes('nhạc')) return "Music";
        if (name.includes('sinh nhật') || name.includes('sự kiện') || name.includes('bạn bè')) return "Users";
        if (name.includes('trò chuyện')) return "MessageCircle";
        if (name.includes('online')) return "Phone";
        return "Heart";
    };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <div className="space-y-2 text-left bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Loading CCDV Dashboard...</p>
            <p className="text-sm text-gray-500">
              Auth loading: {loading ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              Data loading: {loadingData ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              User:{" "}
              {user
                ? `${user.nickname || user.first_name} (${user.role})`
                : "None"}
            </p>
            <p className="text-sm text-gray-500">
              isProvider: {isProvider ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              isUser: {isUser ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              isAuthenticated: {isAuthenticated ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    );
  }

    // Redirect nếu chưa đăng nhập
    React.useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || loadingData) {
        return (
            <div className="min-vh-100 gradient-bg d-flex align-items-center justify-content-center">
                <div className="text-center">
                    {/* Bootstrap Loading Spinner */}
                    <div className="position-relative mb-4">
                        <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-border text-purple position-absolute top-50 start-50 translate-middle"
                            role="status" style={{ width: "3rem", height: "3rem", animationDirection: "reverse" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <Heart className="text-purple" size={24} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="h3 fw-bold text-dark mb-3">Đang tải Dashboard CCDV</h2>
                        <div className="progress mx-auto" style={{ width: "300px", height: "6px" }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-gradient"
                                role="progressbar" style={{ width: "100%" }}></div>
                        </div>
                    </div>

                    <div className="glass-card p-4 mx-auto" style={{ maxWidth: "400px" }}>
                        <div className="row g-2 text-start small">
                            <div className="col-6">
                                <span className="text-muted">Xác thực:</span>
                            </div>
                            <div className="col-6">
                                <span className={`fw-medium ${loading ? 'text-warning' : 'text-success'}`}>
                                    {loading ? 'Đang kiểm tra...' : 'Hoàn thành'}
                                </span>
                            </div>

                            <div className="col-6">
                                <span className="text-muted">Tải dữ liệu:</span>
                            </div>
                            <div className="col-6">
                                <span className={`fw-medium ${loadingData ? 'text-warning' : 'text-success'}`}>
                                    {loadingData ? 'Đang xử lý...' : 'Hoàn thành'}
                                </span>
                            </div>

                            {user && (
                                <>
                                    <div className="col-12">
                                        <hr className="my-2" />
                                    </div>
                                    <div className="col-12">
                                        <p className="mb-1 small">
                                            <span className="fw-medium">Người dùng:</span> {user.nickname || user.first_name}
                                        </p>
                                        <p className="mb-2 small">
                                            <span className="fw-medium">Vai trò:</span> {user.role?.name || 'CCDV'}
                                        </p>
                                        <div className="d-flex gap-3 small text-muted">
                                            <span>Provider: {isProvider ? '✓' : '✗'}</span>
                                            <span>Auth: {isAuthenticated ? '✓' : '✗'}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  };

    // Only show error if data loading is complete but data is missing
    if (!user || (!loadingData && !profileData)) {
        return (
            <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div className="text-center" style={{ maxWidth: "500px" }}>
                    {/* Error Icon */}
                    <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mb-4"
                        style={{ width: "80px", height: "80px" }}>
                        <svg className="text-danger" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                    </div>

                    <h2 className="h3 fw-bold text-danger mb-3">Không thể tải Dashboard</h2>
                    <p className="text-muted mb-4">Đã xảy ra lỗi khi tải dữ liệu dashboard. Vui lòng thử lại sau.</p>

                    <div className="glass-card p-4 mb-4">
                        <div className="row g-2 text-start small">
                            <div className="col-6">
                                <span className="text-muted">Người dùng:</span>
                            </div>
                            <div className="col-6">
                                <span className={user ? "text-success" : "text-danger"}>
                                    {user ? `${user.nickname || user.first_name}` : 'Chưa xác định'}
                                </span>
                            </div>

                            <div className="col-6">
                                <span className="text-muted">Dữ liệu hồ sơ:</span>
                            </div>
                            <div className="col-6">
                                <span className={profileData ? "text-success" : "text-danger"}>
                                    {profileData ? 'Có sẵn' : 'Thiếu'}
                                </span>
                            </div>

                            <div className="col-6">
                                <span className="text-muted">Trạng thái tải:</span>
                            </div>
                            <div className="col-6">
                                <span className={loadingData ? "text-warning" : "text-secondary"}>
                                    {loadingData ? 'Đang tải...' : 'Hoàn thành'}
                                </span>
                            </div>

                            <div className="col-6">
                                <span className="text-muted">Quyền Provider:</span>
                            </div>
                            <div className="col-6">
                                <span className={isProvider ? "text-success" : "text-danger"}>
                                    {isProvider ? 'Có' : 'Không'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-gradient-primary"
                        >
                            Tải lại trang
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="btn btn-outline-secondary"
                        >
                            Quay lại đăng nhập
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* User Dashboard Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Dashboard Người dùng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Dịch vụ đã sử dụng
                </h3>
                <p className="text-3xl font-bold text-purple-600">0</p>
                <p className="text-purple-700 text-sm mt-1">
                  Lần sử dụng dịch vụ
                </p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-pink-900 mb-2">
                  Yêu thích
                </h3>
                <p className="text-3xl font-bold text-pink-600">0</p>
                <p className="text-pink-700 text-sm mt-1">Dịch vụ yêu thích</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  Đánh giá
                </h3>
                <p className="text-3xl font-bold text-indigo-600">0</p>
                <p className="text-indigo-700 text-sm mt-1">Đánh giá đã viết</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render cho CCDV Provider
  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-purple-50 to-pink-50"} transition-colors`}
    >
      {/* Header */}
      <header
        className={`bg-white shadow-sm border-b ${darkMode ? "bg-gray-800 border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Dashboard CCDV
              </h1>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Quản lý hồ sơ và dịch vụ của bạn
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-100 text-gray-600"} hover:bg-opacity-80 transition-colors`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Cover Image */}
          <div className="relative h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl overflow-hidden mb-6">
            <img
              src={profileData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Edit Cover Button */}
            <button
              onClick={() => setShowProfileEditor(true)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div
            className={`p-8 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} shadow-xl`}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                  />
                  <button
                    onClick={() => setShowProfileEditor(true)}
                    className="absolute inset-0 bg-black/50 text-white rounded-2xl opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center"
                  >
                    <Camera className="w-8 h-8" />
                  </button>
                </div>

    // Render cho CCDV Provider
    return (
        <div className={`${darkMode ? "bg-dark" : "gradient-bg"} min-vh-100`}>
            {/* Bootstrap Header with Glass Effect */}
            <nav className={`navbar navbar-expand-lg navbar-custom sticky-top ${darkMode ? "bg-dark border-bottom" : ""}`}>
                <div className="container-fluid">
                    <motion.div
                        className="d-flex align-items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`p-2 rounded-3 me-3 ${darkMode ? "bg-purple bg-opacity-20" : "bg-purple bg-opacity-10"}`}>
                            <Heart className={`text-${darkMode ? "light" : "purple"}`} size={24} />
                        </div>
                        <div>
                            <h1 className={`navbar-brand-custom mb-0 fs-4 fw-bold ${darkMode ? "text-light" : "gradient-text"}`}>
                                Dashboard CCDV
                            </h1>
                            <p className={`small mb-0 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                Quản lý hồ sơ và dịch vụ của bạn
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="d-flex align-items-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* Notification Button */}
                        <button className={`btn btn-outline-secondary rounded-pill me-2 position-relative ${darkMode ? "border-secondary text-light" : ""}`}>
                            <MessageCircle size={18} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3
                            </span>
                        </button>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`btn rounded-pill me-3 ${darkMode ? "btn-warning" : "btn-outline-dark"}`}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="btn btn-gradient-primary d-flex align-items-center"
                        >
                            <LogOut size={16} className="me-2" />
                            <span className="d-none d-sm-inline">Đăng xuất</span>
                        </button>
                    </motion.div>
                </div>
            </nav>

            {/* Hero Profile Section with Bootstrap */}
            <section className="py-5">
                <div className="container-fluid">
                    {/* Cover Image */}
                    <motion.div
                        className="position-relative rounded-4 overflow-hidden mb-4 shadow-lg"
                        style={{ height: "350px" }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={profileData.coverImage}
                            alt="Cover"
                            className="w-100 h-100 object-fit-cover"
                            style={{ transition: "transform 0.7s ease" }}
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        />
                        <div className="position-absolute inset-0 bg-dark bg-opacity-25"></div>

                        {/* Status Badges */}
                        <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
                            <span className="badge glass-card text-dark fw-normal">
                                <span className="bg-success rounded-circle d-inline-block me-2" style={{ width: "8px", height: "8px" }}></span>
                                Online
                            </span>
                            {profileData.verified && (
                                <span className="badge bg-primary bg-opacity-75 text-light fw-normal">
                                    <Shield size={14} className="me-1" />
                                    Verified
                                </span>
                            )}
                        </div>

                        {/* Enhanced Edit Button */}
                        <button
                            onClick={() => setShowProfileEditor(true)}
                            className="btn-edit-floating"
                            title="Chỉnh sửa ảnh bìa"
                        >
                            <Camera size={18} />
                        </button>

                        {/* Enhanced Stats Overlay */}
                        <div className="profile-data-section position-absolute bottom-0 end-0 m-3">
                            <div className="d-flex gap-4">
                                <div className="profile-stat-item">
                                    <div className="fw-bold fs-4 text-white">{profileData.stats.totalBookings}</div>
                                    <div className="small text-white-50">Lượt đặt</div>
                                </div>
                                <div className="profile-stat-item">
                                    <div className="fw-bold fs-4 text-white d-flex align-items-center gap-1">
                                        <Star size={16} className="text-warning" fill="currentColor" />
                                        {profileData.rating}
                                    </div>
                                    <div className="small text-white-50">Đánh giá</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        className={`glass-card shadow-lg p-4 ${darkMode ? "bg-dark text-light" : ""}`}
                        style={{ marginTop: "-100px", position: "relative", zIndex: 10 }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="row align-items-center">
                            {/* Avatar */}
                            <div className="col-auto">
                                <motion.div
                                    className="position-relative"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="position-relative">
                                        <img
                                            src={profileData.avatar}
                                            alt={profileData.name}
                                            className="rounded-4 shadow border border-3 border-white"
                                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        />
                                        <button
                                            onClick={() => setShowProfileEditor(true)}
                                            className="btn-edit-overlay"
                                            title="Chỉnh sửa ảnh đại diện"
                                        >
                                            <Camera size={24} className="mb-2" />
                                            <div className="small fw-medium">Đổi ảnh</div>
                                        </button>

                                        {/* Status Indicators */}
                                        {profileData.verified && (
                                            <motion.div
                                                className="position-absolute bottom-0 end-0 translate-middle-y bg-primary text-white rounded-pill p-2 shadow"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.6, type: "spring" }}
                                            >
                                                <Check size={16} />
                                            </motion.div>
                                        )}
                                        {profileData.online && (
                                            <motion.div
                                                className="position-absolute top-0 end-0 bg-success rounded-circle border border-3 border-white"
                                                style={{ width: "24px", height: "24px" }}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.8, type: "spring" }}
                                            >
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Profile Details */}
                            <div className="col">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    <div className="d-flex align-items-center mb-3 flex-wrap gap-3">
                                        <h1 className={`mb-0 fw-bold ${darkMode ? "text-light" : "text-dark"}`} style={{ fontSize: "2.5rem" }}>
                                            {profileData.name}
                                        </h1>
                                        <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-purple bg-opacity-25 text-purple" : "bg-purple bg-opacity-10 text-purple"}`}>
                                            {profileData.age} tuổi
                                        </span>
                                        <div className="edit-button-toolbar ms-auto">
                                            <button
                                                onClick={() => setShowProfileEditor(true)}
                                                className="btn-edit-primary"
                                                title="Chỉnh sửa thông tin"
                                            >
                                                <Edit3 size={14} />
                                                <span>Chỉnh sửa</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="row g-3 mb-4"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <div className="col-auto">
                                        <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-warning bg-opacity-25 text-warning" : "bg-warning bg-opacity-10 text-warning-emphasis"}`}>
                                            <Star size={14} className="me-1" />
                                            {profileData.rating} ({profileData.reviewCount} đánh giá)
                                        </span>
                                    </div>
                                    <div className="col-auto">
                                        <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-secondary bg-opacity-25 text-secondary" : "bg-secondary bg-opacity-10 text-secondary"}`}>
                                            <MapPin size={14} className="me-1" />
                                            {profileData.location}
                                        </span>
                                    </div>
                                    <div className="col-auto">
                                        <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-success bg-opacity-25 text-success" : "bg-success bg-opacity-10 text-success"}`}>
                                            <Eye size={14} className="me-1" />
                                            {profileData.stats.profileViews} lượt xem
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Profile Summary with Modal Trigger */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    <div className={`glass-card profile-details-trigger p-4 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-light bg-opacity-50'}`}
                                        style={{ cursor: 'pointer', borderRadius: '1rem' }}
                                        onClick={() => setShowProfileDetails(true)}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="flex-grow-1">
                                                <h6 className={`text-uppercase fw-semibold mb-2 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                                    Thông tin cá nhân
                                                </h6>
                                                <p className={`mb-3 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                                    {profileData.description ?
                                                        (profileData.description.length > 120 ?
                                                            `${profileData.description.substring(0, 120)}...` :
                                                            profileData.description
                                                        ) :
                                                        "Nhấn để xem thông tin chi tiết về hồ sơ của bạn"
                                                    }
                                                </p>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {profileData.height && (
                                                        <span className={`badge rounded-pill ${darkMode ? "bg-info bg-opacity-25 text-info" : "bg-info bg-opacity-10 text-info"}`}>
                                                            {profileData.height}cm
                                                        </span>
                                                    )}
                                                    {profileData.weight && (
                                                        <span className={`badge rounded-pill ${darkMode ? "bg-primary bg-opacity-25 text-primary" : "bg-primary bg-opacity-10 text-primary"}`}>
                                                            {profileData.weight}kg
                                                        </span>
                                                    )}
                                                    {profileData.nationality && (
                                                        <span className={`badge rounded-pill ${darkMode ? "bg-success bg-opacity-25 text-success" : "bg-success bg-opacity-10 text-success"}`}>
                                                            {profileData.nationality}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ms-3">
                                                <div className={`profile-details-icon p-3 rounded-circle ${darkMode ? "bg-primary bg-opacity-20" : "bg-primary bg-opacity-10"}`}>
                                                    <Eye className="text-primary" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`small mt-2 text-center ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                            <i>Nhấn để xem thông tin chi tiết</i>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bootstrap Stats Dashboard */}
            <section className="py-5">
                <div className="container-fluid">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-5"
                    >
                        <h2 className={`display-5 fw-bold mb-3 ${darkMode ? "text-light" : "gradient-text"}`}>
                            Thống kê tổng quan
                        </h2>
                        <p className={`lead ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                            Theo dõi hiệu suất và thu nhập của bạn
                        </p>
                    </motion.div>

                    <div className="row g-4 mb-5">
                        {[
                            {
                                icon: Calendar,
                                label: "Tổng booking",
                                value: profileData.stats.totalBookings,
                                color: "primary",
                                bgColor: "primary"
                            },
                            {
                                icon: DollarSign,
                                label: "Tổng thu nhập",
                                value: `${(profileData.stats.totalEarnings / 1000000).toFixed(1)}M`,
                                color: "success",
                                bgColor: "success"
                            },
                            {
                                icon: TrendingUp,
                                label: "Booking tháng này",
                                value: profileData.stats.monthlyBookings,
                                color: "purple",
                                bgColor: "purple"
                            },
                            {
                                icon: Star,
                                label: "Đánh giá TB",
                                value: profileData.stats.averageRating,
                                color: "warning",
                                bgColor: "warning"
                            },
                            {
                                icon: Eye,
                                label: "Lượt xem hồ sơ",
                                value: profileData.stats.profileViews,
                                color: "info",
                                bgColor: "info"
                            }
                        ].map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={stat.label} className="col-lg col-md-6">
                                    <motion.div
                                        className={`glass-card h-100 p-4 text-center position-relative overflow-hidden ${darkMode ? "bg-dark text-light" : ""}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {/* Icon */}
                                        <div className={`d-inline-flex align-items-center justify-content-center rounded-3 p-3 mb-3 bg-${stat.bgColor} bg-opacity-10`}>
                                            <IconComponent className={`text-${stat.color}`} size={28} />
                                        </div>

                                        {/* Content */}
                                        <h6 className={`text-uppercase text-muted mb-2 fw-medium ${darkMode ? "text-light-emphasis" : ""}`}>
                                            {stat.label}
                                        </h6>
                                        <h3 className={`fw-bold mb-0 ${darkMode ? "text-light" : "text-dark"}`}>
                                            {stat.value}
                                        </h3>

                                        {/* Hover decoration */}
                                        <div className="position-absolute top-0 end-0 opacity-10" style={{ width: "80px", height: "80px", transform: "translate(30px, -30px)" }}>
                                            <div className={`w-100 h-100 rounded-circle bg-${stat.color}`}></div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Performance Chart */}
                    <motion.div
                        className={`glass-card p-5 ${darkMode ? "bg-dark text-light" : ""}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className={`mb-0 fw-bold ${darkMode ? "text-light" : "text-dark"}`}>
                                Biểu đồ hiệu suất
                            </h4>
                            <span className={`badge rounded-pill px-3 py-2 ${darkMode ? "bg-purple bg-opacity-25 text-purple" : "bg-purple bg-opacity-10 text-purple"}`}>
                                30 ngày qua
                            </span>
                        </div>
                        <div className={`d-flex align-items-center justify-content-center ${darkMode ? "bg-secondary bg-opacity-10" : "bg-light"} rounded-3`} style={{ height: "300px" }}>
                            <div className="text-center">
                                <TrendingUp className={`${darkMode ? "text-muted" : "text-secondary"} mb-3`} size={64} />
                                <p className={`lead mb-0 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                    Biểu đồ hiệu suất sẽ hiển thị tại đây
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bootstrap Services Pricing */}
            <section className="py-5">
                <div className="container-fluid">
                    <motion.div
                        className="d-flex justify-content-between align-items-center mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <h2 className={`display-5 fw-bold mb-2 ${darkMode ? "text-light" : "gradient-text"}`}>
                                Bảng giá dịch vụ
                            </h2>
                            <p className={`lead mb-0 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                Các gói dịch vụ đang cung cấp
                            </p>
                        </div>
                        <div className="edit-button-toolbar">
                            <motion.button
                                onClick={() => setShowProfileEditor(true)}
                                className="btn-edit-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Chỉnh sửa dịch vụ"
                            >
                                <Edit3 size={16} className="me-2" />
                                <span>Quản lý dịch vụ</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="service-grid-enhanced">
                        {profileData.services.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || Heart;

                            return (
                                <motion.div
                                    key={service.id || service.name}
                                    className={`service-card-enhanced glass-card position-relative overflow-hidden ${darkMode ? "bg-dark text-light" : ""}`}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    style={{ cursor: "pointer", padding: "1.5rem", borderRadius: "1.25rem" }}
                                >
                                    {/* Service Icon */}
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div className={`p-3 rounded-3 ${darkMode ? "bg-purple bg-opacity-20" : "bg-purple bg-opacity-10"}`}>
                                            <IconComponent className={`text-${darkMode ? "purple" : "purple"}`} size={32} />
                                        </div>

                                        {/* Popularity Badge */}
                                        {index === 0 && (
                                            <span className="badge bg-warning text-dark fw-bold">
                                                HOT
                                            </span>
                                        )}
                                    </div>

                                    {/* Service Details */}
                                    <h5 className={`fw-bold mb-3 ${darkMode ? "text-light" : "text-dark"}`}>
                                        {service.name}
                                    </h5>

                                    <div className="d-flex align-items-baseline mb-3">
                                        <span className="h3 fw-bold gradient-text me-2">
                                            {service.price}k
                                        </span>
                                        <span className={`small ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                            / giờ
                                        </span>
                                    </div>

                                    {service.note && (
                                        <p className={`small ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                            {service.note}
                                        </p>
                                    )}

                                    {/* Action Button */}
                                    <button className={`btn w-100 mt-3 ${darkMode ? "btn-outline-light" : "btn-outline-primary"}`}>
                                        Xem chi tiết
                                    </button>

                                    {/* Decorative Background */}
                                    <div className="position-absolute top-0 end-0 opacity-10" style={{ width: "100px", height: "100px", transform: "translate(30px, -30px)" }}>
                                        <div className="w-100 h-100 rounded-circle bg-gradient"></div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Add New Service Card */}
                        <motion.div
                            className={`service-card-enhanced border-2 border-dashed ${darkMode ? "border-secondary bg-dark text-light" : "border-primary bg-light"} position-relative`}
                            style={{ cursor: "pointer", padding: "1.5rem", borderRadius: "1.25rem" }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: profileData.services.length * 0.1 + 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setShowProfileEditor(true)}
                        >
                            <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                                <div className={`p-4 rounded-3 mb-4 ${darkMode ? "bg-purple bg-opacity-10" : "bg-purple bg-opacity-10"}`}>
                                    <Edit3 className={`text-${darkMode ? "purple" : "purple"}`} size={32} />
                                </div>
                                <h5 className={`fw-semibold mb-2 ${darkMode ? "text-light" : "text-dark"}`}>
                                    Thêm dịch vụ mới
                                </h5>
                                <p className={`small mb-0 ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                    Mở rộng danh mục dịch vụ
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bootstrap Quick Actions */}
            <section className="py-5 pb-5">
                <div className="container-fluid">
                    <motion.div
                        className="text-center mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={`display-5 fw-bold mb-3 ${darkMode ? "text-light" : "gradient-text"}`}>
                            Thao tác nhanh
                        </h2>
                        <p className={`lead ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                            Quản lý tài khoản và hoạt động kinh doanh
                        </p>
                    </motion.div>

                    <div className="row g-4 mb-5">
                        {[
                            {
                                icon: Settings,
                                title: "Cài đặt tài khoản",
                                description: "Quản lý thông tin cá nhân, bảo mật và quyền riêng tư",
                                color: "secondary",
                                bgClass: "bg-secondary bg-opacity-10"
                            },
                            {
                                icon: MessageCircle,
                                title: "Tin nhắn",
                                description: "Xem và trả lời tin nhắn từ khách hàng, quản lý cuộc hội thoại",
                                color: "info",
                                bgClass: "bg-info bg-opacity-10",
                                badge: "3"
                            },
                            {
                                icon: Calendar,
                                title: "Lịch đặt",
                                description: "Quản lý lịch trình, booking và thời gian rảnh của bạn",
                                color: "success",
                                bgClass: "bg-success bg-opacity-10"
                            }
                        ].map((action, index) => {
                            const IconComponent = action.icon;

                            return (
                                <div key={action.title} className="col-lg-4 col-md-6">
                                    <motion.div
                                        className={`card h-100 glass-card border-0 position-relative overflow-hidden ${darkMode ? "bg-dark text-light" : ""}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.2 }}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="card-body p-4">
                                            {/* Icon Section */}
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div className={`p-3 rounded-3 ${action.bgClass}`}>
                                                    <IconComponent className={`text-${action.color}`} size={32} />
                                                </div>

                                                {/* Notification Badge */}
                                                {action.badge && (
                                                    <span className="badge bg-danger rounded-pill">
                                                        {action.badge}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <h5 className={`card-title fw-bold mb-3 ${darkMode ? "text-light" : "text-dark"}`}>
                                                {action.title}
                                            </h5>
                                            <p className={`card-text ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                                {action.description}
                                            </p>

                                            {/* Action Arrow */}
                                            <div className="d-flex justify-content-end mt-auto">
                                                <div className={`bg-${action.color} bg-opacity-10 rounded-circle p-2`}>
                                                    <svg width="16" height="16" fill="currentColor" className={`text-${action.color}`} viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Background decoration */}
                                        <div className="position-absolute top-0 end-0 opacity-5" style={{ width: "120px", height: "120px", transform: "translate(40px, -40px)" }}>
                                            <div className={`w-100 h-100 rounded-circle bg-${action.color}`}></div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Stats Bar */}
                    <motion.div
                        className={`glass-card p-4 ${darkMode ? "bg-dark text-light" : ""}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <div className="row text-center g-4">
                            <div className="col-md-3 col-6">
                                <h3 className={`fw-bold mb-1 ${darkMode ? "text-light" : "text-dark"}`}>
                                    {profileData.hire_count || 0}
                                </h3>
                                <p className={`small mb-0 text-uppercase ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                    Lần được thuê
                                </p>
                            </div>
                            <div className="col-md-3 col-6">
                                <h3 className={`fw-bold mb-1 ${darkMode ? "text-light" : "text-dark"}`}>
                                    {profileData.stats.monthlyEarnings ? `${(profileData.stats.monthlyEarnings / 1000).toFixed(0)}k` : '0k'}
                                </h3>
                                <p className={`small mb-0 text-uppercase ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                    Thu nhập tháng này
                                </p>
                            </div>
                            <div className="col-md-3 col-6">
                                <h3 className={`fw-bold mb-1 ${darkMode ? "text-light" : "text-dark"}`}>
                                    99%
                                </h3>
                                <p className={`small mb-0 text-uppercase ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                    Tỷ lệ hài lòng
                                </p>
                            </div>
                            <div className="col-md-3 col-6">
                                <h3 className={`fw-bold mb-1 ${darkMode ? "text-light" : "text-dark"}`}>
                                    24/7
                                </h3>
                                <p className={`small mb-0 text-uppercase ${darkMode ? "text-light-emphasis" : "text-muted"}`}>
                                    Hỗ trợ khách hàng
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Profile Details Modal */}
            <ProfileDetailsModal
                isOpen={showProfileDetails}
                onClose={() => setShowProfileDetails(false)}
                profileData={profileData}
                darkMode={darkMode}
                onEdit={() => setShowProfileEditor(true)}
            />

            {/* Profile Editor Modal */}
            {showProfileEditor && (
                <ProfileEditor
                    user={{ ...user, ...profileData }}
                    onSave={handleProfileSave}
                    onCancel={() => setShowProfileEditor(false)}
                />
            )}
        </div>
      </section>

      {/* Services Pricing */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Bảng giá dịch vụ
            </h2>
            <button
              onClick={() => setShowProfileEditor(true)}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Chỉnh sửa</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {profileData.services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Heart;

              return (
                <motion.div
                  key={service.id || service.name}
                  className={`p-4 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} hover:shadow-lg transition-all`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <IconComponent className="w-8 h-8 text-purple-500 mb-3" />
                  <h3
                    className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {service.name}
                  </h3>
                  <p
                    className={`text-lg font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                  >
                    {service.price}k / giờ
                  </p>
                  {service.note && (
                    <p
                      className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {service.note}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Thao tác nhanh
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} hover:shadow-lg transition-all cursor-pointer`}
              whileHover={{ scale: 1.02 }}
            >
              <Settings className="w-8 h-8 text-gray-600 mb-4" />
              <h3
                className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Cài đặt tài khoản
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Quản lý thông tin cá nhân và bảo mật
              </p>
            </motion.div>

            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} hover:shadow-lg transition-all cursor-pointer`}
              whileHover={{ scale: 1.02 }}
            >
              <MessageCircle className="w-8 h-8 text-blue-600 mb-4" />
              <h3
                className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Tin nhắn
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Xem và trả lời tin nhắn từ khách hàng
              </p>
            </motion.div>

            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} hover:shadow-lg transition-all cursor-pointer`}
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="w-8 h-8 text-green-600 mb-4" />
              <h3
                className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Lịch đặt
              </h3>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Quản lý lịch trình và booking
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Editor Modal */}
      {showProfileEditor && (
        <ProfileEditor
          user={{ ...user, ...profileData }}
          onSave={handleProfileSave}
          onCancel={() => setShowProfileEditor(false)}
        />
      )}
    </div>
  );
}
