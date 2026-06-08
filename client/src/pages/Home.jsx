import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiShoppingBag, FiShield, FiTruck, FiZap, FiMail } from 'react-icons/fi';

// Testimonials Data
const testimonials = [
    { name: "Ahmed", city: "Alger", rating: 5, text: "Qualité exceptionnelle, le chargeur rapide fonctionne parfaitement avec mon iPhone. Service client au top !" },
    { name: "Sarah", city: "Oran", rating: 5, text: "Les coques de protection sont magnifiques et très solides. Je recommande vivement TG Accessories." },
    { name: "Mourad", city: "Constantine", rating: 4, text: "Très bon rapport qualité-prix pour les achats en gros. Livraison rapide vers Constantine." },
    { name: "Amina", city: "Batna", rating: 5, text: "Enfin une boutique qui propose des accessoires originaux et de luxe en Algérie. Merci !" },
    { name: "Walid", city: "Tlemcen", rating: 5, text: "Expérience d'achat fluide. On sent que c'est du haut de gamme dès l'ouverture du colis." },
];

const categories = [
    { id: 'cases', name: 'Coques', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=800' },
    { id: 'chargers', name: 'Chargeurs', image: 'https://images.unsplash.com/photo-1625946327883-8a96677f59f8?auto=format&fit=crop&q=80&w=800' },
    { id: 'audio', name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' },
    { id: 'holders', name: 'Supports', image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=800' },
];

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ h: 24, m: 0, s: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59);
            const diff = endOfDay - now;
            
            setTimeLeft({
                h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                m: Math.floor((diff / 1000 / 60) % 60),
                s: Math.floor((diff / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex gap-4">
            {[
                { label: 'Heures', val: timeLeft.h },
                { label: 'Minutes', val: timeLeft.m },
                { label: 'Secondes', val: timeLeft.s }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-goldPrimary">
                        {String(item.val).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-2 text-gray-400">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-darkPrimary overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-96 h-96 bg-goldPrimary/40 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8"
                    >
                        <img src="/media__1776535498428.png" alt="TG Logo" className="w-48 mx-auto mb-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                        <span className="inline-block py-2 px-6 rounded-full border border-goldPrimary/40 text-goldPrimary text-xs font-black tracking-[0.3em] uppercase mb-8 backdrop-blur-xl">
                            Elite Mobile Experience
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
                            Luxury <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5D76E] to-[#D4AF37] animate-gradient-x">
                                Accessories
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            L'excellence technologique rencontre le design prestigieux. Découvrez notre collection exclusive pour votre smartphone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/shop" className="btn-gold px-12 py-5 text-lg font-black group shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                                DECOUVRIR LA BOUTIQUE
                                <FiArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Scroll Down</span>
                    <div className="w-px h-12 bg-gradient-to-b from-goldPrimary to-transparent"></div>
                </motion.div>
            </section>

            {/* AUTHORITY BADGES */}
            <section className="py-20 border-y border-gray-800/50 bg-darkSecondary/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: FiTruck, title: "Livraison Express", desc: "48 Wilayas d'Algérie" },
                        { icon: FiShield, title: "100% Original", desc: "Produits Certifiés" },
                        { icon: FiZap, title: "Prix de Gros", desc: "Pour les Revendeurs" },
                        { icon: FiShoppingBag, title: "Paiement à la Livraison", desc: "Sécurisé & Garanti" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-goldPrimary/10 flex items-center justify-center text-goldPrimary mb-4 transition-all group-hover:bg-goldPrimary group-hover:text-darkPrimary">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CURATED STORY SECTION */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-goldPrimary/30 rounded-tl-3xl"></div>
                        <img 
                            src="/media__1776530346813.png" 
                            alt="Story Perspective" 
                            className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/5] object-center border border-gray-800"
                        />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-goldPrimary/30 rounded-br-3xl"></div>
                    </motion.div>
                    <div className="lg:w-1/2 space-y-8">
                        <span className="text-goldPrimary font-black uppercase tracking-[0.4em] text-xs">Notre Philosophie</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
                            Plus qu'un accessoire, <br />
                            <span className="text-goldPrimary">Une déclaration.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-medium">
                            Chez TG Mobile, nous croyons que votre technologie mérite le meilleur. Nous sourçons minutieusement chaque produit pour garantir un équilibre parfait entre protection militaire et esthétique premium.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div>
                                <h4 className="text-3xl font-black text-white mb-2">12k+</h4>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Clients Heureux</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-white mb-2">48</h4>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Wilayas Desservies</p>
                            </div>
                        </div>
                        <Link to="/shop" className="btn-gold inline-flex px-10 py-4 mt-4">REJOINDRE L'ELITE</Link>
                    </div>
                </div>
            </section>

            {/* FEATURED CATEGORIES */}
            <section className="py-24 bg-darkSecondary/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-goldPrimary font-black uppercase tracking-[0.4em] text-xs block mb-4">Parcourir</span>
                            <h2 className="text-4xl font-black text-white uppercase">Collections</h2>
                        </div>
                        <Link to="/shop" className="text-goldPrimary font-bold hover:underline">Tout voir</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative h-96 rounded-3xl overflow-hidden border border-gray-800 bg-gray-900">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-darkPrimary via-darkPrimary/20 to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-2xl font-black text-white uppercase mb-2">{cat.name}</h3>
                                    <div className="flex items-center gap-2 text-goldPrimary text-xs font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        Voir plus <FiArrowRight />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROMO BANNER WITH COUNTDOWN */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-goldPrimary via-[#F5D76E] to-goldPrimary p-1 md:p-2">
                        <div className="bg-darkPrimary rounded-[2.5rem] p-8 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-goldPrimary/5 skew-x-12 translate-x-1/2"></div>
                            
                            <div className="relative z-10 max-w-xl text-center lg:text-left">
                                <span className="inline-block px-4 py-1 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">Offre Limitée</span>
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 leading-none">Vente Flash <br /><span className="text-goldPrimary">-30% EN GROS</span></h2>
                                <p className="text-gray-400 font-medium text-lg mb-10">Connectez-vous à votre compte revendeur pour profiter des réductions exclusives sur les AirPods et Chargeurs.</p>
                                <CountdownTimer />
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <button className="btn-gold px-12 py-5 text-xl font-black shadow-2xl">COMMANDER VIA WHATSAPP</button>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Livraison gratuite sur Alger</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-32 bg-darkSecondary/30">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-goldPrimary font-black uppercase tracking-[0.4em] text-xs block mb-4">Confiance</span>
                    <h2 className="text-4xl font-black text-white uppercase mb-20 tracking-tight">Ce que nos clients disent</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.slice(0, 3).map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-darkPrimary/50 backdrop-blur-xl border border-gray-800 p-10 rounded-3xl text-left relative"
                            >
                                <div className="flex gap-1 text-goldPrimary mb-6">
                                    {[...Array(item.rating)].map((_, i) => <FiStar key={i} fill="currentColor" size={16} />)}
                                </div>
                                <p className="text-gray-300 italic mb-8 font-medium leading-relaxed">"{item.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-goldPrimary/20 flex items-center justify-center text-goldPrimary font-black border border-goldPrimary/30">{item.name[0]}</div>
                                    <div>
                                        <h4 className="text-white font-bold">{item.name}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.city}, Algérie</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="py-32 px-6 bg-gradient-to-b from-darkPrimary to-darkSecondary">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-20 h-20 rounded-3xl bg-goldPrimary/10 flex items-center justify-center text-goldPrimary mx-auto mb-10 border border-goldPrimary/20">
                        <FiMail size={32} />
                    </div>
                    <h2 className="text-4xl font-black text-white uppercase mb-4 tracking-tight">Restez à l'avant-garde</h2>
                    <p className="text-gray-400 font-medium text-lg mb-12">Soyez les premiers informés des nouveaux arrivages et des offres exclusives en Algérie.</p>
                    
                    <form className="relative max-w-2xl mx-auto px-4">
                        <input 
                            type="email" 
                            placeholder="Votre adresse email" 
                            className="w-full bg-darkSecondary/50 border border-gray-800 text-white rounded-2xl py-6 pl-8 pr-44 focus:outline-none focus:border-goldPrimary transition-all placeholder:text-gray-600 font-medium"
                        />
                        <button className="absolute right-6 top-2 bottom-2 bg-goldPrimary text-darkPrimary px-8 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-goldLight transition-all">S'abonner</button>
                    </form>
                    <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Zéro spam. Uniquement de l'excellence.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
