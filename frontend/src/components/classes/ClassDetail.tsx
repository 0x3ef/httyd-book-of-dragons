import { Link } from 'react-router-dom';
import { useDragons } from '../../hooks/dragons/useDragons';
import type { DragonClass } from '../../types/dragonClass';

interface ClassDetailProps {
    dragonClass: DragonClass;
}

function DragonToken({ uid, species, imageUrl }: { uid: string; species: string; imageUrl?: string; }) {
    return (
        <Link
            to={`/dragons/${uid}`}
            className="group flex flex-col items-center gap-2"
        >
            <div className="flex h-30 w-30 items-center justify-center shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-purple-950 group-hover:shadow-md sm:h-30 sm:w-30">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={species}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-auto max-h-72 sm:max-h-80 md:max-h-96 lg:max-h-[420px] max-w-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <span className="text-xs text-custom-golden">?</span>
                )}
            </div>

            <p className="max-w-[6rem] text-center text-xs font-medium leading-tight text-custom-golden transition-colors group-hover:text-custom-golden-2 sm:max-w-[6.5rem]">
                {species}
            </p>
        </Link>
    );
}

export function ClassDetail({ dragonClass } : ClassDetailProps) {
    const { data: allDragons, isLoading: dragonsLoading } = useDragons();
    const label = dragonClass.name;

    const classDragons = (allDragons ?? []).filter(
        (dragon) => dragon.dragon_class?.uid === dragonClass.uid
    );

    return (
        <main className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:items-start sm:text-left">
                <div>
                    <h1 className="font-display text-custom-golden text-3xl font-bold sm:text-9xl">
                        {label}
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-white sm:text-lg">
                        {dragonClass.description}
                    </p>
                </div>
            </div>

            <section className="mt-10">

                {dragonsLoading && (
                    <div className="flex items-center justify-center py-12">
                        <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-custom-golden-2" />
                    </div>
                )}

                {!dragonsLoading && classDragons.length === 0 && (
                    <p className="mt-4 text-sm italic text-stone-400">
                        No dragons recorded for this class yet.
                    </p>
                )}

                {!dragonsLoading && classDragons.length > 0 && (
                    <div className="mt-5 grid grid-cols-3 gap-x-5 gap-y-7 sm:grid-cols-4 md:grid-cols-6">
                        {classDragons.map((dragon) => (
                            <DragonToken
                                key={dragon.uid}
                                uid={dragon.uid}
                                species={dragon.species}
                                imageUrl={
                                    dragon.images[0]?.url
                                        ? dragon.images[0].url.indexOf('/revision/latest') === -1 
                                        ? dragon.images[0].url 
                                        : dragon.images[0].url.slice(0, dragon.images[0].url.indexOf('/revision/latest'))
                                        : undefined
                                }
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}