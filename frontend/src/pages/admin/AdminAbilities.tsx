import { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminTable } from '../../components/admin/AdminTable';
import { AbilityForm } from '../../components/admin/AbilityForm';
import { DeleteModal } from '../../components/admin/DeleteModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { useAbilities } from '../../hooks/abilities/useAbilities';
import { useCreateAbility } from '../../hooks/abilities/useCreateAbility';
import { useDeleteAbility } from '../../hooks/abilities/useDeleteAbility';
import type { Ability } from '../../types/ability';

export function AdminAbilities() {
    const { data: abilities = [], isLoading } = useAbilities();

    const createAbility = useCreateAbility();
    const deleteAbility = useDeleteAbility();

    const [deleting, setDeleting] = useState<Ability | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        if (!createAbility.isPending) {
            setShowForm(false);
        }
    };

    const handleDeleteCancel = () => {
        if (!deleteAbility.isPending) {
            setDeleting(null);
        }
    };

    const handleCreateAbility = (data: Parameters<typeof createAbility.mutate>[0]) => {
        createAbility.mutate(data, {
            onSuccess: () => {
                setShowForm(false);
            },
        });
    };

    const handleDeleteAbility = () => {
        if (!deleting) {
            return;
        }

        deleteAbility.mutate(deleting.uid, {
            onSuccess: () => {
                setDeleting(null);
            },
        });
    };

    return (
        <>
            <AdminHeader
                title="Abilities"
                description="Manage dragon abilities."
            />

            <div className="mt-6">
                <div className="mb-4 flex justify-end">
                    <button
                        type="button"
                        onClick={handleOpenForm}
                        className="rounded-md bg-custom-golden px-4 py-2 text-sm font-semibold text-black"
                    >
                        Add Ability
                    </button>
                </div>

                {isLoading ? (
                    <AdminLoading />
                ) : (
                    <AdminTable
                        data={abilities}
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
                        ]}
                        onDelete={setDeleting}
                    />
                )}
            </div>

            {showForm && (
                <AdminModal
                    title="Create Ability"
                    onClose={handleCloseForm}
                >
                    <AbilityForm
                        loading={createAbility.isPending}
                        onCancel={handleCloseForm}
                        onSubmit={handleCreateAbility}
                    />
                </AdminModal>
            )}

            <DeleteModal
                open={!!deleting}
                title={`Delete ${deleting?.name}?`}
                loading={deleteAbility.isPending}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteAbility}
            />
        </>
    );
}