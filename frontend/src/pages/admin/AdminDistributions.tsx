import { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminTable } from '../../components/admin/AdminTable';
import { DeleteModal } from '../../components/admin/DeleteModal';
import { DistributionForm } from '../../components/admin/DistributionForm';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminLoading } from '../../components/admin/AdminLoading';
import { useDistributions } from '../../hooks/distributions/useDistributions';
import { useCreateDistribution } from '../../hooks/distributions/useCreateDistribution';
import { useDeleteDistribution } from '../../hooks/distributions/useDeleteDistribution';
import type { Distribution } from '../../types/distribution';

export function AdminDistributions() {
    const { data: distributions = [], isLoading } = useDistributions();

    const createDistribution = useCreateDistribution();
    const deleteDistribution = useDeleteDistribution();
    
    const [deleting, setDeleting] = useState<Distribution | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        if (!createDistribution.isPending) {
            setShowForm(false);
        }
    };

    const handleDeleteCancel = () => {
        if (!deleteDistribution.isPending) {
            setDeleting(null);
        }
    };

    const handleCreateDistribution = (
        data: Parameters<typeof createDistribution.mutate>[0],
    ) => {
        createDistribution.mutate(data, {
            onSuccess: () => {
                setShowForm(false);
            },
        });
    };

    const handleDeleteDistribution = () => {
        if (!deleting) {
            return;
        }

        deleteDistribution.mutate(deleting.uid, {
            onSuccess: () => {
                setDeleting(null);
            },
        });
    };

    return (
        <>
            <AdminHeader
                title="Distributions"
                description="Manage dragon locations."
            />

            <div className="mt-6">
                <div className="mb-4 flex justify-end">
                    <button
                        type="button"
                        onClick={handleOpenForm}
                        className="rounded-md bg-custom-golden px-4 py-2 text-sm font-semibold text-black"
                    >
                        Add Distribution
                    </button>
                </div>

                {isLoading ? (
                    <AdminLoading />
                ) : (
                    <AdminTable
                        data={distributions}
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
                                key: 'alternate',
                                label: 'Alternate Names',
                                render: (item) => (
                                    <span className="text-zinc-500">
                                        {item.alternatenames ||
                                            '—'}
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
                    title="Create Distribution"
                    onClose={handleCloseForm}
                >
                    <DistributionForm
                        loading={
                            createDistribution.isPending
                        }
                        onCancel={handleCloseForm}
                        onSubmit={handleCreateDistribution}
                    />
                </AdminModal>
            )}

            <DeleteModal
                open={!!deleting}
                title={`Delete ${deleting?.name}?`}
                loading={deleteDistribution.isPending}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteDistribution}
            />
        </>
    );
}