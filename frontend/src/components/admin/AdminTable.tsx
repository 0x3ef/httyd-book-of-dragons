import type { ReactNode } from 'react';

interface AdminColumn<T> {
    key: string;
    label: string;
    render: (item: T) => ReactNode;
}

interface AdminTableProps<T> {
    data: T[];
    columns: AdminColumn<T>[];
    getRowKey: (item: T) => string;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

export function AdminTable<T>({ data, columns, getRowKey, onEdit, onDelete }: AdminTableProps<T>) {
    return (
        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                    <thead className="border-b border-white/10 bg-white/[0.03]">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500"
                                >
                                    {column.label}
                                </th>
                            ))}

                            {(onEdit || onDelete) && (
                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                        {data.map((item) => (
                            <tr
                                key={getRowKey(item)}
                                className="transition-colors hover:bg-white/[0.025]"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-4 py-4 text-sm text-zinc-300"
                                    >
                                        {column.render(item)}
                                    </td>
                                ))}

                                {(onEdit || onDelete) && (
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            {onEdit && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onEdit(item)
                                                    }
                                                    className="text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            {onDelete && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onDelete(item)
                                                    }
                                                    className="text-xs font-semibold text-red-400/70 transition-colors hover:text-red-400"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.length === 0 && (
                <div className="px-6 py-16 text-center text-sm text-zinc-500">
                    No records found.
                </div>
            )}
        </div>
    );
}