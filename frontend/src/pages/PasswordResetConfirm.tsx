import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';
import { AuthInput } from '../components/auth/AuthInput';
import { usePasswordResetConfirm } from '../hooks/auth/usePasswordResetConfirm';
import type { PasswordResetConfirm } from '../types/user';

export function PasswordResetConfirm() {
    const { token } = useParams<{ token: string }>();

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =
        useState('');

    const resetMutation = usePasswordResetConfirm(
        token ?? '',
    );

    const handleClose = () => {
        navigate('/login');
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!token) return;

        if (newPassword !== confirmPassword) {
            return;
        }

        const data: PasswordResetConfirm = {
            new_password: newPassword,
            confirm_new_password: confirmPassword,
        };

        resetMutation.mutate(data);
    };

    if (!token) {
        return (
            <AuthModal
                title="Invalid Link"
                onClose={handleClose}
            >
                <div className="space-y-5 text-center">
                    <p className="text-sm text-zinc-400">
                        This password reset link is invalid or
                        incomplete.
                    </p>

                    <Link
                        to="/password-reset"
                        className="block w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black"
                    >
                        Request New Link
                    </Link>
                </div>
            </AuthModal>
        );
    }

    if (resetMutation.isSuccess) {
        return (
            <AuthModal
                title="Password Updated"
                onClose={handleClose}
            >
                <div className="space-y-5 text-center">
                    <p className="text-sm text-zinc-400">
                        Your password has been successfully
                        updated.
                    </p>

                    <Link
                        to="/login"
                        className="block w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110"
                    >
                        Back to Login
                    </Link>
                </div>
            </AuthModal>
        );
    }

    const passwordsDoNotMatch =
        newPassword.length > 0 &&
        confirmPassword.length > 0 &&
        newPassword !== confirmPassword;

    return (
        <AuthModal
            title="Create New Password"
            onClose={handleClose}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <p className="text-sm leading-relaxed text-zinc-400">
                    Enter your new password below.
                </p>

                <AuthInput
                    label="New Password"
                    type="password"
                    value={newPassword}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    onChange={setNewPassword}
                />

                <AuthInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    onChange={setConfirmPassword}
                />

                {passwordsDoNotMatch && (
                    <p className="text-sm text-red-400">
                        Passwords do not match.
                    </p>
                )}

                {resetMutation.isError && (
                    <p className="text-sm text-red-400">
                        The reset link may be invalid or expired.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={
                        resetMutation.isPending ||
                        passwordsDoNotMatch ||
                        !newPassword ||
                        !confirmPassword
                    }
                    className="w-full rounded-md bg-custom-golden px-4 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {resetMutation.isPending
                        ? 'Updating...'
                        : 'Update Password'}
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
        </AuthModal>
    );
}