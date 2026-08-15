import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';

interface ProtectedRouteProps {
    adminOnly?: boolean;
}

export function ProtectedRoute({ adminOnly = false }: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-custom-golden" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}