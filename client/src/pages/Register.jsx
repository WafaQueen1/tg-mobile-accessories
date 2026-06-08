import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const { googleLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirm_password) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
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
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6 bg-darkPrimary bg-[radial-gradient(circle_at_50%_0%,#1a1a2e_0%,#0b0b0f_100%)]">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Créer un Compte</h1>
                    <p className="text-gray-400 font-medium">Rejoignez l'élite des accessoires mobiles en Algérie</p>
                </div>

                <div className="bg-darkSecondary/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative gold accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-goldPrimary/5 blur-[100px]" />
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Prénom</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                        <FiUser size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Ahmed"
                                        className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                        <FiUser size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Kaci"
                                        className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                    <FiMail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                    className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                        <FiLock size={18} />
                                    </div>
                                    <input 
                                        type="password" 
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirmer</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-goldPrimary transition-colors">
                                        <FiLock size={18} />
                                    </div>
                                    <input 
                                        type="password" 
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-goldPrimary transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn-gold py-4 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-goldPrimary/30"
                        >
                            {loading ? 'Création...' : 'S\'inscrire'}
                            {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4 relative z-10">
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Ou s'inscrire avec</span>
                        <div className="flex-1 h-px bg-gray-800"></div>
                    </div>

                    <div className="flex justify-center relative z-10">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Registration Failed')}
                            theme="filled_black"
                            shape="pill"
                            width="100%"
                        />
                    </div>

                    <p className="mt-8 text-center text-gray-500 text-sm relative z-10">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" className="text-goldPrimary font-bold hover:underline transition-all">
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
