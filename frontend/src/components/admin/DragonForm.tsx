import { useEffect, useState } from 'react';
import type { Dragon, DragonCreateRequest } from '../../types/dragon';
import type { DragonClass } from '../../types/dragonClass';

interface DragonFormProps {
    initialData?: Dragon;
    classes: DragonClass[];
    loading?: boolean;
    onSubmit: (data: DragonCreateRequest) => void;
    onCancel: () => void;
}

export function DragonForm({ initialData, classes, loading = false, onSubmit, onCancel, }: DragonFormProps) {
    const [species, setSpecies] = useState('');
    const [firetype, setFiretype] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState(0);
    const [wingspan, setWingspan] = useState(0);
    const [trainable, setTrainable] = useState(false);
    const [classUid, setClassUid] = useState('');

    const [attack, setAttack] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [armor, setArmor] = useState(0);
    const [firepower, setFirepower] = useState(0);
    const [shotlimit, setShotlimit] = useState(0);
    const [venom, setVenom] = useState(0);
    const [jawstrength, setJawstrength] = useState(0);
    const [stealth, setStealth] = useState(0);

    useEffect(() => {
        setSpecies(initialData?.species ?? '');
        setFiretype(initialData?.firetype ?? '');
        setSize(initialData?.size ?? '');
        setWeight(initialData?.weight ?? 0);
        setWingspan(initialData?.wingspan ?? 0);
        setTrainable(initialData?.trainable ?? false);

        setClassUid(
            initialData?.dragon_class?.uid ?? '',
        );

        setAttack(initialData?.attack ?? 0);
        setSpeed(initialData?.speed ?? 0);
        setArmor(initialData?.armor ?? 0);
        setFirepower(initialData?.firepower ?? 0);
        setShotlimit(initialData?.shotlimit ?? 0);
        setVenom(initialData?.venom ?? 0);
        setJawstrength(initialData?.jawstrength ?? 0);
        setStealth(initialData?.stealth ?? 0);
    }, [initialData]);

    const handleSubmit = (
        event: React.FormEvent,
    ) => {
        event.preventDefault();

        onSubmit({
            species,
            firetype,
            features: initialData?.features ?? [],
            colors: initialData?.colors ?? [],
            diet: initialData?.diet ?? [],
            habitat: initialData?.habitat ?? [],
            size,
            weight,
            wingspan,
            trainable,
            attack,
            speed,
            armor,
            firepower,
            shotlimit,
            venom,
            jawstrength,
            stealth,
            class_uid: classUid || null,
            abilities: [],
            distributions: [],
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            <FormSection title="Identity">
                <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                        label="Species"
                        value={species}
                        onChange={setSpecies}
                        required
                    />

                    <Input
                        label="Fire Type"
                        value={firetype}
                        onChange={setFiretype}
                    />

                    <Input
                        label="Size"
                        value={size}
                        onChange={setSize}
                    />

                    <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Class
                        </span>

                        <select
                            value={classUid}
                            onChange={(e) =>
                                setClassUid(
                                    e.target.value,
                                )
                            }
                            className="admin-input"
                        >
                            <option value="">
                                Unknown
                            </option>

                            {classes.map((dragonClass) => (
                                <option
                                    key={dragonClass.uid}
                                    value={dragonClass.uid}
                                >
                                    {dragonClass.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </FormSection>

            <FormSection title="Physical">
                <div className="grid gap-5 sm:grid-cols-2">
                    <NumberInput
                        label="Weight"
                        value={weight}
                        onChange={setWeight}
                    />

                    <NumberInput
                        label="Wingspan"
                        value={wingspan}
                        onChange={setWingspan}
                    />
                </div>

                <label className="mt-5 flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={trainable}
                        onChange={(e) =>
                            setTrainable(
                                e.target.checked,
                            )
                        }
                        className="h-4 w-4 accent-[var(--color-custom-golden)]"
                    />

                    <span className="text-sm text-zinc-300">
                        Trainable
                    </span>
                </label>
            </FormSection>

            <FormSection title="Statistics">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <NumberInput
                        label="Attack"
                        value={attack}
                        onChange={setAttack}
                    />

                    <NumberInput
                        label="Speed"
                        value={speed}
                        onChange={setSpeed}
                    />

                    <NumberInput
                        label="Armor"
                        value={armor}
                        onChange={setArmor}
                    />

                    <NumberInput
                        label="Firepower"
                        value={firepower}
                        onChange={setFirepower}
                    />

                    <NumberInput
                        label="Shot Limit"
                        value={shotlimit}
                        onChange={setShotlimit}
                    />

                    <NumberInput
                        label="Venom"
                        value={venom}
                        onChange={setVenom}
                    />

                    <NumberInput
                        label="Jaw Strength"
                        value={jawstrength}
                        onChange={setJawstrength}
                    />

                    <NumberInput
                        label="Stealth"
                        value={stealth}
                        onChange={setStealth}
                    />
                </div>
            </FormSection>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md px-4 py-2 text-sm text-zinc-400 hover:text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-custom-golden px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Dragon'}
                </button>
            </div>
        </form>
    );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode; }) {
    return (
        <section>
            <h2 className="mb-4 font-display text-lg font-semibold text-white">
                {title}
            </h2>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                {children}
            </div>
        </section>
    );
}

function Input({ label, value, onChange, required = false,}: { label: string; value: string; onChange: (value: string) => void; required?: boolean; }) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {label}
            </span>

            <input
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                required={required}
                className="admin-input"
            />
        </label>
    );
}

function NumberInput({ label, value, onChange, }: { label: string; value: number; onChange: (value: number) => void; }) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {label}
            </span>

            <input
                type="number"
                value={value}
                onChange={(e) =>
                    onChange(Number(e.target.value))
                }
                className="admin-input"
            />
        </label>
    );
}