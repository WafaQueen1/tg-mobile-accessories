import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { formatDZD } from '../utils/formatCurrency';

const Shop = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // DUMMY DATA FOR NOW, replace with actual fetch once backend is connected
    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setProducts([
                { id: 1, name: 'CyberArmor iPhone 15 Pro Case', base_price: 2500, stock_quantity: 12, wholesale_enabled: true, image_url: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800' },
                { id: 2, name: 'TurboCharge 65W GaN Adapter', base_price: 4500, stock_quantity: 50, wholesale_enabled: true, image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800' },
                { id: 3, name: 'Liquid Gold AirPods Pro Case', base_price: 1500, stock_quantity: 4, wholesale_enabled: true, image_url: 'https://images.unsplash.com/photo-1600294037681-c8004b3419bb?auto=format&fit=crop&q=80&w=800' }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">{t('shop')}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full flex justify-center"><div className="w-10 h-10 border-4 border-goldPrimary border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                    products.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="card-luxury block relative overflow-hidden group">
                            {product.stock_quantity < 10 && (
                                <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs px-2 py-1 rounded-md z-10 animate-pulse-fast">
                                    {t('only_left', { count: product.stock_quantity })}
                                </div>
                            )}
                            <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="font-semibold text-lg dark:text-gray-100">{product.name}</h3>
                            <p className="text-goldPrimary font-bold mt-2">{formatDZD(product.base_price)}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shop;
