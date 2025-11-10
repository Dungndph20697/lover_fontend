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
        user,
        isProvider,
      });

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
  };

  // Redirect nếu chưa đăng nhập
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

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

  // Only show error if data loading is complete but data is missing
  if (!user || (!loadingData && !profileData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-4">Dashboard Error</h2>
          <div className="space-y-2 text-left bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-gray-600">Cannot load dashboard data</p>
            <p className="text-sm text-gray-500">
              User:{" "}
              {user
                ? `${user.nickname || user.first_name} (${user.role})`
                : "None"}
            </p>
            <p className="text-sm text-gray-500">
              Profile Data: {profileData ? "Available" : "Missing"}
            </p>
            <p className="text-sm text-gray-500">
              Data Loading: {loadingData ? "In Progress" : "Completed"}
            </p>
            <p className="text-sm text-gray-500">
              isProvider: {isProvider ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              isAuthenticated: {isAuthenticated ? "Yes" : "No"}
            </p>
          </div>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Back to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileSave = async (newData) => {
    try {
      // Update profile data
      if (profileData.id) {
        await apiUserService.updateCCDVProfile(user.id, newData);
      }

      setProfileData((prev) => ({ ...prev, ...newData }));
      setShowProfileEditor(false);

      console.log("Profile updated:", newData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Render cho USER thường
  if (isUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Chào mừng,{" "}
                  {user.nickname || `${user.first_name} ${user.last_name}`}!
                </h1>
                <p className="text-gray-600 mt-2">Người dùng (USER)</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Đăng xuất
              </button>
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

                {profileData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                {profileData.online && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                )}
              </motion.div>

              {/* Profile Details */}
              <div className="flex-1">
                <motion.div
                  className="flex items-center space-x-4 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1
                    className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {profileData.name}
                  </h1>
                  <span
                    className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {profileData.age} tuổi
                  </span>
                  <button
                    onClick={() => setShowProfileEditor(true)}
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span
                      className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {profileData.rating} ({profileData.reviewCount} đánh giá)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span
                      className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {profileData.location}
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {profileData.description}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Thống kê tổng quan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} shadow-lg`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Tổng booking
                  </p>
                  <p
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {profileData.stats.totalBookings}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} shadow-lg`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Tổng thu nhập
                  </p>
                  <p
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {(profileData.stats.totalEarnings / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} shadow-lg`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Booking tháng này
                  </p>
                  <p
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {profileData.stats.monthlyBookings}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} shadow-lg`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Đánh giá TB
                  </p>
                  <p
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {profileData.stats.averageRating}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"} shadow-lg`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Eye className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Lượt xem hồ sơ
                  </p>
                  <p
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {profileData.stats.profileViews}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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
