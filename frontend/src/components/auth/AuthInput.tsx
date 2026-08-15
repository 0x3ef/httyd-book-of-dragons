interface AuthInputProps {
    label: string;
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    autoComplete?: string;
}

export function AuthInput({ label, type = 'text', value, placeholder, onChange, autoComplete }: AuthInputProps) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {label}
            </span>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:border-custom-golden/60 focus:bg-white/[0.05] focus:ring-1 focus:ring-custom-golden/30"
            />
        </label>
    );
}