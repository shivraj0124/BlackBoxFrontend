import React, { useState } from 'react';
import { Code, Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
        closeMenu();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        closeMenu();
    };

    return (
        <nav className="border-b border-green-500/20 bg-black backdrop-blur-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleNavigation('/')}
                    >
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-green-400">BlackBox</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/leaderboard')}
                            className="px-6 border rounded-md bg-green-900 border-green-500/30 py-2 cursor-pointer text-green-100 hover:text-green-300 transition-colors"
                        >
                            Leaderboard
                        </button>
                        <button
                            onClick={() => navigate('/file-explorer')}
                            className="px-6 border rounded-md bg-green-900 border-green-500/30 py-2 cursor-pointer text-green-100 hover:text-green-300 transition-colors"
                        >
                            Files
                        </button>

                        {user == null ? (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-6 py-2 cursor-pointer text-green-400 hover:text-green-300 transition-colors"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-6 py-2 cursor-pointer bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-all transform hover:scale-105"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/30">
                                    <User className="w-5 h-5 text-green-400" />
                                    <span className="text-green-400 font-semibold">
                                        {user?.username}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 cursor-pointer py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-green-400 hover:text-green-300 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`
                        md:hidden overflow-hidden transition-all duration-300 ease-in-out
                        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <div className="py-4 space-y-3 border-t border-green-500/20">
                        {/* User Info (Mobile) */}
                        {user && (
                            <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/30">
                                <User className="w-5 h-5 text-green-400" />
                                <span className="text-green-400 font-semibold">
                                    {user?.username}
                                </span>
                            </div>
                        )}

                        {/* Leaderboard Button */}
                        <button
                            onClick={() => handleNavigation('/leaderboard')}
                            className="w-full text-left px-4 py-3 rounded-lg bg-green-900 border border-green-500/30 text-green-100 hover:text-green-300 transition-colors"
                        >
                            Leaderboard
                        </button>
                        <button
                            onClick={() => handleNavigation('/file-explorer')}
                            className="w-full text-left px-4 py-3 rounded-lg bg-green-900 border border-green-500/30 text-green-100 hover:text-green-300 transition-colors"
                        >
                            Files
                        </button>

                        {/* Auth Buttons */}
                        {user == null ? (
                            <>
                                <button
                                    onClick={() => handleNavigation('/login')}
                                    className="w-full text-left px-4 py-3 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => handleNavigation('/signup')}
                                    className="w-full px-4 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-all"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;