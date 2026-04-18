import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Admin = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data simulate fetch from /api/admin/stats
        setTimeout(() => {
            setStats({
                totalOrders: 142,
                totalRevenue: 520000, // DZD
                lowStock: [
                    { id: 2, name: 'TurboCharge 65W GaN', stock_quantity: 4 },
                    { id: 3, name: 'Liquid Gold AirPods', stock_quantity: 8 }
                ],
                salesChart: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                    datasets: [
                        {
                            label: 'Ventes Mensuelles (DZD)',
                            data: [120000, 190000, 150000, 520000],
                            borderColor: '#D4AF37',
                            backgroundColor: 'rgba(212, 175, 55, 0.2)',
                            tension: 0.4,
                            fill: true,
                        }
                    ]
                }
            });
            setLoading(false);
        }, 1000);
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD' }).format(amount).replace('DZD', 'DA');
    };

    if (loading) return <div className="text-white text-center mt-20">Loading Admin Center...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-darkPrimary dark:text-white mb-10">Command Center</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Stats Widget */}
                <div className="card-luxury flex flex-col justify-center items-center">
                    <h3 className="text-gray-500 font-semibold mb-2">Total Revenu</h3>
                    <p className="text-4xl font-bold text-goldPrimary">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="card-luxury flex flex-col justify-center items-center">
                    <h3 className="text-gray-500 font-semibold mb-2">Total Commandes</h3>
                    <p className="text-4xl font-bold dark:text-white">{stats.totalOrders}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 card-luxury h-96">
                    <Line data={stats.salesChart} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>

                {/* Low Stock Alert */}
                <div className="card-luxury flex flex-col h-96 overflow-y-auto">
                    <h3 className="font-bold text-lg dark:text-white mb-4 text-red-500 flex items-center gap-2">
                        <span className="animate-pulse">⚠️</span> Low Stock Alerts
                    </h3>
                    <ul className="space-y-4">
                        {stats.lowStock.map(item => (
                            <li key={item.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50">
                                <p className="font-semibold dark:text-red-300">{item.name}</p>
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">Qté restante: {item.stock_quantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="mt-8 card-luxury">
                 <h2 className="text-xl font-bold dark:text-white mb-4">Commandes Récentes</h2>
                 <table className="w-full text-left dark:text-gray-300">
                     <thead className="border-b border-gray-200 dark:border-gray-700">
                         <tr>
                             <th className="py-3 px-4">Order ID</th>
                             <th className="py-3 px-4">Client</th>
                             <th className="py-3 px-4">Status</th>
                             <th className="py-3 px-4 text-right">Action</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                         <tr>
                             <td className="py-3 px-4">#1024</td>
                             <td className="py-3 px-4">Ahmed M.</td>
                             <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">En attente</span></td>
                             <td className="py-3 px-4 text-right"><select className="bg-transparent border dark:border-gray-600 rounded p-1"><option>Confirmer</option><option>Expédier</option></select></td>
                         </tr>
                     </tbody>
                 </table>
            </div>
        </div>
    );
};

export default Admin;
