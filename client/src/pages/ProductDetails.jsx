import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { formatDZD } from '../utils/formatCurrency';

const ProductDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0);

    // DUMMY FETCH
    useEffect(() => {
        // In real app, fetch from api using id
        const mockProduct = {
            id: parseInt(id),
            name: parseInt(id) === 1 ? 'CyberArmor iPhone 15 Pro Case' : 'Premium Accessory',
            description: 'Sleek luxury design with shockproof protection.',
            base_price: 2500,
            stock_quantity: 120,
            wholesale_enabled: true,
            image_url: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800',
            bulk_tiers: [
                { min_quantity: 10, max_quantity: 49, price_per_unit: 2000 },
                { min_quantity: 50, max_quantity: null, price_per_unit: 1500 }
            ]
        };
        setProduct(mockProduct);
        setCurrentPrice(mockProduct.base_price);
    }, [id]);

    // Recalculate price dynamically when quantity changes
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

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    if (!product) return <div className="p-12 text-center text-white">Loading...</div>;

    const isWholesaleActive = quantity >= (product.bulk_tiers?.[0]?.min_quantity || 9999);
    const savings = (product.base_price - currentPrice) * quantity;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Images */}
                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 dark:border-gray-800">
                    <img src={product.image_url} alt={product.name} className="w-full h-auto object-cover" />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold dark:text-white mb-2">{product.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">{product.description}</p>
                    
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-darkSecondary rounded-xl border border-goldPrimary/30">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Prix de base</span>
                            <span className="text-sm line-through text-gray-400">{formatDZD(product.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-medium dark:text-gray-200">Prix actuel unitaire:</span>
                            <span className="text-3xl font-bold text-goldPrimary transition-all duration-300 transform scale-105 origin-right">
                                {formatDZD(currentPrice)}
                            </span>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-medium dark:text-gray-300">Quantité:</span>
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition">
                                <FiMinus />
                            </button>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-16 text-center outline-none bg-transparent dark:text-white font-bold"
                            />
                            <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition">
                                <FiPlus />
                            </button>
                        </div>
                    </div>

                    {/* Savings highlight animation */}
                    {isWholesaleActive && (
                        <div className="mb-6 p-3 bg-success/20 border border-success/50 rounded-lg flex items-center gap-2 text-success animate-slide-up">
                            <FiCheck size={20} />
                            <span className="font-semibold">
                                {t('savings', { amount: savings })}
                            </span>
                        </div>
                    )}

                    {/* Bulk Tiers Info */}
                    {product.wholesale_enabled && product.bulk_tiers && (
                        <div className="mb-8">
                            <h4 className="font-semibold mb-3 dark:text-gray-200">Prix de gros :</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {product.bulk_tiers.map((tier, idx) => (
                                    <div key={idx} className={`text-sm p-3 rounded-lg border ${quantity >= tier.min_quantity && (tier.max_quantity === null || quantity <= tier.max_quantity) ? 'border-goldPrimary bg-goldPrimary/10 text-goldPrimary font-bold' : 'border-gray-200 dark:border-gray-700 dark:text-gray-400'}`}>
                                        {tier.min_quantity}{tier.max_quantity ? ` - ${tier.max_quantity}` : '+'} pcs 
                                        <br/> <span className="text-lg">{formatDZD(tier.price_per_unit)}</span>/pce
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button onClick={handleAddToCart} className="btn-gold w-full text-lg mt-auto hover:animate-glow">
                        {t('addToCart')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
