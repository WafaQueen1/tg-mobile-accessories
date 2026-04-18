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
            <section className="py-12 bg-whiteCard dark:bg-darkSecondary border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-600 dark:text-gray-300">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-lightBg dark:bg-darkPrimary flex items-center justify-center mb-4 text-goldPrimary text-xl font-bold">⏱</div>
                        <h3 className="font-semibold text-lg">{t('fastDelivery')}</h3>
                        <p className="text-sm mt-2 opacity-80">Partout en Algérie</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-lightBg dark:bg-darkPrimary flex items-center justify-center mb-4 text-goldPrimary text-xl font-bold">🛡</div>
                        <h3 className="font-semibold text-lg">{t('guarantee')}</h3>
                        <p className="text-sm mt-2 opacity-80">Qualité Premium assureé</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-lightBg dark:bg-darkPrimary flex items-center justify-center mb-4 text-goldPrimary text-xl font-bold">🤝</div>
                        <h3 className="font-semibold text-lg">{t('wholesale')}</h3>
                        <p className="text-sm mt-2 opacity-80">Prix compétitifs pour revendeurs</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
