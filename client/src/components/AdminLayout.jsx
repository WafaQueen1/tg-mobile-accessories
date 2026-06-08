import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="flex bg-darkPrimary min-h-screen">
            <AdminSidebar />
            <main className="flex-1 ml-80 p-12">
                <div className="max-w-6xl mx-auto pt-16">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
