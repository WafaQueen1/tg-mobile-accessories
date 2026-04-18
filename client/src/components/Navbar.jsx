import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FiSun, FiMoon, FiShoppingCart, FiGlobe, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { darkMode, toggleTheme, changeLanguage, currentLang } = useContext(ThemeContext);
    const { cart, setIsCartOpen } = useContext(CartContext);
    const { user, isAdmin, logout } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('shop'), path: '/shop' },
        { name: t('aboutUs') || 'About', path: '/about' },
        { name: t('contactUs') || 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
            isScrolled 
            ? 'py-3 bg-white/80 dark:bg-darkPrimary/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800' 
            : 'py-6 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group relative z-10 text-darkText dark:text-white">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-darkPrimary font-bold text-xl transition-transform group-hover:scale-110">
                        TG
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block font-sans">
                        Accessories
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-10 items-center">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className={`text-sm font-semibold uppercase tracking-widest transition-colors hover:text-goldPrimary ${
                                location.pathname === link.path ? 'text-goldPrimary' : 'dark:text-gray-300 text-gray-700'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {isAdmin() && (
                        <Link to="/tg-admin" className="text-xs font-bold bg-goldPrimary/10 text-goldPrimary px-3 py-1 rounded-full hover:bg-goldPrimary hover:text-darkPrimary transition">
                            ADMIN
                        </Link>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4 relative z-10">
                    {/* Language Switch */}
                    <button 
                        onClick={() => changeLanguage(currentLang === 'fr' ? 'en' : currentLang === 'en' ? 'ar' : 'fr')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition text-gray-600 dark:text-gray-300"
                        title="Change Language"
                    >
                        <FiGlobe size={18} />
                    </button>
                    
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition"
                    >
                        {darkMode ? <FiSun size={18} className="text-goldLight" /> : <FiMoon size={18} className="text-gray-800" />}
                    </button>
                    
                    {/* Cart Trigger */}
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary transition"
                    >
                        <FiShoppingCart size={20} className={cart.length > 0 ? 'text-goldPrimary' : 'text-gray-700 dark:text-gray-300'} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    {/* User Profile / Mobile Menu Toggle */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <button onClick={logout} className="hidden md:flex items-center gap-2 text-xs font-semibold hover:text-red-500 transition border-l border-gray-300 dark:border-gray-700 pl-4">
                                <FiUser size={18} />
                                {t('logout') || 'LOGOUT'}
                            </button>
                        ) : (
                            <Link to="/login" className="hidden md:block p-2 text-gray-700 dark:text-gray-300 hover:text-goldPrimary transition">
                                <FiUser size={20} />
                            </Link>
                        )}
                        
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white dark:bg-darkPrimary z-[200] flex flex-col items-center justify-center space-y-8 md:hidden p-6 animate-slide-up">
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 text-gray-500"
                        >
                            <FiX size={32} />
                        </button>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className="text-2xl font-bold dark:text-white uppercase tracking-widest hover:text-goldPrimary"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user && (
                           <button onClick={logout} className="text-red-500 font-bold text-xl uppercase tracking-widest">{t('logout') || 'LOGOUT'}</button>
                        )}
                        {!user && (
                            <Link to="/login" className="text-goldPrimary font-bold text-xl uppercase tracking-widest">{t('login') || 'LOGIN'}</Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
