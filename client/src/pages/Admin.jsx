import { useState, useEffect } from 'react';
import { FiShoppingBag, FiUsers, FiTrendingUp, FiAlertCircle, FiArrowUpRight, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { formatDZD } from '../utils/formatCurrency';

const Admin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/admin/stats');
                setData(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                // Mock fallback for preview
                setData({
                    stats: { totalOrders: 142, totalRevenue: 854000, totalUsers: 120, wholesaleSavings: 45000 },
                    lowStock: [
                        { id: 1, name: 'Coque iPhone 15 Pro', stock_quantity: 4, category: 'Coques' },
                        { id: 2, name: 'Câble USB-C 2m', stock_quantity: 2, category: 'Câbles' }
                    ]
                });
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-goldPrimary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const statCards = [
        { label: 'Revenu Total', value: formatDZD(data.stats.totalRevenue), icon: FiDollarSign, trend: '+12.5%', color: 'from-goldPrimary to-yellow-600' },
        { label: 'Commandes', value: data.stats.totalOrders, icon: FiShoppingBag, trend: '+8.2%', color: 'from-blue-500 to-indigo-600' },
        { label: 'Clients Elite', value: data.stats.totalUsers, icon: FiUsers, trend: '+5.4%', color: 'from-purple-500 to-pink-600' },
        { label: 'Économies Gros', value: formatDZD(data.stats.wholesaleSavings), icon: FiTrendingUp, trend: '+22.1%', color: 'from-green-500 to-emerald-600' },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div>
                <span className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.4em] mb-2 block text-center lg:text-left">Analyse de Performance</span>
                <h1 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter text-center lg:text-left">Command Center</h1>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {statCards.map((stat, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label} 
                        className="bg-darkSecondary/30 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-success font-bold text-xs flex items-center gap-1">
                                    <FiArrowUpRight /> {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">{stat.label}</h3>
                            <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                        </div>
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-full blur-2xl`} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder */}
                <div className="xl:col-span-2 bg-darkSecondary/30 border border-white/5 rounded-[3rem] p-10 min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-white font-black text-xl tracking-tight uppercase tracking-widest text-xs border-l-4 border-goldPrimary pl-4">Croissance des Ventes</h3>
                        <div className="flex gap-2">
                            {['7D', '1M', 'ALL'].map(t => (
                                <button key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${t === '1M' ? 'bg-goldPrimary text-darkPrimary' : 'text-gray-500 hover:text-white'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 flex items-end gap-3 px-4">
                        {[40, 60, 45, 90, 65, 80, 50, 95, 70, 85, 60].map((h, i) => (
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                key={i} 
                                className="flex-1 bg-gradient-to-t from-goldPrimary/10 to-goldPrimary/40 rounded-t-lg hover:from-goldPrimary hover:to-goldPrimary transition-all cursor-pointer relative group"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-darkPrimary font-black text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">{(h * 10).toLocaleString()}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-darkSecondary/30 border border-white/5 rounded-[3rem] p-10 flex flex-col">
                    <h3 className="text-white font-black text-xl tracking-tight uppercase tracking-widest text-xs border-l-4 border-red-500 pl-4 mb-10">Alertes Stock Bas</h3>
                    <div className="space-y-4">
                        {data.lowStock.map(item => (
                            <div key={item.id} className="flex items-center gap-4 p-5 bg-darkPrimary/50 border border-white/5 rounded-[2rem] group hover:border-red-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                    <FiAlertCircle size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-sm truncate">{item.name}</h4>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{item.category}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-red-500 font-black text-lg">{item.stock_quantity}</span>
                                    <span className="block text-[10px] text-gray-600 font-bold uppercase">Restant</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 w-full py-4 bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all">Voir tout l'inventaire</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
