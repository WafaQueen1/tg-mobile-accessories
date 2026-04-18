import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-darkPrimary text-gray-400 py-16 px-6 md:px-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-darkPrimary font-bold text-xl group-hover:animate-glow transition-all">
                            TG
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-white">
                            Accessories
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Luxury and premium mobile accessories for the modern enthusiast. Algerian-based, worldwide standards.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-darkSecondary rounded-full hover:text-goldPrimary transition-colors"><FiInstagram size={20} /></a>
                        <a href="#" className="p-2 bg-darkSecondary rounded-full hover:text-goldPrimary transition-colors"><FiFacebook size={20} /></a>
                        <a href="#" className="p-2 bg-darkSecondary rounded-full hover:text-goldPrimary transition-colors"><FiTwitter size={20} /></a>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">{t('categories') || 'Categories'}</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/shop?category=cases" className="hover:text-goldPrimary transition-colors">Phone Cases</Link></li>
                        <li><Link to="/shop?category=chargers" className="hover:text-goldPrimary transition-colors">Chargers & Adapters</Link></li>
                        <li><Link to="/shop?category=audio" className="hover:text-goldPrimary transition-colors">Audio & AirPods</Link></li>
                        <li><Link to="/shop?category=protection" className="hover:text-goldPrimary transition-colors">Screen Protection</Link></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">Information</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/about" className="hover:text-goldPrimary transition-colors">{t('aboutUs') || 'About Us'}</Link></li>
                        <li><Link to="/contact" className="hover:text-goldPrimary transition-colors">{t('contactUs') || 'Contact Us'}</Link></li>
                        <li><Link to="/shop" className="hover:text-goldPrimary transition-colors">Shop Full Collection</Link></li>
                        <li><Link to="/wholesale" className="hover:text-goldPrimary transition-colors">Wholesale Portal</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">Contact</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <FiMapPin className="text-goldPrimary mt-1 flex-shrink-0" />
                            <span>Bordj El Kiffan, Algiers, Algeria</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FiPhone className="text-goldPrimary flex-shrink-0" />
                            <span>+213 555 12 34 56</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FiMail className="text-goldPrimary flex-shrink-0" />
                            <span>contact@tgmobile.dz</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-xs tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} TG MOBILE ACCESSORIES. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                    <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
