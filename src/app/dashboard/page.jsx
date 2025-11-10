"use client";

import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import DashboardCCDV from "./dashboard-ccdv.jsx";

export default function DashboardPage() {
  const { user, isAuthenticated, logout, loading, isProvider, isUser } =
    useAuth();
  const navigate = useNavigate();

  // Redirect nếu chưa đăng nhập
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
    console.log("aaaaaaaaa", user);
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Kiểm tra role và render dashboard tương ứng
  if (user.role.name === "Service_provider") {
    return <DashboardCCDV />;
  }

  // Render dashboard cho USER thường
  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container" style={{ maxWidth: "56rem" }}>
        <div className="glass-card p-4 mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="h2 fw-bold text-dark">
                Chào mừng,{" "}
                {user.nickname || `${user.first_name} ${user.last_name}`}!
              </h1>
              <p className="text-muted mt-2">Người dùng (USER)</p>
            </div>
            <button
              onClick={() => {
                // logout();

                navigate("/");
              }}
              className="btn btn-danger"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* User Dashboard Content */}
        <div className="glass-card p-4">
          <h2 className="h4 fw-semibold text-dark mb-4">
            Dashboard Người dùng
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="bg-primary bg-opacity-10 p-4 rounded-3">
                <h3 className="h6 fw-semibold text-primary mb-2">
                  Dịch vụ đã sử dụng
                </h3>
                <p className="display-6 fw-bold text-primary">0</p>
                <p className="text-primary-emphasis small mt-1">
                  Lần sử dụng dịch vụ
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgba(233, 30, 99, 0.1)" }}
                className="p-4 rounded-3"
              >
                <h3
                  className="h6 fw-semibold mb-2"
                  style={{ color: "#e91e63" }}
                >
                  Yêu thích
                </h3>
                <p className="display-6 fw-bold" style={{ color: "#e91e63" }}>
                  0
                </p>
                <p className="small mt-1" style={{ color: "#e91e63" }}>
                  Dịch vụ yêu thích
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-info bg-opacity-10 p-4 rounded-3">
                <h3 className="h6 fw-semibold text-info mb-2">Đánh giá</h3>
                <p className="display-6 fw-bold text-info">10</p>
                <p className="text-info-emphasis small mt-1">
                  Đánh giá đã viết
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
