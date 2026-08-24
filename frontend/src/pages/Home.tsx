import { Link } from 'react-router-dom';

export function Home() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 text-center">

            <section className="flex max-w-3xl flex-col items-center">

                <h1 className="font-display text-5xl font-bold uppercase leading-[0.85] tracking-widest text-white sm:text-7xl md:text-8xl">
                    Book
                    <span className="block text-3xl tracking-[0.5em] text-custom-golden sm:text-4xl">
                        of
                    </span>
                    <span className="block">
                        Dragons
                    </span>
                </h1>

                <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-custom-golden to-transparent" />

                <p className="mt-7 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                    An organized archive of dragons from the
                    <span className="text-zinc-300">
                        {' '}How to Train Your Dragon
                    </span>
                    {' '}universe.
                </p>

                <Link
                    to="/dragons"
                    className="mt-8 border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-custom-golden/70 hover:text-custom-golden hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                >
                    Explore Dragons
                </Link>

            </section>
        </main>
    );
}