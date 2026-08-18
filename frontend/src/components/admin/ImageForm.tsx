import { useState } from 'react';
import type { Dragon } from '../../types/dragon';
import type { ImageCreateRequest } from '../../types/image';

interface ImageFormProps {
    dragons: Dragon[];
    loading: boolean;
    onCancel: () => void;
    onSubmit: (data: ImageCreateRequest) => void | Promise<void>;
}

export function ImageForm({ dragons, loading, onCancel, onSubmit, }: ImageFormProps) {
    const [dragonUid, setDragonUid] = useState('');
    const [url, setUrl] = useState('');
    const [imageError, setImageError] = useState(false);

    const selectedDragon = dragons.find(
        (dragon) => dragon.uid === dragonUid,
    );

    const trimmedUrl = url.trim();

    const isSubmitDisabled =
        loading || !dragonUid || !trimmedUrl;

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (isSubmitDisabled) {
            return;
        }

        await onSubmit({
            dragon_uid: dragonUid,
            url: trimmedUrl,
        });
    };

    const handleUrlChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUrl(event.target.value);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label
                    htmlFor="dragon"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-custom-golden"
                >
                    Dragon
                </label>

                <select
                    id="dragon"
                    value={dragonUid}
                    onChange={(event) =>
                        setDragonUid(event.target.value)
                    }
                    required
                    disabled={loading}
                    className="w-full rounded-lg border border-[#2A2F36] bg-[#090909] px-4 py-3 text-sm text-white outline-none transition focus:border-custom-golden disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">
                        Select a dragon
                    </option>

                    {dragons.map((dragon) => (
                        <option
                            key={dragon.uid}
                            value={dragon.uid}
                        >
                            {dragon.species}
                        </option>
                    ))}
                </select>
            </div>

            {selectedDragon && (
                <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                        Selected dragon
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                        {selectedDragon.species}
                    </p>
                </div>
            )}

            <div>
                <label
                    htmlFor="image-url"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-custom-golden"
                >
                    Image URL
                </label>

                <input
                    id="image-url"
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://..."
                    required
                    disabled={loading}
                    className="w-full rounded-lg border border-[#2A2F36] bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-custom-golden disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            {trimmedUrl && !imageError && (
                <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
                    <div className="flex h-48 items-center justify-center p-3">
                        <img
                            src={trimmedUrl}
                            alt={`Preview of ${
                                selectedDragon?.species ?? 'dragon'
                            } image`}
                            className="h-full w-full object-contain"
                            onError={handleImageError}
                        />
                    </div>
                </div>
            )}

            {imageError && (
                <p className="text-sm text-red-400">
                    Unable to load image preview.
                </p>
            )}

            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="rounded-lg border border-custom-golden px-5 py-2 text-sm font-semibold text-custom-golden transition hover:bg-custom-golden hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Image'}
                </button>
            </div>
        </form>
    );
}