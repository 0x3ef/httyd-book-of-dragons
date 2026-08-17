import { useState } from 'react';

interface ExpandableListProps {
    items: string[];
    limit?: number;
    variant?: 'block' | 'inline';
    layout?: 'stack' | 'grid';
    emptyLabel?: string;
}

export function ExpandableList({ items, limit = 4, variant = 'block', layout = 'stack', emptyLabel = 'N/A' }: ExpandableListProps) {
    const [expanded, setExpanded] = useState(false);

    const cleanItems = (items ?? []).filter(Boolean);

    if (cleanItems.length === 0) {
        return variant === 'inline' ? (
            <span className="break-words text-sm text-white">
                {emptyLabel}
            </span>
        ) : (
            <p className="text-sm text-white">{emptyLabel}</p>
        );
    }

    const hasMore = cleanItems.length > limit;
    const visibleItems = expanded ? cleanItems : cleanItems.slice(0, limit);
    const toggleLabel = expanded
        ? 'Show less'
        : `+${cleanItems.length - limit} more`;

    if (variant === 'inline') {
        return (
            <span className="min-w-0 break-words text-sm leading-relaxed text-white">
                {visibleItems.join(', ')}
                {hasMore && (
                    <button
                        type="button"
                        onClick={() => setExpanded((value) => !value)}
                        className="ml-2 whitespace-nowrap text-xs font-semibold text-violet-400 transition-opacity hover:opacity-75"
                    >
                        {toggleLabel}
                    </button>
                )}
            </span>
        );
    }

    return (
        <div className="min-w-0">
            <ul
                className={
                    layout === 'grid'
                        ? 'grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-2'
                        : 'space-y-1'
                }
            >
                {visibleItems.map((value) => (
                    <li
                        key={value}
                        className="min-w-0 break-words text-sm text-white"
                    >
                        {value}
                    </li>
                ))}
            </ul>

            {hasMore && (
                <button
                    type="button"
                    onClick={() => setExpanded((value) => !value)}
                    className="mt-1.5 text-xs font-semibold text-violet-400 transition-opacity hover:opacity-75"
                >
                    {toggleLabel}
                </button>
            )}
        </div>
    );
}