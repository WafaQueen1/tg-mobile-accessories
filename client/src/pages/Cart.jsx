import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { t } = useTranslation();
    const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getSavings } = useContext(CartContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutSuccess(true);
            setTimeout(() => {
                clearCart();
                setCheckoutSuccess(false);
            }, 3000); // Clear after 3 seconds
        }, 1500); // Simulate network
    };

    if (checkoutSuccess) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <FiCheckCircle size={100} className="text-goldPrimary mx-auto mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold dark:text-white mb-4"
                >
                    Commande Confirmée
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 mb-8"
                >
                    Merci pour votre confiance. Votre commande est en cours de préparation.
                </motion.p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-3xl font-bold dark:text-white mb-6">Votre panier est vide</h1>
                <Link to="/shop" className="btn-gold inline-block">Continuer vos achats</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold dark:text-white mb-8">{t('cart')}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-6 p-4 bg-whiteCard dark:bg-darkSecondary rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm relative group">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex-grow flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold dark:text-gray-100">{item.product.name}</h3>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Prix unitaire appliqué : <span className="text-goldPrimary font-bold">{item.current_price} DZD</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition p-2">
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden h-9">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition h-full">-</button>
                                        <span className="w-10 text-center text-sm font-bold dark:text-white">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition h-full">+</button>
                                    </div>
                                    <div className="font-bold text-lg dark:text-white">
                                        {item.current_price * item.quantity} DZD
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 bg-whiteCard dark:bg-darkSecondary rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-bold dark:text-white mb-6">Résumé de la commande</h3>
                        
                        <div className="space-y-3 text-sm mb-6 dark:text-gray-300">
                            <div className="flex justify-between">
                                <span>Sous-total</span>
                                <span>{getCartTotal() + getSavings()} DZD</span>
                            </div>
                            {getSavings() > 0 && (
                                <div className="flex justify-between text-success font-semibold">
                                    <span>Économie de gros</span>
                                    <span>- {getSavings()} DZD</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Livraison</span>
                                <span>Calculé à l'étape suivante</span>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-6">
                            <div className="flex justify-between items-end">
                                <span className="font-bold dark:text-white text-lg">{t('total')}</span>
                                <span className="text-2xl font-bold text-goldPrimary">{getCartTotal()} DZD</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheckout} 
                            disabled={isCheckingOut}
                            className="btn-gold w-full text-center flex justify-center py-4 relative"
                        >
                            {isCheckingOut ? (
                                <div className="w-6 h-6 border-2 border-darkPrimary border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Passer à la caisse"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
