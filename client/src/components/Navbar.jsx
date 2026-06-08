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
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('shop'), path: '/shop' },
    ];

    const ActionIcon = ({ icon: Icon, label, onClick, badge, colorClass = "" }) => (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center gap-1 group transition-all duration-300 p-2 rounded-xl hover:bg-goldPrimary/5 ${colorClass}`}
        >
            <div className="relative">
                <Icon size={20} className="group-hover:text-goldPrimary transition-colors" />
                {badge > 0 && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                        {badge}
                    </span>
                )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-goldPrimary transition-colors">
                {label}
            </span>
        </button>
    );

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
            isScrolled 
            ? 'py-2 bg-darkPrimary/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl' 
            : 'py-6 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-darkPrimary font-black text-xl shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all group-hover:rotate-6 group-hover:scale-110">
                        TG
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-lg leading-tight tracking-tight text-white font-sans uppercase">
                            Mobile
                        </span>
                        <span className="text-[10px] font-bold text-goldPrimary tracking-widest uppercase opacity-80">
                            Accessories
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-12 items-center">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-goldPrimary relative group ${
                                location.pathname === link.path ? 'text-goldPrimary' : 'text-gray-400'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-2 left-0 h-[2px] bg-goldPrimary transition-all duration-300 ${
                                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></span>
                        </Link>
                    ))}
                    {isAdmin() && (
                        <Link to="/tg-admin" className="text-[10px] font-black bg-goldPrimary/10 text-goldPrimary px-4 py-1.5 rounded-lg hover:bg-goldPrimary hover:text-darkPrimary transition-all border border-goldPrimary/20 tracking-widest">
                            ADMIN PANEL
                        </Link>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 md:gap-4 relative z-10">
                    <ActionIcon 
                        icon={FiGlobe} 
                        label={currentLang === 'ar' ? 'العربية' : 'Français'} 
                        onClick={() => changeLanguage(currentLang === 'fr' ? 'ar' : 'fr')} 
                    />
                    
                    <ActionIcon 
                        icon={darkMode ? FiSun : FiMoon} 
                        label={darkMode ? 'Clair' : 'Sombre'} 
                        onClick={toggleTheme}
                        colorClass={darkMode ? 'text-goldLight' : ''}
                    />
                    
                    <ActionIcon 
                        icon={FiShoppingCart} 
                        label="Panier" 
                        badge={cart.length}
                        onClick={() => setIsCartOpen(true)} 
                    />

                    <div className="h-8 w-px bg-gray-800 mx-2 hidden md:block"></div>

                    {user ? (
                        <ActionIcon 
                            icon={FiUser} 
                            label="Sortir" 
                            onClick={logout}
                            colorClass="text-red-400 hover:text-red-500 hover:bg-red-500/5"
                        />
                    ) : (
                        <Link to="/login" className="flex flex-col items-center gap-1 group p-2 hover:bg-goldPrimary/5 rounded-xl transition-all">
                            <FiUser size={20} className="text-gray-400 group-hover:text-goldPrimary transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-goldPrimary transition-colors">
                                Compte
                            </span>
                        </Link>
                    )}
                    
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white ml-2 bg-gray-800/50 rounded-xl"
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-darkPrimary z-[200] flex flex-col items-center justify-center space-y-12 md:hidden p-6 animate-slide-up">
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-white"
                        >
                            <FiX size={32} />
                        </button>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className="text-3xl font-black text-white uppercase tracking-[0.2em] hover:text-goldPrimary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
