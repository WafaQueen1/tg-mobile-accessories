import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-darkPrimary pt-20 px-6">
                {/* Background glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-goldPrimary/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accentBlue/20 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="z-10 max-w-5xl mx-auto text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-goldPrimary/40 text-goldLight text-sm font-medium mb-6 backdrop-blur-md">
                            {t('wholesale')}
                        </span>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                            {t('hero_title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-goldPrimary to-goldLight glow">
                                TG Accessories
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            {t('hero_subtitle')}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/shop" className="btn-gold group relative overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    {t('shop')}
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Authority Badges */}
            <section className="py-24 bg-whiteCard dark:bg-darkSecondary border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-gray-600 dark:text-gray-300">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-goldPrimary/10 flex items-center justify-center mb-6 text-goldPrimary text-2xl font-bold">⏱</div>
                        <h3 className="font-bold text-xl mb-2">{t('fastDelivery')}</h3>
                        <p className="text-sm opacity-70">Livraison express dans <br/>toutes les wilayas d'Algérie</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-goldPrimary/10 flex items-center justify-center mb-6 text-goldPrimary text-2xl font-bold">🛡</div>
                        <h3 className="font-bold text-xl mb-2">{t('guarantee')}</h3>
                        <p className="text-sm opacity-70">Produits certifiés et <br/>garantie de satisfaction</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-goldPrimary/10 flex items-center justify-center mb-6 text-goldPrimary text-2xl font-bold">🤝</div>
                        <h3 className="font-bold text-xl mb-2">{t('wholesale')}</h3>
                        <p className="text-sm opacity-70">Espace dédié aux revendeurs <br/>avec tarifs préférentiels</p>
                    </motion.div>
                </div>
            </section>

            {/* NEW: Scroll content after "3 devs" (authority badges) */}
            <section className="py-24 px-6 md:px-12 bg-darkPrimary overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative rounded-[2rem] overflow-hidden border border-goldPrimary/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
                    >
                        {/* THE HORIZONTAL PROMO IMAGE (User provided second image) */}
                        <img 
                            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=2000" 
                            alt="Collection Promo" 
                            className="w-full h-auto object-cover min-h-[400px] brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-darkPrimary via-transparent to-transparent"></div>
                        <div className="absolute bottom-12 left-12 max-w-lg">
                            <span className="text-goldPrimary font-bold tracking-widest text-sm mb-4 block uppercase">Exclusive Collection</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Designed for Excellence</h2>
                            <Link to="/shop" className="btn-gold inline-block px-8 py-3">Explore Now</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Additional Featured Section */}
            <section className="py-24 px-6 md:px-12 bg-whiteCard dark:bg-darkPrimary">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2 space-y-8">
                        <h2 className="text-4xl font-bold dark:text-white leading-tight">
                            The Perfect Balance of <br/>
                            <span className="text-goldPrimary">Style and Protection</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Our phone cases are crafted with multiple layers of military-grade protection while maintaining a slim, luxury profile that fits perfectly in your hand and pocket.
                        </p>
                        <div className="space-y-4">
                            {['MagSafe Compatible', 'Drop Tested 10ft', 'Self-Healing Tech'].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-semibold dark:text-gray-200">
                                    <div className="w-5 h-5 rounded-full bg-goldPrimary flex items-center justify-center text-darkPrimary text-[10px]">✓</div>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="rounded-2xl overflow-hidden aspect-square"
                        >
                            <img src="https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=800" alt="Tech detail" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="rounded-2xl overflow-hidden aspect-square mt-8"
                        >
                            <img src="https://images.unsplash.com/photo-1625946327883-8a96677f59f8?auto=format&fit=crop&q=80&w=800" alt="Tech detail" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
