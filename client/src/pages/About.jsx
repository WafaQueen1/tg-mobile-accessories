import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="dark:bg-darkPrimary min-h-screen">
             <section className="relative py-24 px-6 md:px-12 dark:bg-darkPrimary">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold dark:text-white mb-8 leading-tight">
                            Elevating Your <br />
                            <span className="text-goldPrimary">Digital Lifestyle</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Founded on the principle of premium quality and luxury aesthetic, TG Mobile Accessories is Algeria's leading destination for high-end tech essentials. We believe that your devices deserve more than just protection—they deserve to reflect your personal style and excellence.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-3xl font-bold dark:text-white mb-2">50k+</h4>
                                <p className="text-gray-500 text-sm">{t('happy_customers') || 'Happy Customers'}</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold dark:text-white mb-2">100%</h4>
                                <p className="text-gray-500 text-sm">{t('quality_guarantee') || 'Original Quality'}</p>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 relative"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-goldPrimary/20">
                            {/* Placeholder for the luxury logo box image provided by user */}
                            <img 
                                src="assets/aboutTG.png" 
                                alt="TG Luxury Branded" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-goldPrimary p-8 rounded-2xl hidden lg:block shadow-xl">
                            <p className="text-darkPrimary font-bold text-2xl">Since 2018</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-gray-50 dark:bg-darkSecondary px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold dark:text-white mb-12 uppercase tracking-widest">{t('our_values') || 'Our Core Values'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 bg-whiteCard dark:bg-darkPrimary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-xl font-bold dark:text-white mb-4">Excellence</h3>
                            <p className="text-gray-500 text-sm">We only source the highest grade materials for our accessories.</p>
                        </div>
                        <div className="p-8 bg-whiteCard dark:bg-darkPrimary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold dark:text-white mb-4">Innovation</h3>
                            <p className="text-gray-500 text-sm">Always updating our catalog with the latest tech breakthroughs.</p>
                        </div>
                        <div className="p-8 bg-whiteCard dark:bg-darkPrimary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="text-4xl mb-4">🛡️</div>
                            <h3 className="text-xl font-bold dark:text-white mb-4">Reliability</h3>
                            <p className="text-gray-500 text-sm">A service you can trust, with 24/7 support for our partners.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
