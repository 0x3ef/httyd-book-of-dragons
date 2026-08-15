import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';
import { AuthInput } from '../components/auth/AuthInput';
import { usePasswordResetRequest } from '../hooks/auth/usePasswordResetRequest';
import type { PasswordResetRequest } from '../types/user';

export function PasswordReset() {
    const navigate = useNavigate();

    const resetMutation = usePasswordResetRequest();

    const [email, setEmail] = useState('');

    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const data: PasswordResetRequest = {
            email,
        };

        resetMutation.mutate(data);
    };

    return (
        <AuthModal
            title="Reset Password"
            onClose={handleClose}
        >
            {resetMutation.isSuccess ? (
                <div className="space-y-6 text-center">
                    <div>
                        <p className="text-sm text-zinc-300">
                            If an account exists with that email,
                            you will receive a password reset link.
                        </p>

                        <p className="mt-2 text-xs text-zinc-500">
                            Check your inbox and follow the link to
                            create a new password.
                        </p>
                    </div>

                    <Link
                        to="/login"
                        className="block w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110"
                    >
                        Back to Login
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <p className="text-sm leading-relaxed text-zinc-400">
                        Enter your email address and we'll send you
                        a link to reset your password.
                    </p>

                    <AuthInput
                        label="Email"
                        type="email"
                        value={email}
                        placeholder="you@example.com"
                        autoComplete="email"
                        onChange={setEmail}
                    />

                    {resetMutation.isError && (
                        <p className="text-sm text-red-400">
                            Unable to send the reset email.
                            Please try again.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={
                            resetMutation.isPending ||
                            !email.trim()
                        }
                        className="w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {resetMutation.isPending
                            ? 'Sending...'
                            : 'Send Reset Link'}
                    </button>

                    <p className="text-center text-sm text-zinc-500">
                        Remember your password?{' '}

                        <Link
                            to="/login"
                            className="font-semibold text-custom-golden transition-colors hover:text-white"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            )}
        </AuthModal>
    );
}