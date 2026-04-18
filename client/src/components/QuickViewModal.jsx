import { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { formatDZD } from '../utils/formatCurrency';
import { CartContext } from '../context/CartContext';
import { useState } from 'react';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setQuantity(1);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150]"
                    />
                    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-whiteCard dark:bg-darkSecondary w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto border border-gray-200 dark:border-darkSecondary"
                        >
                            <div className="md:w-1/2 p-4 md:p-8 bg-gray-50 dark:bg-darkPrimary">
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-contain rounded-2xl" />
                            </div>
                            
                            <div className="md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
                                <button 
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition"
                                >
                                    <FiX size={24} />
                                </button>
                                
                                <span className="text-goldPrimary font-bold tracking-widest text-xs mb-4 uppercase">TG Accessories</span>
                                <h2 className="text-3xl font-bold dark:text-white mb-4">{product.name}</h2>
                                <p className="text-2xl font-bold text-goldPrimary mb-6">{formatDZD(product.base_price)}</p>
                                
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                                    Experience the ultimate in mobile protection and style with our {product.name}. Crafted with precision and premium materials for those who demand excellence.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden px-2">
                                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-gray-500"><FiMinus size={18} /></button>
                                            <span className="w-10 text-center font-bold dark:text-white">{quantity}</span>
                                            <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-gray-500"><FiPlus size={18} /></button>
                                        </div>
                                        <span className="text-sm font-medium dark:text-gray-400">Total: {formatDZD(product.base_price * quantity)}</span>
                                    </div>
                                    
                                    <button 
                                        onClick={handleAddToCart}
                                        className="w-full btn-gold py-4 flex items-center justify-center gap-3 text-lg"
                                    >
                                        <FiShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
