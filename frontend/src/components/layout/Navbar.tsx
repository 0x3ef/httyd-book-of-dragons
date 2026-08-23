import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/auth/useLogout';
import { useAuth } from '../../hooks/auth/useAuth';
import { GlobalSearch } from '../search/GlobalSearch';

const NAV_LINKS = [
    { to: '/about', label: 'About' },
    { to: '/dragons', label: 'Dragons' },
    { to: '/classes', label: 'Classes' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();
    const logout = useLogout();

    const handleLogout = async () => {
        try {
            await logout.mutateAsync();
        } finally {
            navigate('/');
            setIsOpen(false);
        }
    };

    const links = [
        ...NAV_LINKS,
        ...(isAuthenticated && user?.role === 'admin'
            ? [{ to: '/admin', label: 'Admin' }]
            : []),
    ];

    return (
        <header className="sticky top-0 z-30 w-full">
            <nav className="w-full border-b border-[#2A2F36] bg-[#050505]/90 shadow backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <NavLink
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="min-w-0"
                    >
                        <span className="font-display text-base font-semibold tracking-wide text-custom-golden sm:text-lg">
                            BOOK OF DRAGONS
                        </span>
                    </NavLink>

                    <div className="hidden items-center gap-8 md:flex lg:gap-12">

                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative py-2 text-sm font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-custom-golden/60 hover:text-custom-golden'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}

                                        <span
                                            className={`absolute bottom-0 left-0 h-px bg-custom-golden transition-all duration-300 
                                                ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {isAuthenticated ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={logout.isPending}
                                className="text-sm font-medium text-custom-golden/60 transition-opacity hover:opacity-75 disabled:opacity-50"
                            >
                                {logout.isPending ? 'Logging out...' : 'Logout'}
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="text-sm font-medium text-custom-golden/60 transition-opacity hover:opacity-75"
                            >
                                Login
                            </NavLink>
                        )}

                        <GlobalSearch />
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen((open) => !open)}
                        aria-expanded={isOpen}
                        aria-label="Toggle menu"
                        className="rounded-lg p-2 text-custom-golden md:hidden"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        >
                            {isOpen ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="border-t border-[#2A2F36] px-4 py-4 md:hidden">
                        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className="text-sm font-medium text-custom-golden"
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={logout.isPending}
                                    className="text-left text-sm font-medium text-custom-golden disabled:opacity-50"
                                >
                                    {logout.isPending
                                        ? 'Logging out...'
                                        : 'Logout'}
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="text-sm font-medium text-custom-golden"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}