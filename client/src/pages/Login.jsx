import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const { login, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const success = await googleLogin(credentialResponse.credential);
        if (success) {
            navigate('/');
        } else {
            setError('Google login failed');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6 bg-darkPrimary bg-[radial-gradient(circle_at_50%_50%,#1a1a2e_0%,#0b0b0f_100%)]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Bienvenue</h1>
                    <p className="text-gray-400">Connectez-vous pour accéder à votre espace TG Mobile</p>
                </div>

                <div className="bg-darkSecondary/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                    <FiMail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary focus:ring-1 focus:ring-goldPrimary transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Mot de passe</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                    <FiLock size={18} />
                                </div>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary focus:ring-1 focus:ring-goldPrimary transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full btn-gold py-4 flex items-center justify-center gap-3 text-lg group shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            Log In
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Ou continuer avec</span>
                        <div className="flex-1 h-px bg-gray-800"></div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Login Failed')}
                            theme="filled_black"
                            shape="pill"
                            width="100%"
                        />
                    </div>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Vous n'avez pas de compte ?{' '}
                        <Link to="/register" className="text-goldPrimary font-bold hover:underline transition-all">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
