interface DeleteModalProps {
    open: boolean;
    title?: string;
    description?: string;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function DeleteModal({ open, title = 'Delete item', description = 'This action cannot be undone.', loading = false, onCancel, onConfirm, } 
    : DeleteModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
            <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#090909] p-6 shadow-2xl">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                        Warning
                    </p>

                    <h2 className="mt-2 font-display text-2xl font-bold text-white">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        {description}
                    </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-md px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-md bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}