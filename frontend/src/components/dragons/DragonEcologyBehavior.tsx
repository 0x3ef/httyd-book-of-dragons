import type { Dragon } from '../../types/dragon';
import { ExpandableList } from './ExpandableList';

export function DragonEcologyBehavior({ dragon }: { dragon: Dragon; }) {
    const characteristics = [
        {
            label: 'Diet',
            value: dragon.diet,
        },
        {
            label: 'Habitat',
            value: dragon.habitat,
        },
        {
            label: 'Trainable',
            value: dragon.trainable ? 'Yes' : 'No',
        },
    ];

    return (
        <section className="w-full min-w-0 rounded-2xl border border-custom-golden p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
            <h2 className="text-center font-display text-base font-semibold text-custom-golden sm:text-lg">
                ECOLOGY & BEHAVIOR
            </h2>

            <div className="mt-5 space-y-4 font-semibold">
                {characteristics.map((item) => (
                    <div
                        key={item.label}
                        className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1"
                    >
                        <span className="shrink-0 tracking-wide text-custom-golden">
                            {item.label}:
                        </span>

                        {Array.isArray(item.value) ? (
                            <ExpandableList
                                items={item.value}
                                limit={3}
                                variant="inline"
                            />
                        ) : (
                            <span className="break-words text-sm text-white">
                                {item.value || 'N/A'}
                            </span>
                        )}
                    </div>
                ))}

                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="shrink-0 tracking-wide text-custom-golden">
                        Distributions:
                    </span>

                    <ExpandableList
                        items={
                            dragon.distributions?.map(
                                (distribution) => distribution.name
                            ) ?? []
                        }
                        limit={4}
                        variant="inline"
                    />
                </div>
            </div>
        </section>
    );
}