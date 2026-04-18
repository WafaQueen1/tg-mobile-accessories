import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { formatDZD } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';

const SidebarCart = ({ isOpen, setIsOpen }) => {
    const { t } = useTranslation();
    const { cart, updateQuantity, removeFromCart, getCartTotal, getSavings } = useContext(CartContext);
    const cartRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, setIsOpen]);

    const savings = getSavings();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    
                    {/* Sidebar */}
                    <motion.div 
                        ref={cartRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-whiteCard dark:bg-darkPrimary z-[70] shadow-2xl flex flex-col border-l border-gray-200 dark:border-darkSecondary"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                {t('cart')} <span className="bg-goldPrimary text-darkPrimary text-xs px-2 py-1 rounded-full">{cart.length}</span>
                            </h2>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition text-gray-500 hover:text-red-500"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                    <div className="w-20 h-20 mb-4 opacity-20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg">{t('cartEmpty')}</p>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="mt-4 text-goldPrimary hover:underline"
                                    >
                                        {t('continueShopping')}
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4 border-b border-gray-100 dark:border-gray-800 pb-6 relative group">
                                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-sm mb-1 dark:text-gray-200 line-clamp-2 pr-6">
                                                    {item.product.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-bold text-goldPrimary">{formatDZD(item.current_price)}</span>
                                                    {item.current_price < item.product.base_price && (
                                                        <span className="text-xs text-gray-400 line-through">{formatDZD(item.product.base_price)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden bg-whiteCard dark:bg-darkSecondary w-fit">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-darkPrimary transition text-gray-600 dark:text-gray-400"
                                                    >
                                                        <FiMinus size={14} />
                                                    </button>
                                                    <span className="px-3 py-1 font-medium text-sm dark:text-white min-w-[32px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-darkPrimary transition text-gray-600 dark:text-gray-400"
                                                    >
                                                        <FiPlus size={14} />
                                                    </button>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100 absolute top-0 right-0"
                                                    title={t('remove')}
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-gray-50 dark:bg-darkSecondary border-t border-gray-200 dark:border-gray-800">
                                {savings > 0 && (
                                    <div className="flex justify-between items-center mb-2 text-sm text-green-500 font-medium bg-green-500/10 p-2 rounded-lg">
                                        <span>{t('wholesaleSavings') || 'Grossiste Savings'}</span>
                                        <span>- {formatDZD(savings)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-semibold text-lg dark:text-gray-300">Total</span>
                                    <span className="font-bold text-2xl text-goldPrimary">
                                        {formatDZD(getCartTotal())}
                                    </span>
                                </div>
                                
                                <button 
                                    className="w-full btn-gold py-4 text-lg"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    {t('checkout')}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SidebarCart;
