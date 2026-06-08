import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiSearch, FiEye, FiX, FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDZD } from '../utils/formatCurrency';
import QuickViewModal from '../components/QuickViewModal';

const Shop = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedQuickView, setSelectedQuickView] = useState(null);
    
    // Filters State
    const [priceRange, setPriceRange] = useState(15000);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Collection Complète' },
        { id: 'cases', name: 'Coques' },
        { id: 'chargers', name: 'Chargeurs' },
        { id: 'powerbanks', name: 'Power Banks' },
        { id: 'earphones', name: 'Ecouteurs' },
        { id: 'cables', name: 'Câbles' },
        { id: 'airpods', name: 'AirPods Cases' },
        { id: 'protectors', name: 'Protections Ecran' },
        { id: 'mounts', name: 'Supports Voiture' },
        { id: 'smart', name: 'Accessoires Connectés' }
    ];

    useEffect(() => {
        // Mock data fetch - in production this would be an API call
        setTimeout(() => {
            setProducts([
                { id: 1, category: 'cases', name: 'CyberArmor iPhone 15 Pro Case', base_price: 2500, stock_quantity: 12, image_url: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800' },
                { id: 2, category: 'chargers', name: 'TurboCharge 65W GaN Adapter', base_price: 4500, stock_quantity: 50, image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800' },
                { id: 3, category: 'airpods', name: 'Liquid Gold AirPods Pro Case', base_price: 1500, stock_quantity: 4, image_url: 'https://images.unsplash.com/photo-1600294037681-c8004b3419bb?auto=format&fit=crop&q=80&w=800' },
                { id: 4, category: 'cases', name: 'Titanium Edge S24 Ultra', base_price: 2800, stock_quantity: 20, image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800' },
                { id: 5, category: 'chargers', name: 'Magnetic Wireless Pad', base_price: 3500, stock_quantity: 15, image_url: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=800' },
                { id: 6, category: 'earphones', name: 'ProTune Wireless Buds', base_price: 8500, stock_quantity: 8, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const filteredProducts = products.filter(p => {
        const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchPrice = p.base_price <= priceRange;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchPrice && matchSearch;
    }).sort((a, b) => {
        if (sortBy === 'price-asc') return a.base_price - b.base_price;
        if (sortBy === 'price-desc') return b.base_price - a.base_price;
        return b.id - a.id; // Newest first
    });

    return (
        <div className="bg-darkPrimary min-h-screen pt-28 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div className="space-y-2">
                        <span className="text-goldPrimary font-black tracking-[0.3em] text-xs block uppercase mb-4">Elite Catalog</span>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Boutique</h1>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-80">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Rechercher..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-darkSecondary/50 border border-gray-800 text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-goldPrimary"
                            />
                        </div>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full sm:w-auto bg-darkSecondary/50 border border-gray-800 text-white rounded-2xl py-3 px-6 focus:outline-none focus:border-goldPrimary font-bold text-sm outline-none cursor-pointer"
                        >
                            <option value="newest">Nouveautés</option>
                            <option value="price-asc">Prix: Croissant</option>
                            <option value="price-desc">Prix: Décroissant</option>
                        </select>
                        <button 
                            onClick={() => setShowMobileFilters(true)}
                            className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-goldPrimary text-darkPrimary px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest"
                        >
                            <FiFilter /> Filtres
                        </button>
                    </div>
                </div>

                <div className="flex gap-16">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block w-72 space-y-12 flex-shrink-0">
                        <div>
                            <h3 className="text-white font-black text-xs mb-8 tracking-[0.2em] uppercase border-l-4 border-goldPrimary pl-4">Collections</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button 
                                        key={cat.id} 
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm tracking-wide ${
                                            selectedCategory === cat.id 
                                            ? 'bg-goldPrimary text-darkPrimary shadow-[0_5px_15px_rgba(212,175,55,0.2)]' 
                                            : 'text-gray-500 hover:bg-gray-800/50 hover:text-white'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-black text-xs mb-8 tracking-[0.2em] uppercase border-l-4 border-goldPrimary pl-4">Budget Max</h3>
                            <div className="px-2">
                                <input 
                                    type="range" 
                                    min="500" 
                                    max="50000" 
                                    step="500" 
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full accent-goldPrimary h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-6">
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Min: 500 DA</span>
                                    <span className="text-sm font-black text-goldPrimary uppercase tracking-widest">{priceRange.toLocaleString()} DA</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="h-[60vh] flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-goldPrimary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-500 bg-darkSecondary/20 rounded-[3rem] border border-dashed border-gray-800">
                                <FiSearch size={64} className="mb-6 opacity-20" />
                                <p className="text-xl font-bold mb-4">Aucun produit ne correspond à ces critères</p>
                                <button onClick={() => {setSelectedCategory('all'); setPriceRange(50000); setSearchQuery('');}} className="text-goldPrimary font-black hover:underline uppercase tracking-widest text-xs">Réinitialiser les filtres</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                                {filteredProducts.map(product => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={product.id} 
                                        className="group"
                                    >
                                        <div className="bg-darkSecondary/30 border border-gray-800/50 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-darkSecondary/50 hover:border-goldPrimary/30 hover:-translate-y-2 relative overflow-hidden">
                                            <Link to={`/product/${product.id}`} className="block">
                                                <div className="aspect-square mb-8 overflow-hidden relative rounded-3xl bg-darkPrimary/50">
                                                    <img 
                                                        src={product.image_url} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                                                    />
                                                    <div className="absolute inset-x-0 bottom-4 flex justify-center translate-y-20 group-hover:translate-y-0 transition-all duration-500">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSelectedQuickView(product);
                                                            }}
                                                            className="px-6 py-2 bg-white text-darkPrimary font-black text-[10px] rounded-full uppercase tracking-[0.2em] shadow-2xl hover:bg-goldPrimary"
                                                        >
                                                            Aperçu Rapide
                                                        </button>
                                                    </div>
                                                </div>
                                                <span className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">{product.category}</span>
                                                <h3 className="font-bold text-lg text-white mb-3 truncate">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <p className="text-white font-black text-2xl tracking-tighter">{product.base_price.toLocaleString()} <span className="text-xs text-goldPrimary ml-1 font-bold">DA</span></p>
                                                    <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 group-hover:border-goldPrimary group-hover:bg-goldPrimary group-hover:text-darkPrimary transition-all">
                                                        <FiArrowRight />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Concierge */}
            <a 
                href="https://wa.me/213000000000" // Replace with actual number
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-10 right-10 z-[150] bg-green-500 text-white p-5 rounded-3xl shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:scale-110 hover:-translate-y-2 transition-all flex items-center gap-3 group"
            >
                <div className="hidden lg:flex flex-col text-right items-end pr-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-0 group-hover:w-48 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#a7f3d0]">Concierge VIP</span>
                    <span className="text-sm font-bold whitespace-nowrap">Commander via WhatsApp</span>
                </div>
                <FiMessageCircle size={28} />
            </a>

            {/* Quick View Modal */}
            <QuickViewModal 
                product={selectedQuickView} 
                isOpen={!!selectedQuickView} 
                onClose={() => setSelectedQuickView(null)} 
            />

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/90 z-[200] backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-darkPrimary z-[210] p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Filtres</h2>
                                <button onClick={() => setShowMobileFilters(false)} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white"><FiX size={24}/></button>
                            </div>
                            
                            <div className="flex-1 space-y-12 overflow-y-auto pr-2">
                                <div>
                                    <h3 className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.3em] mb-8">Par Catégorie</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {categories.map(cat => (
                                            <button 
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`text-left p-4 rounded-2xl font-bold text-lg transition-all ${
                                                    selectedCategory === cat.id ? 'bg-goldPrimary text-darkPrimary' : 'text-gray-500 bg-darkSecondary/50'
                                                }`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.3em] mb-8">Budget Max: {priceRange.toLocaleString()} DA</h3>
                                    <input 
                                        type="range" 
                                        min="500" 
                                        max="50000" 
                                        step="500" 
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full accent-goldPrimary h-2 bg-gray-800 rounded-lg appearance-none"
                                    />
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full bg-goldPrimary text-darkPrimary py-5 rounded-2xl font-black uppercase tracking-widest text-sm mt-8 shadow-2xl"
                            >
                                Appliquer les Filtres
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
export default Shop;
