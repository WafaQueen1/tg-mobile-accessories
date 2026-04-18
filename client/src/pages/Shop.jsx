import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiSearch, FiEye, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDZD } from '../utils/formatCurrency';
import QuickViewModal from '../components/QuickViewModal';

const Shop = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedQuickView, setSelectedQuickView] = useState(null);
    
    // Filters State
    const [priceRange, setPriceRange] = useState(10000);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Collection' },
        { id: 'cases', name: 'Phone Cases' },
        { id: 'chargers', name: 'Chargers' },
        { id: 'audio', name: 'Audio' }
    ];

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setProducts([
                { id: 1, category: 'cases', name: 'CyberArmor iPhone 15 Pro Case', base_price: 2500, stock_quantity: 12, image_url: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800' },
                { id: 2, category: 'chargers', name: 'TurboCharge 65W GaN Adapter', base_price: 4500, stock_quantity: 50, image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800' },
                { id: 3, category: 'audio', name: 'Liquid Gold AirPods Pro Case', base_price: 1500, stock_quantity: 4, image_url: 'https://images.unsplash.com/photo-1600294037681-c8004b3419bb?auto=format&fit=crop&q=80&w=800' },
                { id: 4, category: 'cases', name: 'Titanium Edge S24 Ultra', base_price: 2800, stock_quantity: 20, image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800' },
                { id: 5, category: 'chargers', name: 'Magnetic Wireless Pad', base_price: 3500, stock_quantity: 15, image_url: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=800' }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const filteredProducts = products.filter(p => {
        const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchPrice = p.base_price <= priceRange;
        return matchCategory && matchPrice;
    });

    return (
        <div className="dark:bg-darkPrimary min-h-screen pt-24 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <span className="text-goldPrimary font-bold tracking-widest text-sm mb-2 block uppercase">Premium Catalog</span>
                        <h1 className="text-4xl font-bold dark:text-white">{t('shop')}</h1>
                    </div>
                    
                    <button 
                        onClick={() => setShowMobileFilters(true)}
                        className="md:hidden flex items-center gap-2 bg-darkSecondary text-white px-6 py-3 rounded-xl border border-gray-800"
                    >
                        <FiFilter /> Filters
                    </button>
                </div>

                <div className="flex gap-12">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden md:block w-64 space-y-10 flex-shrink-0">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 tracking-wide uppercase text-sm border-l-4 border-goldPrimary pl-3">Categories</h3>
                            <div className="space-y-3">
                                {categories.map(cat => (
                                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="radio" 
                                            name="category" 
                                            checked={selectedCategory === cat.id}
                                            onChange={() => setSelectedCategory(cat.id)}
                                            className="hidden" 
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                                            selectedCategory === cat.id ? 'border-goldPrimary bg-goldPrimary' : 'border-gray-700'
                                        }`}>
                                            {selectedCategory === cat.id && <div className="w-2 h-2 bg-darkPrimary rounded-full"></div>}
                                        </div>
                                        <span className={`text-sm transition-colors ${
                                            selectedCategory === cat.id ? 'text-goldPrimary font-bold' : 'text-gray-500 hover:text-gray-300'
                                        }`}>{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 tracking-wide uppercase text-sm border-l-4 border-goldPrimary pl-3">Max Price</h3>
                            <input 
                                type="range" 
                                min="1000" 
                                max="10000" 
                                step="500" 
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                className="w-full accent-goldPrimary bg-gray-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                <span>1,000 DA</span>
                                <span className="text-goldPrimary">{formatDZD(priceRange)}</span>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="h-96 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-goldPrimary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="h-96 flex flex-col items-center justify-center text-gray-500 bg-darkSecondary/30 rounded-3xl border border-dashed border-gray-800">
                                <p className="text-xl mb-4">No products match your filters</p>
                                <button onClick={() => {setSelectedCategory('all'); setPriceRange(10000);}} className="text-goldPrimary font-bold hover:underline">Reset Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="group relative">
                                        <Link to={`/product/${product.id}`} className="block card-luxury overflow-hidden">
                                            <div className="aspect-square bg-white dark:bg-darkSecondary mb-6 overflow-hidden relative">
                                                <img 
                                                    src={product.image_url} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                                />
                                                {/* Hover Actions */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedQuickView(product);
                                                        }}
                                                        className="p-4 bg-white text-darkPrimary rounded-full hover:bg-goldPrimary transition-colors"
                                                        title="Quick View"
                                                    >
                                                        <FiEye size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-lg dark:text-gray-100 mb-2 truncate group-hover:text-goldPrimary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-goldPrimary font-black text-xl">{formatDZD(product.base_price)}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                            className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-darkPrimary z-[210] p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-bold text-white">Filters</h2>
                                <button onClick={() => setShowMobileFilters(false)} className="text-white"><FiX size={28}/></button>
                            </div>
                            
                            <div className="flex-1 space-y-12">
                                <div>
                                    <h3 className="text-goldPrimary font-bold text-xs uppercase tracking-widest mb-6">By Category</h3>
                                    <div className="space-y-4">
                                        {categories.map(cat => (
                                            <button 
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`block w-full text-left text-lg ${selectedCategory === cat.id ? 'text-white font-bold' : 'text-gray-500'}`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-goldPrimary font-bold text-xs uppercase tracking-widest mb-6">Max Price: {formatDZD(priceRange)}</h3>
                                    <input 
                                        type="range" 
                                        min="1000" 
                                        max="10000" 
                                        step="500" 
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full accent-goldPrimary h-2 bg-gray-800 rounded-lg appearance-none"
                                    />
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setShowMobileFilters(false)}
                                className="btn-gold py-4"
                            >
                                Apply Filters
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Shop;
