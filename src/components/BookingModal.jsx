"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, CreditCard, Check, Sparkles } from "lucide-react";

export default function BookingModal({ isOpen, onClose, companion }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    duration: 1,
    notes: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    setStep(4); // Success step
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 3000);
  };

  const totalPrice =
    companion?.services?.find((s) => s.name === bookingData.service)?.price *
    bookingData.duration || 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
        style={{ zIndex: 1050 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className={`position-relative w-100 glass-card border ${darkMode ? "border-secondary" : "border-light"}`}
          style={{ maxWidth: '28rem' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
            <h2 className={`h5 fw-bold mb-0 ${darkMode ? "text-white" : "text-dark"}`}>
              {step === 4 ? "Đặt lịch thành công!" : "Đặt lịch"}
            </h2>
            <button
              onClick={onClose}
              className={`btn btn-sm rounded-3 p-2 ${darkMode ? "btn-outline-secondary" : "btn-outline-light"}`}
              style={{ transition: 'all 0.2s' }}
            >
              <X style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>

          {/* Progress Bar */}
          {step < 4 && (
            <div className="px-4 py-3">
              <div className="d-flex align-items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-fill">
                    <div
                      className="rounded-pill"
                      style={{
                        height: '0.5rem',
                        background: i <= step
                          ? 'var(--gradient-purple-pink)'
                          : darkMode
                            ? '#6c757d'
                            : '#dee2e6',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-2 small">
                <span
                  className={
                    step >= 1
                      ? "text-purple-500 font-medium"
                      : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                  }
                >
                  Chọn dịch vụ
                </span>
                <span
                  className={
                    step >= 2
                      ? "text-purple-500 font-medium"
                      : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                  }
                >
                  Thời gian
                </span>
                <span
                  className={
                    step >= 3
                      ? "text-purple-500 font-medium"
                      : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                  }
                >
                  Thanh toán
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className={`fs-5 fw-semibold mb-3 ${darkMode ? "text-white" : "text-dark"}`}
                  >
                    Chọn dịch vụ
                  </h3>

                  <div className="d-grid gap-3">
                    {companion?.services?.map((service) => (
                      <motion.button
                        key={service.name}
                        onClick={() =>
                          setBookingData({
                            ...bookingData,
                            service: service.name,
                          })
                        }
                        className={`btn w-100 p-3 rounded-3 border-2 ${bookingData.service === service.name
                          ? "border-primary bg-primary bg-opacity-10 text-primary"
                          : darkMode
                            ? "border-secondary bg-dark text-white"
                            : "border-light-subtle bg-white text-dark"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <service.icon style={{ width: '1.5rem', height: '1.5rem' }} className="text-primary" />
                            <span
                              className={`fw-medium ${darkMode ? "text-white" : "text-dark"}`}
                            >
                              {service.name}
                            </span>
                          </div>
                          <span
                            className={`fw-bold ${darkMode ? "text-primary-emphasis" : "text-primary"}`}
                          >
                            {service.price.toLocaleString()}k/h
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className={`fs-5 fw-semibold mb-3 ${darkMode ? "text-white" : "text-dark"}`}
                  >
                    Chọn thời gian
                  </h3>

                  <div className="d-grid gap-3">
                    <div>
                      <label
                        className={`form-label small fw-medium ${darkMode ? "text-light" : "text-dark"}`}
                      >
                        Ngày
                      </label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            date: e.target.value,
                          })
                        }
                        className="form-control-custom"
                      />
                    </div>

                    <div>
                      <label
                        className={`form-label small fw-medium ${darkMode ? "text-light" : "text-dark"}`}
                      >
                        Giờ
                      </label>
                      <select
                        value={bookingData.time}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            time: e.target.value,
                          })
                        }
                        className="form-control-custom"
                      >
                        <option value="">Chọn giờ</option>
                        {Array.from({ length: 14 }, (_, i) => i + 8).map(
                          (hour) => (
                            <option key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    <div>
                      <label
                        className={`form-label small fw-medium ${darkMode ? "text-light" : "text-dark"}`}
                      >
                        Thời lượng (giờ)
                      </label>
                      <select
                        value={bookingData.duration}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            duration: parseInt(e.target.value),
                          })
                        }
                        className="form-control-custom"
                      >
                        {[1, 2, 3, 4, 5, 6].map((hour) => (
                          <option key={hour} value={hour}>
                            {hour} giờ
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className={`form-label small fw-medium ${darkMode ? "text-light" : "text-dark"}`}
                      >
                        Ghi chú (tùy chọn)
                      </label>
                      <textarea
                        value={bookingData.notes}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            notes: e.target.value,
                          })
                        }
                        placeholder="Thêm ghi chú cho companion..."
                        rows={3}
                        className="form-control-custom"
                      />
                      className={`w-full p-3 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 placeholder-gray-500"} focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Xác nhận & Thanh toán
                  </h3>

                  <div
                    className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-gray-50"} mb-6`}
                  >
                    <h4
                      className={`font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Chi tiết đặt lịch
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Dịch vụ:
                        </span>
                        <span
                          className={darkMode ? "text-white" : "text-gray-900"}
                        >
                          {bookingData.service}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Ngày:
                        </span>
                        <span
                          className={darkMode ? "text-white" : "text-gray-900"}
                        >
                          {bookingData.date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Giờ:
                        </span>
                        <span
                          className={darkMode ? "text-white" : "text-gray-900"}
                        >
                          {bookingData.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Thời lượng:
                        </span>
                        <span
                          className={darkMode ? "text-white" : "text-gray-900"}
                        >
                          {bookingData.duration} giờ
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span
                            className={
                              darkMode ? "text-white" : "text-gray-900"
                            }
                          >
                            Tổng cộng:
                          </span>
                          <span className="text-purple-500">
                            {totalPrice.toLocaleString()}k VND
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Phương thức thanh toán
                      </label>
                      <div className="space-y-2">
                        <button
                          className={`w-full p-3 rounded-xl border-2 border-purple-500 bg-purple-50 ${darkMode ? "bg-purple-900/20" : ""} flex items-center space-x-3`}
                        >
                          <CreditCard className="w-5 h-5 text-purple-500" />
                          <span
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            Thẻ tín dụng/ghi nợ
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                    className="success-icon d-flex align-items-center justify-content-center mx-auto mb-4"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '50%'
                    }}
                  >
                    <Check className="text-white" style={{ width: '40px', height: '40px' }} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h3
                      className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Đặt lịch thành công!
                    </h3>
                    <p
                      className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}
                    >
                      Companion sẽ liên hệ với bạn sớm để xác nhận chi tiết.
                    </p>
                    <div
                      className={`inline-flex items-center space-x-1 text-purple-500 text-sm`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Chúc bạn có trải nghiệm tuyệt vời!</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {step < 4 && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Quay lại
              </button>

              <motion.button
                onClick={step === 3 ? handleComplete : handleNext}
                disabled={
                  (step === 1 && !bookingData.service) ||
                  (step === 2 && (!bookingData.date || !bookingData.time))
                }
                className={`px-3 py-2 rounded-3 fw-medium transition-all ${(step === 1 && !bookingData.service) ||
                  (step === 2 && (!bookingData.date || !bookingData.time))
                  ? "bg-secondary text-muted"
                  : "btn-gradient text-white shadow-sm"
                  }`}
                whileHover={
                  !(
                    (step === 1 && !bookingData.service) ||
                    (step === 2 && (!bookingData.date || !bookingData.time))
                  )
                    ? { scale: 1.05 }
                    : {}
                }
                whileTap={
                  !(
                    (step === 1 && !bookingData.service) ||
                    (step === 2 && (!bookingData.date || !bookingData.time))
                  )
                    ? { scale: 0.95 }
                    : {}
                }
              >
                {step === 3 ? "Thanh toán" : "Tiếp theo"}
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
