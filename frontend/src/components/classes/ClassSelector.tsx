import { useEffect } from 'react';
import type { DragonClass } from '../../types/dragonClass';

interface ClassSelectorProps {
    dragonClasses: DragonClass[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export function ClassSelector({ dragonClasses, selectedIndex, onSelect }: ClassSelectorProps) {
    const canGoUp = selectedIndex > 0;
    const canGoDown = selectedIndex < dragonClasses.length - 1;

    const goUp = () => {
        if (canGoUp) {
            onSelect(selectedIndex - 1);
        }
    };

    const goDown = () => {
        if (canGoDown) {
            onSelect(selectedIndex + 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                goUp();
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                goDown();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, dragonClasses.length]);

    const maxStart = Math.max(0, dragonClasses.length - 3);

    const startIndex = Math.min(
        Math.max(selectedIndex - 1, 0),
        maxStart,
    );

    const visibleClasses = dragonClasses
        .slice(startIndex, startIndex + 3)
        .map((dclass, offset) => ({
            dclass,
            index: startIndex + offset,
        }));

    return (
        <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row lg:items-center lg:gap-5">
            <div className="flex items-center gap-4 lg:flex-col lg:gap-0">

                <button
                    type="button"
                    disabled={!canGoUp}
                    onClick={goUp}
                    aria-label="Previous class"
                    className={`text-lg transition-all duration-300 lg:mb-3 ${
                        canGoUp
                            ? 'text-white hover:scale-110 hover:text-custom-golden'
                            : 'cursor-default text-zinc-800'
                    }`}
                >
                    <span className="lg:hidden">←</span>
                    <span className="hidden lg:inline">↑</span>
                </button>

                <div className="relative flex flex-row items-center gap-3 lg:flex-col lg:gap-2">
                    <div className="absolute left-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 lg:inset-y-1 lg:left-1/2 lg:top-auto lg:h-auto lg:w-px lg:-translate-x-1/2 lg:translate-y-0 lg:bg-gradient-to-b" />

                    {dragonClasses.map((dclass, index) => {
                        const isSelected = selectedIndex === index;

                        return (
                            <button
                                key={dclass.uid}
                                type="button"
                                onClick={() => onSelect(index)}
                                aria-label={dclass.name}
                                aria-current={
                                    isSelected ? 'true' : undefined
                                }
                                className="relative z-10 flex h-3 w-3 shrink-0 items-center justify-center"
                            >
                                <span
                                    className={`block rounded-full transition-all duration-300 ${
                                        isSelected
                                            ? 'h-2.5 w-2.5 bg-white ring-1 ring-white/70 ring-offset-2 ring-offset-[#050505] shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                            : 'h-1.5 w-1.5 bg-zinc-600 hover:bg-zinc-400'
                                    }`}
                                />
                            </button>
                        );
                    })}

                </div>
                <button
                    type="button"
                    disabled={!canGoDown}
                    onClick={goDown}
                    aria-label="Next class"
                    className={`text-lg transition-all duration-300 lg:mt-3 ${
                        canGoDown
                            ? 'text-white hover:scale-110 hover:text-custom-golden'
                            : 'cursor-default text-zinc-800'
                    }`}
                >
                    <span className="lg:hidden">→</span>
                    <span className="hidden lg:inline">↓</span>
                </button>
            </div>

            <div className="flex max-w-full flex-row gap-3 sm:gap-4 lg:flex-col">
                {visibleClasses.map(({ dclass, index }) => {
                    const isSelected = selectedIndex === index;

                    const icon = dclass.icon
                        ? dclass.icon.indexOf('/revision/latest') === -1 
                        ? dclass.icon 
                        : dclass.icon.slice(0, dclass.icon.indexOf('/revision/latest'))
                        : undefined;

                    return (
                        <button
                            key={dclass.uid}
                            type="button"
                            onClick={() => onSelect(index)}
                            className={`shrink-0 overflow-hidden rounded-full bg-white/90 shadow-inner transition-all duration-300 ease-out ${
                                isSelected
                                    ? 'h-24 w-24 scale-105 border border-white/80 opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:h-28 sm:w-28 lg:h-40 lg:w-40'
                                    : 'h-20 w-20 scale-95 border border-transparent opacity-40 hover:scale-100 hover:opacity-80 sm:h-24 sm:w-24 lg:h-40 lg:w-40'
                            }`}
                        >
                            {icon && (
                                <img
                                    src={icon}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-contain"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}