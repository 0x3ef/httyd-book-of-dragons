import { NavLink } from 'react-router-dom';

const links = [
    {
        label: 'Dragons',
        path: '/admin/dragons',
    },
    {
        label: 'Classes',
        path: '/admin/classes',
    },
    {
        label: 'Abilities',
        path: '/admin/abilities',
    },
    {
        label: 'Distributions',
        path: '/admin/distributions',
    },
    {
        label: 'Images',
        path: '/admin/images',
    }
];

export function AdminSidebar() {
    return (
        <aside className="w-full border-b border-white/10 bg-black/20 md:min-h-screen md:w-56 md:border-b-0 md:border-r">
            <div className="p-5">
                <p className="font-display text-lg tracking-[0.2em] text-custom-golden">
                    ADMIN
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                    Book of Dragons
                </p>
            </div>

            <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `whitespace-nowrap rounded-md px-3 py-2 text-sm transition-all ${
                                isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200'
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}