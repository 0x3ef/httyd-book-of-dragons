import { Link } from 'react-router-dom';

interface AdminHeaderProps {
    title: string;
    description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
    return (
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="font-display text-3xl font-bold text-white">
                    {title}
                </h1>

                {description && (
                    <p className="mt-1 text-sm text-zinc-500">
                        {description}
                    </p>
                )}
            </div>

            <Link
                to="/"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-custom-golden"
            >
                Back to site
            </Link>
        </header>
    );
}