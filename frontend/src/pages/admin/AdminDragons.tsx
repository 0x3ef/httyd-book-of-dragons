import { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminTable } from '../../components/admin/AdminTable';
import { DeleteModal } from '../../components/admin/DeleteModal';
import { DragonForm } from '../../components/admin/DragonForm';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { useDragons } from '../../hooks/dragons/useDragons';
import { useClasses } from '../../hooks/classes/useClasses';
import { useCreateDragon } from '../../hooks/dragons/useCreateDragon';
import { useUpdateDragon } from '../../hooks/dragons/useUpdateDragon';
import { useDeleteDragon } from '../../hooks/dragons/useDeleteDragon';
import type { Dragon, DragonCreateRequest } from '../../types/dragon';

export function AdminDragons() {
    const { data: dragons = [], isLoading } = useDragons();
    const { data: classes = [] } = useClasses();

    const createDragon = useCreateDragon();
    const updateDragon = useUpdateDragon();
    const deleteDragon = useDeleteDragon();

    const [editing, setEditing] = useState<Dragon | null>(null);
    const [deleting, setDeleting] = useState<Dragon | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleOpenCreate = () => {
        setEditing(null);
        setShowForm(true);
    };

    const handleOpenEdit = (dragon: Dragon) => {
        setEditing(dragon);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        if (
            !createDragon.isPending &&
            !updateDragon.isPending
        ) {
            setShowForm(false);
            setEditing(null);
        }
    };

    const handleDeleteCancel = () => {
        if (!deleteDragon.isPending) {
            setDeleting(null);
        }
    };

    const handleSubmit = (data: DragonCreateRequest) => {
        if (editing) {
            updateDragon.mutate(
                {
                    uid: editing.uid,
                    data,
                },
                {
                    onSuccess: handleCloseForm,
                },
            );

            return;
        }

        createDragon.mutate(data, {
            onSuccess: handleCloseForm,
        });
    };

    const handleDeleteDragon = () => {
        if (!deleting) {
            return;
        }

        deleteDragon.mutate(deleting.uid, {
            onSuccess: () => {
                setDeleting(null);
            },
        });
    };

    return (
        <>
            <AdminHeader
                title="Dragons"
                description="Manage the dragon archive."
            />

            <div className="mt-6">
                <div className="mb-4 flex justify-end">
                    <button
                        type="button"
                        onClick={handleOpenCreate}
                        className="rounded-md bg-custom-golden px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-80"
                    >
                        Add Dragon
                    </button>
                </div>

                {isLoading ? (
                    <AdminLoading />
                ) : (
                    <AdminTable
                        data={dragons}
                        getRowKey={(item) => item.uid}
                        columns={[
                            {
                                key: 'species',
                                label: 'Species',
                                render: (item) => (
                                    <span className="font-medium text-white">
                                        {item.species}
                                    </span>
                                ),
                            },
                            {
                                key: 'class',
                                label: 'Class',
                                render: (item) => (
                                    <span className="text-zinc-500">
                                        {item.dragon_class?.name ??
                                            'Unknown'}
                                    </span>
                                ),
                            },
                            {
                                key: 'trainable',
                                label: 'Trainable',
                                render: (item) => (
                                    <span
                                        className={
                                            item.trainable
                                                ? 'text-emerald-400'
                                                : 'text-zinc-600'
                                        }
                                    >
                                        {item.trainable
                                            ? 'Yes'
                                            : 'No'}
                                    </span>
                                ),
                            },
                        ]}
                        onEdit={handleOpenEdit}
                        onDelete={setDeleting}
                    />
                )}
            </div>

            {showForm && (
                <AdminModal
                    title={
                        editing
                            ? `Edit ${editing.species}`
                            : 'Create Dragon'
                    }
                    onClose={handleCloseForm}
                >
                    <DragonForm
                        initialData={editing ?? undefined}
                        classes={classes}
                        loading={
                            createDragon.isPending ||
                            updateDragon.isPending
                        }
                        onCancel={handleCloseForm}
                        onSubmit={handleSubmit}
                    />
                </AdminModal>
            )}

            <DeleteModal
                open={!!deleting}
                title={`Delete ${deleting?.species}?`}
                description="This will permanently remove the dragon from the archive."
                loading={deleteDragon.isPending}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteDragon}
            />
        </>
    );
}