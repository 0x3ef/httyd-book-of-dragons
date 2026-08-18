import { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DeleteModal } from '../../components/admin/DeleteModal';
import { ImageForm } from '../../components/admin/ImageForm';
import { ImageCard } from '../../components/admin/ImageCard';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { useImages } from '../../hooks/images/useImages';
import { useDragons } from '../../hooks/dragons/useDragons';
import { useCreateImage } from '../../hooks/images/useCreateImage';
import { useDeleteImage } from '../../hooks/images/useDeleteImage';
import type { Image, ImageCreateRequest } from '../../types/image';

export function AdminImages() {
    const { data: images = [], isLoading } = useImages();
    const { data: dragons = [] } = useDragons();

    const createImage = useCreateImage();
    const deleteImage = useDeleteImage();

    const [showForm, setShowForm] = useState(false);
    const [deleting, setDeleting] = useState<Image | null>(null);

    const getDragonName = (dragonUid: string | null) => {
        if (!dragonUid) {
            return 'Unassigned';
        }

        return (
            dragons.find(
                (dragon) => dragon.uid === dragonUid,
            )?.species ?? 'Unknown dragon'
        );
    };

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        if (!createImage.isPending) {
            setShowForm(false);
        }
    };

    const handleDeleteCancel = () => {
        if (!deleteImage.isPending) {
            setDeleting(null);
        }
    };

    const handleCreateImage = async (
        data: ImageCreateRequest,
    ) => {
        try {
            await createImage.mutateAsync(data);
            setShowForm(false);
        } catch (error) {
            console.error(
                'Failed to create image:',
                error,
            );
        }
    };

    const handleDeleteImage = () => {
        if (!deleting) {
            return;
        }

        deleteImage.mutate(deleting.uid, {
            onSuccess: () => {
                setDeleting(null);
            },
        });
    };

    return (
        <>
            <AdminHeader
                title="Images"
                description="Manage dragon images."
            />

            <div className="mt-6">
                <div className="mb-6 flex justify-end">
                    <button
                        type="button"
                        onClick={handleOpenForm}
                        className="rounded-md bg-custom-golden px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110"
                    >
                        Add Image
                    </button>
                </div>

                {isLoading ? (
                    <AdminLoading />
                ) : images.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {images.map((image) => (
                            <ImageCard
                                key={image.uid}
                                image={image}
                                dragonName={getDragonName(
                                    image.dragon_uid,
                                )}
                                onDelete={() =>
                                    setDeleting(image)
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <AdminModal
                    title="Add Image"
                    onClose={handleCloseForm}
                >
                    <ImageForm
                        dragons={dragons}
                        loading={createImage.isPending}
                        onCancel={handleCloseForm}
                        onSubmit={handleCreateImage}
                    />
                </AdminModal>
            )}

            <DeleteModal
                open={!!deleting}
                title="Delete image?"
                description="This will permanently remove this image from the archive."
                loading={deleteImage.isPending}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteImage}
            />
        </>
    );
}

function EmptyState() {
    return (
        <div className="rounded-lg border border-white/10 bg-white/[0.02] py-16 text-center">
            <p className="text-sm text-zinc-500">
                No images found.
            </p>
        </div>
    );
}