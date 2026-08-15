import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';
import { AuthInput } from '../components/auth/AuthInput';
import { useRegister } from '../hooks/auth/useRegister';
import type { RegisterRequest } from '../types/user';

export function SignUp() {
    const navigate = useNavigate();

    const RegisterMutation = useRegister();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        try {
            const data: RegisterRequest = {
                username,
                email,
                password,
            };

            RegisterMutation.mutate(data, {
                onSuccess: (response) => {
                    console.log(response);
                },
            });
        } catch {
            setError('Unable to create your account.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthModal
            title="Create Account"
            onClose={handleClose}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <AuthInput
                    label="Username"
                    value={username}
                    placeholder="Your username"
                    autoComplete="username"
                    onChange={setUsername}
                />

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
                    autoComplete="new-password"
                    onChange={setPassword}
                />

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading
                        ? 'Creating account...'
                        : 'Create account'}
                </button>

                <p className="text-center text-sm text-zinc-500">
                    Already have an account?{' '}

                    <Link
                        to="/login"
                        replace
                        className="font-semibold text-custom-golden transition-colors hover:text-white"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </AuthModal>
    );
}