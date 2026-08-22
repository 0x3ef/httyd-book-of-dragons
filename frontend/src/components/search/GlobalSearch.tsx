import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDragons } from '../../hooks/dragons/useDragons';
import { useClasses } from '../../hooks/classes/useClasses';

export function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    const { data: dragons = [] } = useDragons();
    const { data: classes = [] } = useClasses();

    const normalizedQuery = query.trim().toLowerCase();

    const matchingDragons = normalizedQuery
        ? dragons
              .filter((dragon) =>
                  dragon.species
                      .toLowerCase()
                      .includes(normalizedQuery),
              )
              .slice(0, 5)
        : [];

    const matchingClasses = normalizedQuery
        ? classes
              .map((dragonClass, index) => ({
                  dragonClass,
                  index,
              }))
              .filter(({ dragonClass }) =>
                  dragonClass.name
                      .toLowerCase()
                      .includes(normalizedQuery),
              )
              .slice(0, 5)
        : [];

    const hasResults =
        matchingDragons.length > 0 ||
        matchingClasses.length > 0;

    const closeSearch = () => {
        setQuery('');
        setExpanded(false);
    };

    return (
        <div className="relative flex items-center">
            {!expanded ? (
                <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label="Search"
                    className="rounded-full p-2 text-custom-golden/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <circle
                            cx="11"
                            cy="11"
                            r="7"
                        />
                        <path d="m20 20-4-4" />
                    </svg>
                </button>
            ) : (
                <div className="relative w-64 sm:w-80">
                    <div className="flex items-center rounded-lg border border-[#2A2F36] bg-[#080808] px-3 py-2 transition focus-within:border-custom-golden">
                        <svg
                            viewBox="0 0 24 24"
                            className="mr-2 h-4 w-4 shrink-0 text-zinc-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="7"
                            />
                            <path d="m20 20-4-4" />
                        </svg>

                        <input
                            type="text"
                            value={query}
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            placeholder="Search dragons or classes..."
                            autoFocus
                            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                        />

                        <button
                            type="button"
                            onClick={closeSearch}
                            className="ml-2 text-zinc-600 transition hover:text-white"
                            aria-label="Close search"
                        >
                            ×
                        </button>
                    </div>

                    {query && (
                        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-[#2A2F36] bg-[#080808] shadow-xl">
                            {!hasResults && (
                                <p className="px-4 py-4 text-sm text-zinc-500">
                                    No results found.
                                </p>
                            )}

                            {matchingDragons.length > 0 && (
                                <div className="border-b border-[#2A2F36] p-2">
                                    <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Dragons
                                    </p>

                                    {matchingDragons.map(
                                        (dragon) => (
                                            <button
                                                key={dragon.uid}
                                                type="button"
                                                onClick={() => {
                                                    navigate(
                                                        `/dragons/${dragon.uid}`,
                                                    );
                                                    closeSearch();
                                                }}
                                                className="flex w-full items-center rounded-md px-2 py-2 text-left text-sm text-white transition hover:bg-white/5"
                                            >
                                                {dragon.species}
                                            </button>
                                        ),
                                    )}
                                </div>
                            )}

                            {matchingClasses.length > 0 && (
                                <div className="p-2">
                                    <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        Classes
                                    </p>

                                    {matchingClasses.map(
                                        ({
                                            dragonClass,
                                            index,
                                        }) => (
                                            <button
                                                key={dragonClass.uid}
                                                type="button"
                                                onClick={() => {
                                                    navigate(
                                                        '/classes',
                                                        {
                                                            state: {
                                                                classIndex:
                                                                    index,
                                                            },
                                                        },
                                                    );

                                                    closeSearch();
                                                }}
                                                className="flex w-full items-center rounded-md px-2 py-2 text-left text-sm text-white transition hover:bg-white/5"
                                            >
                                                {dragonClass.name}
                                            </button>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}