import { useTranslation } from 'react-i18next';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="dark:bg-darkPrimary min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold dark:text-white mb-4"
                    >
                        {t('contactUs') || 'Get In Touch'}
                    </motion.h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Have questions about our products or wholesale pricing? Our team is here to assist you with the premium service you deserve.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="p-8 bg-whiteCard dark:bg-darkSecondary rounded-2xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                            <div className="p-3 bg-goldPrimary/10 text-goldPrimary rounded-lg">
                                <FiMapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold dark:text-white mb-2">Visit Us</h3>
                                <p className="text-sm text-gray-500">Bordj El Kiffan, Algiers<br />Algeria</p>
                            </div>
                        </div>
                        
                        <div className="p-8 bg-whiteCard dark:bg-darkSecondary rounded-2xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                            <div className="p-3 bg-goldPrimary/10 text-goldPrimary rounded-lg">
                                <FiPhone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold dark:text-white mb-2">Call Us</h3>
                                <p className="text-sm text-gray-500">+213 555 12 34 56<br />Mon-Fri, 9am-6pm</p>
                            </div>
                        </div>

                        <div className="p-8 bg-whiteCard dark:bg-darkSecondary rounded-2xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                            <div className="p-3 bg-goldPrimary/10 text-goldPrimary rounded-lg">
                                <FiMail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold dark:text-white mb-2">Email Us</h3>
                                <p className="text-sm text-gray-500">contact@tgmobile.dz<br />support@tgmobile.dz</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 p-8 md:p-12 bg-whiteCard dark:bg-darkSecondary rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-gray-300">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-gray-50 dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 dark:text-white focus:ring-2 focus:ring-goldPrimary outline-none transition"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-gray-300">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-gray-50 dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 dark:text-white focus:ring-2 focus:ring-goldPrimary outline-none transition"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium dark:text-gray-300">Subject</label>
                                <select className="w-full bg-gray-50 dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 dark:text-white focus:ring-2 focus:ring-goldPrimary outline-none transition">
                                    <option>Customer Support</option>
                                    <option>Wholesale Inquiry</option>
                                    <option>Partnership</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium dark:text-gray-300">Message</label>
                                <textarea 
                                    rows="5"
                                    className="w-full bg-gray-50 dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 dark:text-white focus:ring-2 focus:ring-goldPrimary outline-none transition"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button className="md:col-span-2 btn-gold py-4 flex items-center justify-center gap-2">
                                <FiSend size={18} />
                                {t('sendMessage') || 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
