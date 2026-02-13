import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";


export default function SignUpPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/signup`,
                formData
            );

            toast.success("Signup successful, Please Login to continue🚀");

            navigate('/login');

        } catch (error) {
           toast.error(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-3xl font-bold text-green-400">BlackBox</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
                    <p className="text-gray-400">Join thousands of developers today</p>
                </div>

                {/* Sign Up Form */}
                <div className="bg-gray-800/50 border border-green-500/20 rounded-xl p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    maxLength={8}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-900 border border-green-500/30 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>


                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    maxLength={8}
                                    className="w-full bg-gray-900 border border-green-500/30 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-500 cursor-pointer text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-all transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-gray-400 mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}

                            className="text-green-400 cursor-pointer hover:text-green-300 font-semibold"
                        >
                            Login
                        </button>
                    </p>
                </div>

                {/* Back to Home */}
                <button
                    onClick={() => navigate('/')}
                    className="w-full text-center cursor-pointer text-gray-400 hover:text-green-400 mt-6 transition-colors"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}