import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';
import { AuthInput } from '../components/auth/AuthInput';
import { useLogin } from '../hooks/auth/useLogin';
import type { LoginRequest } from '../types/user';

export function Login() {
    const loginMutation = useLogin();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const data: LoginRequest = {
            email,
            password,
        };

        loginMutation.mutate(data, {
            onSuccess: () => {
                navigate('/');
            },
            onError: () => {
                
            },
        });
    };

    return (
        <AuthModal
            title="Welcome Back"
            onClose={handleClose}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    onChange={setEmail}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    onChange={setPassword}
                />

                <div className="flex justify-end">
                    <Link
                        to="/password-reset"
                        className="text-xs text-zinc-500 transition-colors hover:text-custom-golden"
                    >
                        Forgot password?
                    </Link>
                </div>

                {loginMutation.isError && (
                    <p className="text-sm text-red-400">
                        Invalid email or password.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loginMutation.isPending
                        ? 'Signing in...'
                        : 'Login'}
                </button>

                <p className="text-center text-sm text-zinc-500">
                    Don't have an account?{' '}

                    <Link
                        to="/signup"
                        replace
                        className="font-semibold text-custom-golden transition-colors hover:text-white"
                    >
                        Create account
                    </Link>
                </p>
            </form>
        </AuthModal>
    );
}