import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Dragon } from '../../types/dragon';

interface DragonTableProps {
    dragons: Dragon[];
}

type SortColumn =
    | 'species'
    | 'class'
    | 'attack'
    | 'speed'
    | 'armor'
    | 'firepower'
    | 'shotlimit'
    | 'venom'
    | 'jawstrength'
    | 'stealth';

const SORTABLE_COLUMNS: { key: SortColumn; label: string; align?: 'left' }[] = [
    { key: 'species', label: 'Species', align: 'left' },
    { key: 'class', label: 'Class', align: 'left' },
    { key: 'attack', label: 'Attack' },
    { key: 'speed', label: 'Speed' },
    { key: 'armor', label: 'Armor' },
    { key: 'firepower', label: 'Firepower' },
    { key: 'shotlimit', label: 'Shot Limit' },
    { key: 'venom', label: 'Venom' },
    { key: 'jawstrength', label: 'Jaw Strength' },
    { key: 'stealth', label: 'Stealth' },
];

export function DragonTable({ dragons }: DragonTableProps) {
    const [search, setSearch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [sortColumn, setSortColumn] = useState<SortColumn>('species');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const classes = [...new Set(dragons.map((dragon) => dragon.dragon_class?.name).filter(Boolean))];

    const filteredDragons = dragons.filter((dragon) => {
        const matchesSearch = dragon.species.toLowerCase().includes(search.toLowerCase());
        const matchesClass = selectedClass === '' || dragon.dragon_class?.name === selectedClass;
        return matchesSearch && matchesClass;
    });

    const sortedDragons = [...filteredDragons];

    function handleSort(column: SortColumn) {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }

    if (sortColumn === 'species') {
        sortedDragons.sort((a, b) =>
            sortDirection === 'asc' ? a.species.localeCompare(b.species) : b.species.localeCompare(a.species)
        );
    } else if (sortColumn === 'class') {
        sortedDragons.sort((a, b) => {
            const aClass = a.dragon_class?.name ?? '';
            const bClass = b.dragon_class?.name ?? '';
            return sortDirection === 'asc' ? aClass.localeCompare(bClass) : bClass.localeCompare(aClass);
        });
    } else {
        sortedDragons.sort((a, b) => {
            const aValue = a[sortColumn] ?? 0;
            const bValue = b[sortColumn] ?? 0;
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }

    return (
        <div className="w-full">
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-custom-golden backdrop-blur3 p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex-1">
                    <svg
                        viewBox="0 0 24 24"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>

                    <input
                        id="dragon-search"
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by species..."
                        className="w-full rounded-xl border border-custom-golden backdrop-blur py-2.5 pl-9 pr-3 text-sm text-custom-golden outline-none transition placeholder:text-custom-golden focus:border-custom-golden focus:ring-2 focus:ring-custom-golden"
                    />
                </div>

                <select
                    id="dragon-class"
                    value={selectedClass}
                    onChange={(event) => setSelectedClass(event.target.value)}
                    className="rounded-xl border border-custom-golden backdrop-blur tone-50 px-3 py-2.5 text-sm text-custom-golden outline-none transition focus:border-custom-golden focus:ring-2 focus:ring-custom-golden sm:w-48"
                >
                    <option value="">All classes</option>
                    {classes.map((dragonClass) => (
                        <option key={dragonClass} value={dragonClass}>
                            {dragonClass}
                        </option>
                    ))}
                </select>

                {(search || selectedClass) && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch('');
                            setSelectedClass('');
                        }}
                        className="text-xs font-semibold text-custom-golden underline-offset-2 hover:text-custom-golden-2 hover:underline"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">
                {sortedDragons.length} {sortedDragons.length === 1 ? 'dragon' : 'dragons'}
            </p>

            <div className="overflow-auto rounded-2xl border border-violet-400 shadow-sm">
                <table className="w-full min-w-[960px] border-collapse text-sm">
                    <thead>
                        <tr className="backdrop-blur">
                            {SORTABLE_COLUMNS.map((column) => (
                                <th
                                    key={column.key}
                                    className={`sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-custom-golden ${
                                        column.align === 'left' ? 'text-left' : 'text-center'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleSort(column.key)}
                                        className={`inline-flex items-center gap-1 transition-colors hover:text-custom-golden-2 ${
                                            column.align === 'left' ? '' : 'justify-center'
                                        }`}
                                    >
                                        {column.label}
                                        {sortColumn === column.key && (
                                            <span className="text-custom-golden-2">
                                                {sortDirection === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-violet-800">
                        {sortedDragons.map((dragon) => (
                            <tr
                                key={dragon.uid}
                                className="backdrop-blur hover:bg-fuchsia-300"
                            >
                                <td className="px-4 py-3">
                                    <Link
                                        to={`/dragons/${dragon.uid}`}
                                        className="font-medium text-stone-50 hover:text-purple-800"
                                    >
                                        {dragon.species}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-start font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.dragon_class?.name ? (<span>{dragon.dragon_class.name}</span>) : ( "Unknown")}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.attack}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.speed}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.armor}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.firepower}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.shotlimit}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.venom}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.jawstrength}
                                </td>
                                <td className="px-4 py-3 text-center font-mono  text-stone-50 dark:text-stone-300">
                                    {dragon.stealth ?? 'N/A'}
                                </td>
                            </tr>
                        ))}

                        {sortedDragons.length === 0 && (
                            <tr>
                                <td
                                    colSpan={SORTABLE_COLUMNS.length}
                                    className="px-4 py-10 text-center text-sm text-stone-300"
                                >
                                    No dragons match your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
