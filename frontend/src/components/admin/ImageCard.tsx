import type { Image } from '../../types/image';

interface ImageCardProps {
    image: Image;
    dragonName: string;
    onDelete: () => void;
}

export function ImageCard({ image, dragonName, onDelete }: ImageCardProps) {
    return (
        <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition hover:border-white/20">
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-black/20">
                <img
                    src={image.url}
                    alt={dragonName}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    onError={(event) => {
                        event.currentTarget.style.display = 'none';
                    }}
                />

                <button
                    type="button"
                    onClick={onDelete}
                    aria-label={`Delete image for ${dragonName}`}
                    className="absolute right-2 top-2 rounded-md border border-white/10 bg-black/70 px-2.5 py-1.5 text-xs text-zinc-400 opacity-0 backdrop-blur transition hover:border-red-400/30 hover:text-red-400 group-hover:opacity-100"
                >
                    Delete
                </button>
            </div>

            <div className="border-t border-white/10 px-4 py-3">
                <p className="truncate text-sm font-medium text-white">
                    {dragonName}
                </p>

                <p className="mt-1 truncate text-xs text-zinc-600">
                    {image.url}
                </p>
            </div>
        </article>
    );
}