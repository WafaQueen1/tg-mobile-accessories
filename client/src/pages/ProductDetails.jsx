import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { FiMinus, FiPlus, FiCheck, FiShield, FiTruck, FiChevronDown, FiMessageCircle, FiHeart, FiShare2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDZD } from '../utils/formatCurrency';

const ProductDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    // DUMMY FETCH - In production fetch from API
    useEffect(() => {
        const mockProduct = {
            id: parseInt(id),
            name: parseInt(id) === 1 ? 'CyberArmor iPhone 15 Pro Case' : 'Premium Luxury Accessory',
            description: 'Conçue pour l’excellence, cette coque allie protection de qualité aérospatiale et esthétique minimaliste raffinée. Finition dorée 24 carats mate, résistante aux empreintes et aux rayures.',
            base_price: 2500,
            stock_quantity: 120,
            wholesale_enabled: true,
            image_url: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=1200',
            bulk_tiers: [
                { min_quantity: 10, max_quantity: 49, price_per_unit: 2000 },
                { min_quantity: 50, max_quantity: null, price_per_unit: 1500 }
            ],
            specifications: [
                { key: 'Matériau', value: 'Double injection TPU + Polycarbonate' },
                { key: 'Poids', value: '32g (Ultra-Léger)' },
                { key: 'Protection', value: 'Certifiée MIL-STD 810G (3 mètres)' },
                { key: 'Compatibilité', value: 'MagSafe Intégré' }
            ]
        };
        setProduct(mockProduct);
        setCurrentPrice(mockProduct.base_price);
    }, [id]);

    useEffect(() => {
        if (!product) return;
        let applicablePrice = product.base_price;
        if (product.wholesale_enabled && product.bulk_tiers) {
            for (const tier of product.bulk_tiers) {
                if (quantity >= tier.min_quantity) {
                    if (tier.max_quantity === null || quantity <= tier.max_quantity) {
                        applicablePrice = tier.price_per_unit;
                    }
                }
            }
        }
        setCurrentPrice(applicablePrice);
    }, [quantity, product]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-darkPrimary">
            <div className="w-16 h-16 border-4 border-goldPrimary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const isWholesaleActive = quantity >= (product.bulk_tiers?.[0]?.min_quantity || 9999);
    const savings = (product.base_price - currentPrice) * quantity;

    return (
        <div className="bg-darkPrimary min-h-screen pt-28 pb-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                    
                    {/* Image Gallery with Zoom */}
                    <div className="space-y-6">
                        <div 
                            className="relative aspect-square rounded-[3rem] overflow-hidden bg-darkSecondary/20 border border-white/5 cursor-zoom-in group"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                        >
                            <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className={`w-full h-full object-contain p-12 transition-transform duration-500 scale-100 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                            />
                            {isZoomed && (
                                <div 
                                    className="absolute inset-0 w-full h-full bg-no-repeat bg-contain"
                                    style={{
                                        backgroundImage: `url(${product.image_url})`,
                                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                        backgroundSize: '200%'
                                    }}
                                />
                            )}
                            <div className="absolute top-6 right-6 flex flex-col gap-3">
                                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-goldPrimary hover:text-darkPrimary transition-all">
                                    <FiHeart size={20} />
                                </button>
                                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-goldPrimary hover:text-darkPrimary transition-all">
                                    <FiShare2 size={20} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Thumbnails (Simulated) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1,2,3,4].map(i => (
                                <div key={i} className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer ${i === 1 ? 'border-goldPrimary bg-goldPrimary/10' : 'border-white/5 bg-darkSecondary/20 hover:border-white/20'}`}>
                                    <img src={product.image_url} alt="" className="w-full h-full object-contain p-2 opacity-50 hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <span className="text-goldPrimary font-black text-xs uppercase tracking-[0.4em] mb-4 block">TG Gold Series</span>
                            <h1 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                                {product.name}
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                {product.description}
                            </p>
                            
                            <div className="flex items-end gap-6 mb-10">
                                <div>
                                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block mb-2">Prix Unitaire</span>
                                    <div className="flex items-baseline gap-3">
                                        <span className={`text-5xl font-black tracking-tighter transition-all duration-500 ${isWholesaleActive ? 'text-goldPrimary scale-110' : 'text-white'}`}>
                                            {currentPrice.toLocaleString()} <span className="text-sm">DA</span>
                                        </span>
                                        {!isWholesaleActive && product.wholesale_enabled && (
                                            <span className="text-gray-500 line-through font-bold">{product.base_price.toLocaleString()} DA</span>
                                        )}
                                    </div>
                                </div>
                                {isWholesaleActive && (
                                    <div className="bg-success/10 px-4 py-2 rounded-xl border border-success/30 animate-bounce">
                                        <span className="text-success font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                            <FiCheck /> Économies: {savings.toLocaleString()} DA
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bulk Tiers Table */}
                        {product.wholesale_enabled && (
                            <div className="mb-10 bg-darkSecondary/20 border border-white/5 rounded-[2rem] p-8">
                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-goldPrimary rounded-full"></div> 
                                    Tarifs de Gros (Wholesale)
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {product.bulk_tiers.map((tier, idx) => {
                                        const isActive = quantity >= tier.min_quantity && (tier.max_quantity === null || quantity <= tier.max_quantity);
                                        return (
                                            <div 
                                                key={idx} 
                                                className={`flex justify-between items-center p-5 rounded-2xl transition-all border ${
                                                    isActive 
                                                    ? 'bg-goldPrimary border-goldPrimary text-darkPrimary' 
                                                    : 'bg-darkPrimary/50 border-white/5 text-gray-400'
                                                }`}
                                            >
                                                <div className="flex flex-col">
                                                    <span className={`text-xs font-black uppercase tracking-widest ${isActive ? 'text-darkPrimary/60' : 'text-goldPrimary'}`}>
                                                        Volume {idx + 1}
                                                    </span>
                                                    <span className="font-bold text-lg">
                                                        {tier.min_quantity}{tier.max_quantity ? ` - ${tier.max_quantity}` : '+'} unités
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-2xl font-black tracking-tighter">
                                                        {tier.price_per_unit.toLocaleString()} DA
                                                    </span>
                                                    <span className={`text-[10px] font-black uppercase ${isActive ? 'text-darkPrimary/60' : 'text-gray-600'}`}>
                                                        Par unité
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex items-center bg-darkSecondary/50 border border-white/5 rounded-2xl p-2 h-16">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-12 h-full flex items-center justify-center text-white hover:text-goldPrimary transition-colors"
                                >
                                    <FiMinus size={20} />
                                </button>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 bg-transparent text-center text-white font-black text-xl outline-none"
                                />
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-12 h-full flex items-center justify-center text-white hover:text-goldPrimary transition-colors"
                                >
                                    <FiPlus size={20} />
                                </button>
                            </div>
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-white text-darkPrimary font-black uppercase tracking-[0.2em] text-sm h-16 rounded-2xl hover:bg-goldPrimary transition-all shadow-2xl hover:scale-[1.02] active:scale-95"
                            >
                                Ajouter au Panier
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 mb-12 border-t border-white/5 pt-10">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-darkSecondary flex items-center justify-center text-goldPrimary group-hover:scale-110 transition-transform">
                                    <FiShield size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">Garantie 12 Mois</span>
                                    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Qualité TG Luxury</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-darkSecondary flex items-center justify-center text-goldPrimary group-hover:scale-110 transition-transform">
                                    <FiTruck size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">Livr. 58 Wilayas</span>
                                    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Expédition Rapide</span>
                                </div>
                            </div>
                        </div>

                        {/* Accordion Specs */}
                        <div className="space-y-4">
                            <div className="bg-darkSecondary/10 rounded-2xl border border-white/5 overflow-hidden">
                                <button 
                                    onClick={() => setActiveTab(activeTab === 'specs' ? '' : 'specs')}
                                    className="w-full flex justify-between items-center p-6 text-white font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-colors"
                                >
                                    <span>Spécifications Techniques</span>
                                    <FiChevronDown className={`transition-transform duration-300 ${activeTab === 'specs' ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeTab === 'specs' && (
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden bg-darkPrimary/30"
                                        >
                                            <div className="p-6 space-y-4">
                                                {product.specifications.map((spec, i) => (
                                                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                                                        <span className="text-gray-500 font-bold text-sm">{spec.key}</span>
                                                        <span className="text-white font-bold text-sm">{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* WhatsApp Inquiry */}
                        <a 
                            href={`https://wa.me/213000000000?text=Je suis intéressé par ${product.name} (ID: ${product.id})`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 flex items-center justify-center gap-3 text-green-500 font-black uppercase text-xs tracking-widest border border-green-500/20 py-4 rounded-xl hover:bg-green-500/10 transition-all"
                        >
                            <FiMessageCircle size={18} /> Demande de Devis de Gros
                        </a>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Bar */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-[100] bg-darkSecondary/80 backdrop-blur-xl border-t border-white/5 p-4 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none">Total</span>
                    <span className="text-xl font-black text-white">{(currentPrice * quantity).toLocaleString()} DA</span>
                </div>
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-goldPrimary text-darkPrimary font-black uppercase tracking-widest text-xs h-14 rounded-xl shadow-lg"
                >
                    Acheter Maintenant
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
