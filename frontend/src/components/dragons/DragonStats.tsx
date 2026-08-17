import type { Dragon } from '../../types/dragon';

interface StatProps {
    name: string;
    value?: number;
}

export function DragonStats({ dragon }: { dragon: Dragon }) {
    const stats: StatProps[] = [
        { name: 'ATTACK', value: dragon.attack },
        { name: 'SPEED', value: dragon.speed },
        { name: 'ARMOR', value: dragon.armor },
        { name: 'FIRE POWER', value: dragon.firepower },
        { name: 'SHOT LIMIT', value: dragon.shotlimit },
        { name: 'VENOM', value: dragon.venom },
        { name: 'JAW STRENGTH', value: dragon.jawstrength },
        { name: 'STEALTH', value: dragon.stealth },
    ];

    const STAT_BAR_FROM = '#A78345';
    const STAT_BAR_TO = '#F0D69D';
    const STAT_TRACK_COLOR = '#E7E2D8';

    return (
        <section className="w-full min-w-0 rounded-2xl border border-custom-golden p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
            <div className="space-y-4">
                {stats.map((stat) => {
                    const percentage = Math.min(
                        ((stat.value ?? 0) / 20) * 100,
                        100
                    );

                    return (
                        <div
                            key={stat.name}
                            className="flex min-w-0 items-center gap-3"
                        >
                            <span className="w-20 shrink-0 text-xs font-medium text-custom-golden sm:w-28 sm:text-sm">
                                {stat.name}
                            </span>

                            <div
                                className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full sm:h-3"
                                style={{
                                    backgroundColor: STAT_TRACK_COLOR,
                                    colorScheme: 'light',
                                }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: STAT_BAR_FROM,
                                        backgroundImage: `linear-gradient(to right, ${STAT_BAR_FROM}, ${STAT_BAR_TO})`,
                                        colorScheme: 'light',
                                    }}
                                />
                            </div>

                            <span className="w-8 shrink-0 text-right text-xs font-semibold text-custom-golden sm:w-10 sm:text-sm">
                                {stat.value ?? 0}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}