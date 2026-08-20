import { useEffect, useState } from 'react';
import type { Distribution, DistributionCreateRequest } from '../../types/distribution';

interface DistributionFormProps {
    initialData?: Distribution;
    loading?: boolean;
    onSubmit: (data: DistributionCreateRequest) => void;
    onCancel: () => void;
}

export function DistributionForm({ initialData, loading = false, onSubmit, onCancel }: DistributionFormProps) {
    const [name, setName] = useState('');
    const [alternateNames, setAlternateNames] = useState('');

    useEffect(() => {
        setName(initialData?.name ?? '');
        setAlternateNames(
            initialData?.alternatenames ?? '',
        );
    }, [initialData]);

    const handleSubmit = (
        event: React.FormEvent,
    ) => {
        event.preventDefault();

        onSubmit({
            name,
            alternatenames: alternateNames,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Name
                </span>

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                    className="admin-input placeholder:text-zinc-600"
                    placeholder="Isle of Berk"
                />
            </label>

            <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Alternate names
                </span>

                <input
                    value={alternateNames}
                    onChange={(e) =>
                        setAlternateNames(e.target.value)
                    }
                    className="admin-input placeholder:text-zinc-600"
                    placeholder="Berk, Berk Island..."
                />
            </label>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md px-4 py-2 text-sm text-zinc-400 hover:text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-custom-golden px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}