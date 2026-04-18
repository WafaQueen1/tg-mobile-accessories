import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const calculateDynamicPrice = (product, quantity) => {
        if (!product.wholesale_enabled || !product.bulk_tiers || product.bulk_tiers.length === 0) {
            return product.base_price;
        }

        let applicablePrice = product.base_price;
        // Tiers should be sorted by min_quantity ascending
        for (const tier of product.bulk_tiers) {
            if (quantity >= tier.min_quantity) {
                 // Check if it's within bounds or infinite max
                if (tier.max_quantity === null || quantity <= tier.max_quantity) {
                    applicablePrice = tier.price_per_unit;
                }
            }
        }
        return applicablePrice;
    };

    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                const newQty = existing.quantity + quantity;
                return prevCart.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: newQty, current_price: calculateDynamicPrice(item.product, newQty) } 
                    : item
                );
            }
            return [...prevCart, { 
                id: product.id, 
                product: product, 
                quantity: quantity, 
                current_price: calculateDynamicPrice(product, quantity) 
            }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id, quantity) => {
        if(quantity <= 0) return removeFromCart(id);
        
        setCart(prevCart => prevCart.map(item => 
            item.id === id 
            ? { ...item, quantity, current_price: calculateDynamicPrice(item.product, quantity) } 
            : item
        ));
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.current_price * item.quantity), 0);
    };

    const getSavings = () => {
        const originalTotal = cart.reduce((total, item) => total + (item.product.base_price * item.quantity), 0);
        return originalTotal - getCartTotal();
    };

    return (
        <CartContext.Provider value={{
            cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getSavings,
            isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
