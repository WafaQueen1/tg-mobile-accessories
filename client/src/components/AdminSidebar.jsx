import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox, FiShoppingBag, FiUsers, FiTrendingUp, FiSettings, FiArrowLeft, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
    const menuItems = [
        { icon: FiGrid, label: 'Tableau de bord', path: '/tg-admin' },
        { icon: FiShoppingBag, label: 'Commandes', path: '/tg-admin/orders' },
        { icon: FiBox, label: 'Inventaire', path: '/tg-admin/products' },
        { icon: FiTrendingUp, label: 'Analytiques', path: '/tg-admin/analytics' },
        { icon: FiUsers, label: 'Clients', path: '/tg-admin/users' },
    ];

    return (
        <aside className="w-80 min-h-screen bg-darkSecondary/30 border-r border-white/5 p-8 flex flex-col fixed left-0 top-0 pt-28">
            <div className="mb-12">
                <span className="text-goldPrimary font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Premium HQ</span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">TG COMMAND</h2>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/tg-admin'}
                        className={({ isActive }) => `
                            flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm tracking-wide group
                            ${isActive 
                                ? 'bg-goldPrimary text-darkPrimary shadow-[0_10px_30px_rgba(212,175,55,0.2)]' 
                                : 'text-gray-500 hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        <item.icon size={20} className={({ isActive }) => isActive ? '' : 'group-hover:text-goldPrimary'} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
                <NavLink 
                    to="/" 
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold"
                >
                    <FiArrowLeft />
                    <span>Retour Site</span>
                </NavLink>
                <div className="mt-8 p-6 bg-goldPrimary/5 rounded-[2rem] border border-goldPrimary/10">
                    <p className="text-[10px] font-black text-goldPrimary uppercase tracking-widest mb-1">Rapport Rapide</p>
                    <p className="text-sm font-bold text-white mb-4">Export Commandes (.xlsx)</p>
                    <a 
                        href="/api/admin/export-orders" 
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full bg-goldPrimary text-darkPrimary py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        <FiDownload /> Télécharger
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
