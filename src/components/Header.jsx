import { useState } from "react";
import { motion } from "motion/react";
import { Heart, User, LogOut, Settings, Moon, Sun, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Header({ darkMode, toggleDarkMode }) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logout();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className={`navbar navbar-expand-lg navbar-custom sticky-top ${darkMode ? 'dark-mode' : ''}`}>
            <div className="container">
                {/* Logo */}
                <Link to="/" className="navbar-brand d-flex align-items-center navbar-brand-custom">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="me-2"
                    >
                        <Heart className="text-pink" style={{ width: '2rem', height: '2rem' }} fill="currentColor" />
                    </motion.div>
                    Love Companion
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? (
                        <X style={{ width: '1.5rem', height: '1.5rem' }} />
                    ) : (
                        <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
                    )}
                </button>

                {/* Navigation */}
                <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link nav-link-custom">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/companion" className="nav-link nav-link-custom">
                                Khám phá
                            </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link nav-link-custom">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* User Actions */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <motion.button
                            onClick={toggleDarkMode}
                            className="btn btn-outline-secondary btn-sm rounded-circle p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {darkMode ? (
                                <Sun style={{ width: '1rem', height: '1rem' }} />
                            ) : (
                                <Moon style={{ width: '1rem', height: '1rem' }} />
                            )}
                        </motion.button>

                        {/* User Menu */}
                        {isAuthenticated && user ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-primary dropdown-toggle"
                                    type="button"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    <User style={{ width: '1rem', height: '1rem' }} className="me-2" />
                                    {user.username || user.fullName || 'User'}
                                </button>
                                <ul className={`dropdown-menu ${showUserMenu ? 'show' : ''}`}>
                                    <li>
                                        <Link to="/dashboard" className="dropdown-item">
                                            <Settings style={{ width: '1rem', height: '1rem' }} className="me-2" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="dropdown-item">
                                            <LogOut style={{ width: '1rem', height: '1rem' }} className="me-2" />
                                            Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                {!loading && (
                                    <>
                                        <Link to="/login" className="btn btn-outline-primary">
                                            Đăng nhập
                                        </Link>
                                        <Link to="/register" className="btn btn-gradient-primary">
                                            Đăng ký
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
