import { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminTable } from '../../components/admin/AdminTable';
import { ClassForm } from '../../components/admin/ClassForm';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { DeleteModal } from '../../components/admin/DeleteModal';
import { useClasses } from '../../hooks/classes/useClasses';
import { useCreateClass } from '../../hooks/classes/useCreateClass';
import { useUpdateClass } from '../../hooks/classes/useUpdateClass';
import { useDeleteClass } from '../../hooks/classes/useDeleteClass';
import type { DragonClass } from '../../types/dragonClass';

export function AdminClasses() {
    const { data: classes = [], isLoading } = useClasses();

    const createClass = useCreateClass();
    const updateClass = useUpdateClass();
    const deleteClass = useDeleteClass();

    const [editing, setEditing] = useState<DragonClass | null>(null);
    const [deleting, setDeleting] = useState<DragonClass | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleOpenCreate = () => {
        setEditing(null);
        setShowForm(true);
    };

    const handleOpenEdit = (item: DragonClass) => {
        setEditing(item);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        if (
            !createClass.isPending &&
            !updateClass.isPending
        ) {
            setShowForm(false);
            setEditing(null);
        }
    };

    const handleDeleteCancel = () => {
        if (!deleteClass.isPending) {
            setDeleting(null);
        }
    };

    const handleSubmit = (
        data: Parameters<typeof createClass.mutate>[0],
    ) => {
        if (editing) {
            updateClass.mutate(
                {
                    uid: editing.uid,
                    data,
                },
                {
                    onSuccess: () => {
                        handleCloseForm();
                    },
                },
            );

            return;
        }

        createClass.mutate(data, {
            onSuccess: () => {
                handleCloseForm();
            },
        });
    };

    const handleDeleteClass = () => {
        if (!deleting) {
            return;
        }

        deleteClass.mutate(deleting.uid, {
            onSuccess: () => {
                setDeleting(null);
            },
        });
    };

    return (
        <>
            <AdminHeader
                title="Classes"
                description="Manage dragon classes."
            />

            <div className="mt-6">
                <div className="mb-4 flex justify-end">
                    <button
                        type="button"
                        onClick={handleOpenCreate}
                        className="rounded-md bg-custom-golden px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                    >
                        Add Class
                    </button>
                </div>

                {isLoading ? (
                    <AdminLoading />
                ) : (
                    <AdminTable
                        data={classes}
                        getRowKey={(item) => item.uid}
                        columns={[
                            {
                                key: 'name',
                                label: 'Name',
                                render: (item) => (
                                    <span className="font-medium text-white">
                                        {item.name}
                                    </span>
                                ),
                            },
                            {
                                key: 'description',
                                label: 'Description',
                                render: (item) => (
                                    <span className="line-clamp-1 text-zinc-500">
                                        {item.description ||
                                            'No description'}
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
                            ? 'Edit Class'
                            : 'Create Class'
                    }
                    onClose={handleCloseForm}
                >
                    <ClassForm
                        initialData={editing ?? undefined}
                        loading={
                            createClass.isPending ||
                            updateClass.isPending
                        }
                        onCancel={handleCloseForm}
                        onSubmit={handleSubmit}
                    />
                </AdminModal>
            )}

            <DeleteModal
                open={!!deleting}
                title={`Delete ${deleting?.name}?`}
                loading={deleteClass.isPending}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteClass}
            />
        </>
    );
}