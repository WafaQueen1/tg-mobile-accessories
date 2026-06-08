import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingBag, FiDownload, FiSearch, FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { formatDZD } from '../utils/formatCurrency';
import { motion } from 'framer-motion';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // In production, this would be a real API call
                // For now, I'll mock since I implemented the backend export logic but not a general list yet
                setTimeout(() => {
                    setOrders([
                        { id: 1024, full_name: 'Amine K.', total_amount: 15400, status: 'pending', created_at: new Date(), shipping_city: 'Alger' },
                        { id: 1025, full_name: 'Sara L.', total_amount: 2500, status: 'shipped', created_at: new Date(), shipping_city: 'Oran' },
                        { id: 1026, full_name: 'Mehdi R.', total_amount: 45000, status: 'confirmed', created_at: new Date(), shipping_city: 'Constantine' },
                    ]);
                    setLoading(false);
                }, 800);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        // Implementation for status update
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    };

    const statusColors = {
        pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        shipped: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
        cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
    };

    const statusIcons = {
        pending: <FiClock />,
        confirmed: <FiCheckCircle />,
        shipped: <FiTruck />,
        delivered: <FiCheckCircle />,
        cancelled: <FiXCircle />
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                    <span className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Gestion des Flux</span>
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Commandes</h1>
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Rechercher ID/Client..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-darkSecondary/50 border border-white/5 text-white rounded-2xl py-3 pl-12 pr-4 focus:border-goldPrimary"
                        />
                    </div>
                    <a 
                        href="/api/admin/export-orders" 
                        target="_blank"
                        className="flex items-center gap-2 bg-white text-darkPrimary px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-goldPrimary transition-all"
                    >
                        <FiDownload /> Export Master
                    </a>
                </div>
            </div>

            <div className="bg-darkSecondary/20 border border-white/5 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            <th className="p-8">Commande</th>
                            <th className="p-8">Client / Ville</th>
                            <th className="p-8">Montant</th>
                            <th className="p-8">Statut</th>
                            <th className="p-8 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.map((order) => (
                            <motion.tr 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={order.id} 
                                className="group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="p-8">
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-lg">#{order.id}</span>
                                        <span className="text-gray-500 text-xs font-bold">{new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">{order.full_name}</span>
                                        <span className="text-goldPrimary text-[10px] font-black uppercase tracking-widest">{order.shipping_city}</span>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <span className="text-white font-black text-xl tracking-tighter">
                                        {order.total_amount.toLocaleString()} <span className="text-xs text-goldPrimary ml-1">DA</span>
                                    </span>
                                </td>
                                <td className="p-8">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${statusColors[order.status]}`}>
                                        {statusIcons[order.status]} {order.status}
                                    </div>
                                </td>
                                <td className="p-8 text-right">
                                    <select 
                                        className="bg-darkPrimary border border-white/10 text-white rounded-xl py-2 px-4 text-xs font-bold outline-none focus:border-goldPrimary cursor-pointer"
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        <option value="pending">En attente</option>
                                        <option value="confirmed">Confirmé</option>
                                        <option value="shipped">Expédié</option>
                                        <option value="delivered">Livré</option>
                                        <option value="cancelled">Annulé</option>
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
