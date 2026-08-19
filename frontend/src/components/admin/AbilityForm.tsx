import { useEffect, useState } from 'react';
import type { Ability, AbilityCreateRequest } from '../../types/ability';

interface AbilityFormProps {
    initialData?: Ability;
    loading?: boolean;
    onSubmit: (data: AbilityCreateRequest) => void;
    onCancel: () => void;
}

export function AbilityForm({ initialData, loading = false, onSubmit, onCancel }: AbilityFormProps) {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(initialData?.name ?? '');
    }, [initialData]);

    const handleSubmit = (
        event: React.FormEvent,
    ) => {
        event.preventDefault();

        onSubmit({
            name,
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
                    className="admin-input"
                    placeholder="Plasma Blast"
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