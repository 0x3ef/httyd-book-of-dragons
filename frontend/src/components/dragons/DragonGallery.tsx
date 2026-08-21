import { useState } from 'react';
import type { Image } from '../../types/image';

interface DragonGalleryProps {
    images: Image[];
    species: string;
}

export function DragonGallery({ images, species }: DragonGalleryProps) {
    const rawImage = images[0]?.url;

    const [failed, setFailed] = useState(false);

    const mainImage = rawImage
                ? rawImage.indexOf('/revision/latest') === -1 
                ? rawImage 
                : rawImage.slice(0, rawImage.indexOf('/revision/latest'))
                : undefined;

    return (
        <div className="flex w-full min-w-0 items-center justify-center overflow-hidden p-2 sm:p-4">
            {mainImage && !failed ? (
                <img
                    src={mainImage}
                    alt={species}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                        if (
                            event.currentTarget.src !== rawImage &&
                            rawImage
                        ) {
                            event.currentTarget.src = rawImage;
                        } else {
                            setFailed(true);
                        }
                    }}
                    className="h-auto w-auto max-h-72 sm:max-h-80 md:max-h-96 lg:max-h-[420px] max-w-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
                />
            ) : (
                <div className="flex min-h-56 w-full max-w-md flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stone-700/50 sm:min-h-64">
                    <p className="text-sm text-stone-500">
                        No image available
                    </p>
                </div>
            )}
        </div>
    );
}