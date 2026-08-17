import { DragonTable } from '../components/dragons/DragonTable';
import { useDragons } from '../hooks/dragons/useDragons';

export function Dragons() {
    const { data: dragons, isLoading, isError } = useDragons();

    return (
        <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
            {isLoading && (
                <div className="flex flex-col items-center gap-3 py-24">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-orange-500 dark:border-stone-700 dark:border-t-orange-400" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                        Loading the archive...
                    </p>
                </div>
            )}

            {isError && (
                <div className="flex items-center justify-center py-24">
                    <p className="text-sm font-semibold text-red-500 dark:text-red-400">
                        Failed to load dragon archives.
                    </p>
                </div>
            )}

            {dragons && <DragonTable dragons={dragons} />}
        </main>
    );
}
