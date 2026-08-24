export function About() {
    const githubUrl = import.meta.env.VITE_GITHUB_URL;
    
    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6">

            <section className="flex min-h-[45vh] flex-col items-center justify-center text-center">

                <h1 className="font-display text-5xl font-bold tracking-wide text-white sm:text-7xl">
                    Book of Dragons
                </h1>
                            
                <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-custom-golden to-transparent" />

                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                    An open-source web project created to organize and explore
                    information about the dragons of the How to Train Your Dragon
                    universe in one place.
                </p>

            </section>

            <section className="border-t border-white/10 py-16">

                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-custom-golden">
                            The Project
                        </p>

                        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                            A digital dragon archive
                        </h2>
                    </div>

                    <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                        Book of Dragons is an open-source project designed to
                        bring together information about dragons from the
                        How to Train Your Dragon universe in an organized and
                        accessible way. Explore dragons, classes, abilities,
                        locations, and other details through a single interface.
                    </p>
                </div>

            </section>

            <section className="border-t border-white/10 py-16">

                <div className="mb-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-custom-golden">
                        Explore
                    </p>

                    <h2 className="mt-3 font-display text-3xl font-bold text-white">
                        The Dragon World
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {[
                        {
                            title: 'Dragons',
                            description:
                                'Discover individual dragons and their characteristics.',
                        },
                        {
                            title: 'Classes',
                            description:
                                'Learn about the different dragon classes and their traits.',
                        },
                        {
                            title: 'Abilities',
                            description:
                                'Explore the unique abilities found across the species.',
                        },
                        {
                            title: 'Locations',
                            description:
                                'Discover where different dragons can be found.',
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
                        >
                            <h3 className="font-display text-xl font-semibold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                                {item.description}
                            </p>
                        </div>
                    ))}

                </div>

            </section>

            <section className="border-t border-white/10 py-16">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-custom-golden">
                        Open Source
                    </p>

                    <h2 className="mt-3 font-display text-3xl font-bold text-white">
                        Built to be explored
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
                        Book of Dragons is an open-source project. Its source
                        code is available for anyone interested in exploring,
                        learning from, contributing to, or improving the
                        project.
                    </p>

                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex items-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-custom-golden/60 hover:text-custom-golden"
                    >
                        View on GitHub
                    </a>

                </div>

            </section>

            <section className="border-t border-white/10 py-16">

                <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        Disclaimer
                    </p>

                    <h2 className="mt-3 font-display text-2xl font-bold text-white">
                        Fan-made project
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-zinc-400">
                        Book of Dragons is an unofficial, fan-made project and
                        is not affiliated with, endorsed by, or sponsored by
                        DreamWorks Animation or its respective rights holders.
                    </p>

                    <p className="mt-4 text-sm leading-7 text-zinc-400">
                        The images, names, descriptions, characters, dragons,
                        and other information presented on this website are
                        not my property. All intellectual property rights
                        belong to their respective owners and rights holders.
                        This project is intended for educational,
                        informational, and non-commercial purposes.
                    </p>
                </div>

            </section>

            <section className="border-t border-white/10 py-12 text-center">

                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Book of Dragons
                </p>

                <p className="mt-3 text-xs text-zinc-700">
                    An open-source fan project
                </p>

            </section>

        </main>
    );
}