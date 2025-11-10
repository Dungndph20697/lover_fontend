import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children, showHeader = true, showFooter = true }) {
    const [darkMode, setDarkMode] = useState(false);

    // Load dark mode preference from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkMode(JSON.parse(savedDarkMode));
        } else {
            // Auto detect based on system preference
            setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    // Save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-vh-100 d-flex flex-column ${darkMode ? 'dark-mode bg-dark' : 'bg-white'}`}
            style={{ transition: 'all 0.3s ease' }}>
            {showHeader && (
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            )}

            <main className="flex-fill">
                {children}
            </main>

            {showFooter && (
                <Footer darkMode={darkMode} />
            )}
        </div>
    );
}
