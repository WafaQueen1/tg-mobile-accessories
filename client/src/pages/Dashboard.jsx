import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiHeart, FiUser, FiSettings, FiLogOut, FiArrowRight, FiShield } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                // Placeholder for actual data fetching
                // const ordersRes = await axios.get('/api/orders/my-orders');
                // const wishlistRes = await axios.get('/api/wishlist');
                // setOrders(ordersRes.data.data);
                // setWishlist(wishlistRes.data.data);
                
                // MOCK DATA for now to show the UI
                setOrders([
                    { id: 'TG-9928', date: '2023-11-15', status: 'En livraison', total: '14,500 DA' },
                    { id: 'TG-8812', date: '2023-10-22', status: 'Livré', total: '8,200 DA' },
                ]);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, navigate]);

    const tabs = [
        { id: 'orders', label: 'Commandes', icon: FiPackage },
        { id: 'wishlist', label: 'Favoris', icon: FiHeart },
        { id: 'profile', label: 'Profil', icon: FiUser },
    ];

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center bg-darkPrimary">
            <div className="w-12 h-12 border-4 border-goldPrimary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20 bg-darkPrimary">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Bonjour, {user?.name}</h1>
                        <p className="text-gray-400 font-medium">Gérez vos commandes et vos préférences</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {user?.role === 'admin' && (
                            <button 
                                onClick={() => navigate('/tg-admin')}
                                className="px-6 py-3 bg-goldPrimary/10 text-goldPrimary border border-goldPrimary/20 rounded-2xl font-bold flex items-center gap-2 hover:bg-goldPrimary hover:text-darkPrimary transition-all"
                            >
                                <FiShield />
                                Admin Panel
                            </button>
                        )}
                        <button 
                            onClick={logout}
                            className="px-6 py-3 bg-gray-800 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-red-500 transition-all"
                        >
                            <FiLogOut />
                            Deconnexion
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-goldPrimary text-darkPrimary shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <Icon size={20} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {activeTab === 'orders' && (
                                <motion.div 
                                    key="orders"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6">Historique des Commandes</h2>
                                    {orders.length > 0 ? (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order.id} className="bg-darkSecondary/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-goldPrimary">
                                                            <FiPackage size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-goldPrimary tracking-widest uppercase mb-1">{order.id}</p>
                                                            <h3 className="text-lg font-bold text-white">Commande effectuée le {order.date}</h3>
                                                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                                order.status === 'Livré' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-black text-white mb-2">{order.total}</p>
                                                        <button className="text-sm font-bold text-goldPrimary hover:underline flex items-center gap-2 ml-auto">
                                                            Voir les détails <FiArrowRight />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-3xl p-20 text-center">
                                            <FiPackage size={48} className="mx-auto text-gray-600 mb-4" />
                                            <p className="text-gray-500">Vous n'avez pas encore passé de commande.</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'wishlist' && (
                                <motion.div 
                                    key="wishlist"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6">Articles Favoris</h2>
                                    <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-3xl p-20 text-center">
                                        <FiHeart size={48} className="mx-auto text-gray-600 mb-4" />
                                        <p className="text-gray-500">Votre liste de favoris est vide.</p>
                                        <button 
                                            onClick={() => navigate('/shop')}
                                            className="mt-6 px-8 py-3 btn-gold"
                                        >
                                            Découvrir la boutique
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'profile' && (
                                <motion.div 
                                    key="profile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-darkSecondary/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-8">Informations Personnelles</h2>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Prénom</label>
                                                <input type="text" defaultValue={user?.name} className="w-full bg-darkPrimary/50 border border-gray-800 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-goldPrimary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                                <input type="email" defaultValue={user?.email} disabled className="w-full bg-darkPrimary/20 border border-gray-800 text-gray-500 rounded-2xl py-4 px-6 cursor-not-allowed" />
                                            </div>
                                        </div>
                                        <button className="btn-gold px-12 py-4">Mettre à jour</button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
