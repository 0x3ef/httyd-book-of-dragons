import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export function Admin() {
    return (
        <main className="min-h-screen text-white">
            <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
                <AdminSidebar />

                <section className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
                    <Outlet />
                </section>
            </div>
        </main>
    );
}