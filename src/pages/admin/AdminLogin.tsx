import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff, Leaf, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    React.useEffect(() => {
        if (user) {
            navigate('/admin');
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/admin');
        } catch (err: any) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please try again later.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 start-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 end-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 start-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 start-10 w-3 h-3 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="absolute top-40 end-20 w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                <div className="absolute bottom-40 start-1/3 w-4 h-4 bg-primary/15 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-md mx-4 relative z-10">
                {/* Logo / Brand */}
                <div className="text-center mb-8 fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-3xl shadow-xl mb-4 animate-float">
                        <Leaf size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Abu Zaid Store</h1>
                    <p className="text-gray-500 font-medium">Admin Dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-premium-lg p-8 border border-white/50 fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                        <p className="text-gray-500 text-sm">Sign in to manage your store</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 border border-red-100 fade-in">
                            <AlertCircle size={18} />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@abuzaidstore.com"
                                    required
                                    className="w-full ps-12 pe-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full ps-12 pe-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Lock size={18} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Back to store link */}
                <div className="text-center mt-6 fade-in" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="/"
                        className="text-sm text-gray-500 hover:text-primary font-medium transition-colors inline-flex items-center gap-1"
                    >
                        ← Back to Store
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
