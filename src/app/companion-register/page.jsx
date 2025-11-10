"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  X,
  ArrowRight,
  Info,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function CompanionRegisterPage() {
  const { user, loading: userLoading } = useAuth();
  const [formData, setFormData] = useState({
    hourly_rate: 70,
    min_booking_hours: 1,
    basic_services: [],
    free_services: [],
    extended_services: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Service options
  const basicServiceOptions = [
    "Ra mắt người nhà",
    "Ra mắt bạn bè",
    "Du lịch chung cùng nhóm bạn",
    "Đi chơi chung",
    "Tham dự sinh nhật",
    "Trò chuyện offline",
    "Trò chuyện online",
    "Đi chơi tết",
    "Đi chơi ngày lễ",
  ];

  const freeServiceOptions = ["Nắm tay", "Nói yêu", "Nhìn mắt"];

  const extendedServiceOptions = [
    "Nắm tay",
    "Hôn tay",
    "Ôm",
    "Nhõng nhẽo",
    "Cử chỉ thân mật",
    "Nói lời yêu",
  ];

  const toggleService = (serviceType, serviceName) => {
    setFormData((prev) => {
      const currentServices = prev[serviceType];
      const isSelected = currentServices.includes(serviceName);

      return {
        ...prev,
        [serviceType]: isSelected
          ? currentServices.filter((s) => s !== serviceName)
          : [...currentServices, serviceName],
      };
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("Vui lòng đăng nhập để đăng ký companion");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay

      // Mock success response for now
      setSuccess(true);
      console.log('Companion registration data:', formData);
      // Không clear form data - giữ nguyên dữ liệu cũ
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
        <div className="text-center">
          <Heart className="w-12 h-12 text-purple-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
        <div className="text-center bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-2xl">
          <User className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Cần đăng nhập
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng đăng nhập để đăng ký làm companion
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </div>

        {/* Header */}
        <header className="relative z-10 p-6">
          <div className="flex items-center justify-center">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lover
              </span>
            </motion.div>
          </div>
        </header>

        <div className="relative z-10 container mx-auto px-6 py-8">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Success Notification */}
            <motion.div
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Thêm dữ liệu thành công
                  </h3>
                  <p className="text-sm text-green-600">
                    Bạn đã đăng ký companion thành công và có thể bắt đầu nhận
                    booking.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Keep the form with current data */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-2xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  Đăng ký Companion
                </h1>
                <p className="text-gray-600">
                  Trở thành companion và kiếm tiền từ việc đồng hành cùng người
                  khác
                </p>
              </div>

              {/* Continue with the same form content... */}
              <div className="space-y-8">
                {/* Service Information Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-purple-800 mb-4">
                    📋 Thông tin dịch vụ
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold text-purple-700 mb-2">
                        Các dịch vụ cơ bản (*) gồm:
                      </h3>
                      <ul className="text-purple-600 space-y-1 ml-4">
                        <li>• Ra mắt người nhà</li>
                        <li>• Ra mắt bạn bè</li>
                        <li>• Du lịch chung cùng nhóm bạn</li>
                        <li>• Đi chơi chung</li>
                        <li>• Tham dự sinh nhật</li>
                        <li>• Trò chuyện offline</li>
                        <li>• Trò chuyện online</li>
                        <li>• Đi chơi tết</li>
                        <li>• Đi chơi ngày lễ</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">
                        Dịch vụ miễn phí (chọn checkbox):
                      </h3>
                      <ul className="text-green-600 space-y-1 ml-4">
                        <li>• Nắm tay</li>
                        <li>• Nói yêu</li>
                        <li>• Nhìn mắt</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-pink-700 mb-2">
                        Dịch vụ mở rộng (chọn checkbox):
                      </h3>
                      <ul className="text-pink-600 space-y-1 ml-4">
                        <li>• Nắm tay</li>
                        <li>• Hôn tay</li>
                        <li>• Ôm</li>
                        <li>• Nhõng nhẽo</li>
                        <li>• Cử chỉ thân mật</li>
                        <li>• Nói lời yêu</li>
                      </ul>
                    </div>

                    <div className="border-t border-purple-200 pt-3">
                      <h3 className="font-semibold text-blue-700 mb-2">
                        💰 Chi phí:
                      </h3>
                      <ul className="text-blue-600 space-y-1 ml-4">
                        <li>• Tiền theo tiếng: 1 tiếng 70k</li>
                        <li>• Thuê ít nhất là 0.5 tiếng hoặc 1 tiếng</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Rest of the form remains the same */}
                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Giá theo giờ (VND x1000)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="200"
                    step="10"
                    value={formData.hourly_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hourly_rate: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-gray-900 outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Từ 50k - 200k per giờ (mặc định: 70k)
                  </p>
                </div>

                {/* Minimum Booking Hours */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    ⏰ Thời gian thuê tối thiểu
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, min_booking_hours: 0.5 })
                      }
                      className={`p-3 rounded-xl border-2 transition-all text-center ${formData.min_booking_hours === 0.5
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      <div className="font-medium">0.5 tiếng</div>
                      <div className="text-sm opacity-75">30 phút</div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, min_booking_hours: 1 })
                      }
                      className={`p-3 rounded-xl border-2 transition-all text-center ${formData.min_booking_hours === 1
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      <div className="font-medium">1 tiếng</div>
                      <div className="text-sm opacity-75">60 phút</div>
                    </button>
                  </div>
                </div>

                {/* Basic Services */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    <Info className="w-4 h-4 inline mr-1" />
                    Dịch vụ cơ bản (*)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {basicServiceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService("basic_services", service)}
                        className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${formData.basic_services.includes(service)
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          {formData.basic_services.includes(service) && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Free Services */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    💝 Dịch vụ miễn phí (tùy chọn)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {freeServiceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService("free_services", service)}
                        className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${formData.free_services.includes(service)
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          {formData.free_services.includes(service) && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extended Services */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    💎 Dịch vụ mở rộng (tùy chọn)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {extendedServiceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() =>
                          toggleService("extended_services", service)
                        }
                        className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${formData.extended_services.includes(service)
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          {formData.extended_services.includes(service) && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Tóm tắt:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Giá: {formData.hourly_rate.toLocaleString()}k VND/giờ
                    </li>
                    <li>• Tự động được duyệt sau khi đăng ký</li>
                    <li>• Có thể bắt đầu nhận booking ngay lập tức</li>
                    <li>• Có thể chỉnh sửa dịch vụ sau khi đăng ký</li>
                  </ul>
                </div>

                {/* Show that companion is already registered */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-medium text-green-800 mb-2">
                    ✅ Trạng thái:
                  </h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Đã đăng ký companion thành công</li>
                    <li>• Có thể bắt đầu nhận booking ngay</li>
                    <li>• Có thể chỉnh sửa thông tin bất kỳ lúc nào</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Đến Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 rounded-xl border border-gray-300 bg-white/50 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-center">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Lover
            </span>
          </motion.div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Đăng ký Companion
              </h1>
              <p className="text-gray-600">
                Trở thành companion và kiếm tiền từ việc đồng hành cùng người
                khác
              </p>
            </div>

            <div className="space-y-8">
              {/* Service Information Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-purple-800 mb-4">
                  📋 Thông tin dịch vụ
                </h2>

                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-2">
                      Các dịch vụ cơ bản (*) gồm:
                    </h3>
                    <ul className="text-purple-600 space-y-1 ml-4">
                      <li>• Ra mắt người nhà</li>
                      <li>• Ra mắt bạn bè</li>
                      <li>• Du lịch chung cùng nhóm bạn</li>
                      <li>• Đi chơi chung</li>
                      <li>• Tham dự sinh nhật</li>
                      <li>• Trò chuyện offline</li>
                      <li>• Trò chuyện online</li>
                      <li>• Đi chơi tết</li>
                      <li>• Đi chơi ngày lễ</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">
                      Dịch vụ miễn phí (chọn checkbox):
                    </h3>
                    <ul className="text-green-600 space-y-1 ml-4">
                      <li>• Nắm tay</li>
                      <li>• Nói yêu</li>
                      <li>• Nhìn mắt</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-pink-700 mb-2">
                      Dịch vụ mở rộng (chọn checkbox):
                    </h3>
                    <ul className="text-pink-600 space-y-1 ml-4">
                      <li>• Nắm tay</li>
                      <li>• Hôn tay</li>
                      <li>• Ôm</li>
                      <li>• Nhõng nhẽo</li>
                      <li>• Cử chỉ thân mật</li>
                      <li>• Nói lời yêu</li>
                    </ul>
                  </div>

                  <div className="border-t border-purple-200 pt-3">
                    <h3 className="font-semibold text-blue-700 mb-2">
                      💰 Chi phí:
                    </h3>
                    <ul className="text-blue-600 space-y-1 ml-4">
                      <li>• Tiền theo tiếng: 1 tiếng 70k</li>
                      <li>• Thuê ít nhất là 0.5 tiếng hoặc 1 tiếng</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Giá theo giờ (VND x1000)
                </label>
                <input
                  type="number"
                  min="50"
                  max="200"
                  step="10"
                  value={formData.hourly_rate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hourly_rate: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-gray-300 bg-white/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-gray-900 outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Từ 50k - 200k per giờ (mặc định: 70k)
                </p>
              </div>

              {/* Minimum Booking Hours */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  ⏰ Thời gian thuê tối thiểu
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, min_booking_hours: 0.5 })
                    }
                    className={`p-3 rounded-xl border-2 transition-all text-center ${formData.min_booking_hours === 0.5
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                      }`}
                  >
                    <div className="font-medium">0.5 tiếng</div>
                    <div className="text-sm opacity-75">30 phút</div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, min_booking_hours: 1 })
                    }
                    className={`p-3 rounded-xl border-2 transition-all text-center ${formData.min_booking_hours === 1
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                      }`}
                  >
                    <div className="font-medium">1 tiếng</div>
                    <div className="text-sm opacity-75">60 phút</div>
                  </button>
                </div>
              </div>

              {/* Basic Services */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  <Info className="w-4 h-4 inline mr-1" />
                  Dịch vụ cơ bản (*)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {basicServiceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService("basic_services", service)}
                      className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${formData.basic_services.includes(service)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{service}</span>
                        {formData.basic_services.includes(service) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Services */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  💝 Dịch vụ miễn phí (tùy chọn)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {freeServiceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService("free_services", service)}
                      className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${formData.free_services.includes(service)
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{service}</span>
                        {formData.free_services.includes(service) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extended Services */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  💎 Dịch vụ mở rộng (tùy chọn)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {extendedServiceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() =>
                        toggleService("extended_services", service)
                      }
                      className={`p-3 rounded-xl border-2 transition-all text-left text-sm ${formData.extended_services.includes(service)
                        ? "border-pink-500 bg-pink-50 text-pink-700"
                        : "border-gray-300 bg-white/50 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{service}</span>
                        {formData.extended_services.includes(service) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-medium text-blue-800 mb-2">Tóm tắt:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Giá: {formData.hourly_rate.toLocaleString()}k VND/giờ
                  </li>
                  <li>• Tự động được duyệt sau khi đăng ký</li>
                  <li>• Có thể bắt đầu nhận booking ngay lập tức</li>
                  <li>• Có thể chỉnh sửa dịch vụ sau khi đăng ký</li>
                </ul>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Đang đăng ký...</span>
                ) : (
                  <>
                    <span>Đăng ký Companion</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
