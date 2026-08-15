import { useEffect } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export function AuthModal({ title, children, onClose }: AuthModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />

            <div
                className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-zinc-950/95 p-7 shadow-2xl shadow-black/50"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 text-zinc-500 transition-colors hover:text-white"
                >
                    <X size={18} />
                </button>

                <h1 className="font-display text-3xl font-bold tracking-wide text-white">
                    {title}
                </h1>

                <div className="mt-3 h-px w-16 bg-custom-golden" />

                <div className="mt-7">
                    {children}
                </div>
            </div>
        </div>
    );
}