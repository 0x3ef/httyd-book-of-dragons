import type { Dragon } from '../../types/dragon';
import { ExpandableList } from './ExpandableList';

export function DragonPhysicalFeatures({ dragon }: { dragon: Dragon; }) {
    const characteristics = [
        { label: 'Weight', value: dragon.weight },
        { label: 'Wingspan', value: dragon.wingspan },
        { label: 'Size', value: dragon.size },
        { label: 'Colors', value: dragon.colors },
        { label: 'Features', value: dragon.features },
    ];

    return (
        <section className="w-full min-w-0 rounded-2xl border border-custom-golden p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
            <h2 className="text-center font-display text-base font-semibold text-custom-golden sm:text-lg">
                PHYSICAL FEATURES
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 font-semibold sm:grid-cols-2 sm:items-start">
                {characteristics.map((item) => (
                    <div
                        key={item.label}
                        className="min-w-0"
                    >
                        <span className="tracking-wide text-custom-golden">
                            {item.label}:
                        </span>

                        {Array.isArray(item.value) ? (
                            <div className="mt-1">
                                <ExpandableList
                                    items={item.value}
                                    limit={1}
                                />
                            </div>
                        ) : (
                            <span className="ml-2 break-words text-sm text-white">
                                {item.value || 'N/A'}
                            </span>
                        )}
                    </div>
                ))}
                <div className='min-w-0'>
                    <p className="tracking-wide text-custom-golden">
                        Abilities:
                    </p>

                    <div className="mt-2">
                        <ExpandableList
                            items={dragon.abilities.map(
                                (ability) => ability.name
                            )}
                            limit={1}
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}