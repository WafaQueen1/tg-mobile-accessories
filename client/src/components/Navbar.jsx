import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { FiSun, FiMoon, FiShoppingCart, FiGlobe } from 'react-icons/fi';

const Navbar = () => {
    const { t } = useTranslation();
    const { darkMode, toggleTheme, changeLanguage, currentLang } = useContext(ThemeContext);
    const { cart } = useContext(CartContext);

    return (
        <nav className="sticky top-0 z-50 py-4 px-6 md:px-12 bg-whiteCard/80 dark:bg-darkPrimary/80 backdrop-blur-md border-b border-gray-200 dark:border-darkSecondary transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-darkPrimary font-bold text-xl group-hover:animate-glow">
                        TG
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block font-sans text-darkText dark:text-goldLight">
                        Accessories
                    </span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex gap-8 items-center font-medium">
                    <Link to="/" className="hover:text-goldPrimary transition-colors">{t('home')}</Link>
                    <Link to="/shop" className="hover:text-goldPrimary transition-colors">{t('shop')}</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switch */}
                    <button 
                        onClick={() => changeLanguage(currentLang === 'fr' ? 'en' : currentLang === 'en' ? 'ar' : 'fr')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition"
                        title="Change Language"
                    >
                        <FiGlobe size={20} className="text-gray-600 dark:text-gray-300" />
                        <span className="text-xs uppercase ml-1 opacity-70">{currentLang}</span>
                    </button>
                    
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition"
                    >
                        {darkMode ? <FiSun size={20} className="text-goldLight" /> : <FiMoon size={20} className="text-gray-800" />}
                    </button>
                    
                    {/* Cart */}
                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition">
                        <FiShoppingCart size={22} className={cart.length > 0 ? 'text-goldPrimary' : 'text-gray-800 dark:text-gray-300'} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
