import { Link, useParams } from 'react-router-dom';
import { DragonGallery } from '../components/dragons/DragonGallery';
import { DragonStats } from '../components/dragons/DragonStats';
import { DragonPhysicalFeatures } from '../components/dragons/DragonPhysicalFeatures';
import { DragonEcologyBehavior } from '../components/dragons/DragonEcologyBehavior';
import { useDragon } from '../hooks/dragons/useDragon';

export function DragonDetail() {
    const { uid } = useParams<{ uid: string }>();

    const {
        data: dragon,
        isLoading,
        isError,
    } = useDragon(uid ?? '');

    if (isLoading) {
        return (
            <main className="flex min-h-80 w-full items-center justify-center px-4 py-16 sm:min-h-96 sm:px-6 lg:px-8">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-orange-400" />
            </main>
        );
    }

    if (isError || !dragon) {
        return (
            <main className="flex min-h-80 w-full flex-col items-center justify-center px-4 py-16 text-center sm:min-h-96 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold text-red-400">
                    Dragon not found
                </p>

                <Link
                    to="/dragons"
                    className="mt-4 text-sm font-medium text-orange-400 hover:underline"
                >
                    ← Back to all dragons
                </Link>
            </main>
        );
    }

    return (
        <main className="w-full min-w-0 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
            
            <div className="mt-8 grid w-full min-w-0 grid-cols-1 gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-10">

                <div className="flex min-w-0 max-w-full flex-col gap-6">
                    <DragonGallery
                        images={dragon.images}
                        species={dragon.species}
                    />

                    <DragonStats dragon={dragon} />
                </div>

                <div className="flex min-w-0 max-w-full flex-col gap-6 ">
                    <div className="w-full min-w-0">
                        <h1
                            className="max-w-full break-words font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-wide text-custom-golden drop-shadow-md"
                        >
                            {dragon.species}
                        </h1>

                        <div className="mt-4 flex w-full flex-wrap gap-2 sm:gap-3">
                            {dragon.dragon_class?.name && (
                                <span className="inline-flex max-w-full items-center rounded-full border border-custom-golden/40 bg-stone-900/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-custom-golden shadow-inner backdrop-blur-sm sm:px-4 sm:text-xs">
                                    {dragon.dragon_class.name} Class
                                </span>
                            )}

                            <span className="inline-flex max-w-full items-center rounded-full border border-custom-golden/40 bg-stone-900/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-custom-golden shadow-inner backdrop-blur-sm sm:px-4 sm:text-xs">
                                {dragon.firetype}
                            </span>
                        </div>
                    </div>
                    <DragonPhysicalFeatures dragon={dragon} />
                    <DragonEcologyBehavior dragon={dragon} />
                </div>

            </div>
        </main>
    );
}