interface AdminModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    maxWidth?: 'lg' | '2xl' | '3xl';
}

export function AdminModal({ title, children, onClose, maxWidth = 'lg' }: AdminModalProps) {
    const widthClasses = {
        lg: 'max-w-lg',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
            <div className={`relative max-h-[90vh] w-full ${widthClasses[maxWidth]} overflow-y-auto rounded-xl border border-white/10 bg-[#090909] p-6 shadow-2xl`}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-5 top-5 text-xl text-zinc-500 transition-colors hover:text-white"
                >
                    ×
                </button>

                <h2 className="mb-6 pr-10 font-display text-2xl font-bold text-white">
                    {title}
                </h2>

                {children}
            </div>
        </div>
    );
}