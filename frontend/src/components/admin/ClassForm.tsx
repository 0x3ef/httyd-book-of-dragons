import { useEffect, useState } from 'react';
import type { DragonClass, DragonClassCreateRequest } from '../../types/dragonClass';

interface ClassFormProps {
    initialData?: DragonClass;
    loading?: boolean;
    onSubmit: (data: DragonClassCreateRequest) => void;
    onCancel: () => void;
}

export function ClassForm({ initialData, loading = false, onSubmit, onCancel }: ClassFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        setName(initialData?.name ?? '');
        setDescription(initialData?.description ?? '');
        setIcon(initialData?.icon ?? '');
    }, [initialData]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit({
            name,
            description,
            icon: icon || null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Name">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="admin-input placeholder:text-zinc-600"
                    placeholder="Strike Class"
                />
            </Field>

            <Field label="Description">
                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    rows={6}
                    className="admin-input resize-none placeholder:text-zinc-600"
                    placeholder="Class description..."
                />
            </Field>

            <Field label="Icon URL">
                <input
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="admin-input placeholder:text-zinc-600"
                    placeholder="https://..."
                />
            </Field>

            <FormActions
                loading={loading}
                onCancel={onCancel}
            />
        </form>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode; }) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {label}
            </span>
            {children}
        </label>
    );
}

function FormActions({ loading, onCancel }: { loading: boolean; onCancel: () => void; }) {
    return (
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
                className="rounded-md bg-custom-golden px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
}