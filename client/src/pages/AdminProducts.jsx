import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBox, FiPlus, FiEdit2, FiTrash2, FiSearch, FiLayers, FiDollarSign } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDZD } from '../utils/formatCurrency';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                // Mock for preview
                setProducts([
                    { id: 1, name: 'TurboCharge 65W GaN', category: 'Chargers', base_price: 4500, stock_quantity: 42, wholesale_enabled: true },
                    { id: 2, name: 'Coque Silicone MagSafe', category: 'Phone cases', base_price: 2500, stock_quantity: 120, wholesale_enabled: false },
                ]);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const toggleWholesale = async (id, current) => {
        try {
            await axios.put(`/api/admin/product/${id}/wholesale`, { wholesale_enabled: !current });
            setProducts(products.map(p => p.id === id ? { ...p, wholesale_enabled: !current } : p));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                    <span className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Contrôle de l'offre</span>
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Inventaire</h1>
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Chercher un produit..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-darkSecondary/50 border border-white/5 text-white rounded-2xl py-3 pl-12 pr-4 focus:border-goldPrimary"
                        />
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-goldPrimary text-darkPrimary px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                    >
                        <FiPlus /> Nouveau Produit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product, i) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        key={product.id} 
                        className="bg-darkSecondary/30 border border-white/5 rounded-[2.5rem] p-8 group hover:bg-white/[0.02] transition-colors"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-goldPrimary group-hover:scale-110 transition-transform">
                                <FiBox size={28} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"><FiEdit2 size={16} /></button>
                                <button className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"><FiTrash2 size={16} /></button>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div>
                                <h3 className="text-white font-black text-xl tracking-tight leading-tight">{product.name}</h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">{product.category}</p>
                            </div>
                            <div className="flex justify-between items-center py-4 border-y border-white/5">
                                <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Prix de base</div>
                                <div className="text-white font-black text-lg">{formatDZD(product.base_price)}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">En Stock</div>
                                <div className={`font-black text-lg ${product.stock_quantity < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                    {product.stock_quantity}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-darkPrimary/50 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${product.wholesale_enabled ? 'bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-600'}`} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Vente en Gros</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={product.wholesale_enabled} 
                                    onChange={() => toggleWholesale(product.id, product.wholesale_enabled)}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-goldPrimary"></div>
                            </label>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Simpler Modal Mock for the flow */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass-morphism">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-darkPrimary border border-white/10 w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl"
                        >
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">Nouveau Produit Elite</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Nom du Produit</label>
                                        <input type="text" className="w-full bg-darkSecondary/50 border border-white/5 text-white rounded-2xl py-4 px-6 outline-none focus:border-goldPrimary" placeholder="Câble Ultra..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Catégorie</label>
                                        <select className="w-full bg-darkSecondary/50 border border-white/5 text-white rounded-2xl py-4 px-6 outline-none focus:border-goldPrimary">
                                            <option>Câbles</option>
                                            <option>Chargeurs</option>
                                            <option>Coques</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Prix Public (DA)</label>
                                        <input type="number" className="w-full bg-darkSecondary/50 border border-white/5 text-white rounded-2xl py-4 px-6 outline-none focus:border-goldPrimary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Stock Initial</label>
                                        <input type="number" className="w-full bg-darkSecondary/50 border border-white/5 text-white rounded-2xl py-4 px-6 outline-none focus:border-goldPrimary" />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold hover:text-white transition-all text-sm uppercase tracking-widest">Annuler</button>
                                    <button className="flex-1 py-4 bg-goldPrimary text-darkPrimary font-black rounded-2xl hover:scale-105 transition-all text-xs uppercase tracking-widest">Ajouter au Catalogue</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProducts;
