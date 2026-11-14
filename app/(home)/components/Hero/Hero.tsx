import { AccentedText, GrainOverlay } from "@/components";
import Image from "next/image";

const DISCIPLINES = [
    { text: "Diseño Gráfico", accentIndices: [3, 10] },
    { text: "Dirección de Arte", accentIndices: [2, 14] },
    { text: "Artista Audiovisual", accentIndices: [6, 12] },
];

export function Hero() {
    return (
        <section className="relative h-dvh w-full overflow-hidden text-white">
            <Image
                src="/images/hero/Hero-imgB.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 object-cover object-top"
            />

            <GrainOverlay mobileTileSize={180} mobileOpacity={0.1} />

            <div className="pointer-events-none absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="sr-only">Lucía Vázquez — Arte Visual</h1>
                <span
                    aria-hidden="true"
                    className="block h-[42dvh] w-[34dvh] bg-white mobile:h-[34dvh] mobile:w-[27dvh] mask-[url(/images/isologo.svg)] mask-contain mask-center mask-no-repeat"
                />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-10 px-10 pb-12 mobile:flex-col mobile:items-center mobile:gap-3 mobile:px-5 mobile:pb-8">
                <p className="font-archivo flex flex-wrap items-center gap-x-4 gap-y-1 text-[clamp(0.875rem,1.2vw,1.125rem)] leading-none font-black tracking-tight [word-spacing:0.25em] uppercase text-white [font-stretch:80%] pb-1 mobile:justify-center mobile:gap-x-2.5 mobile:pb-0 mobile:text-sm">
                    {DISCIPLINES.map((discipline, index) => (
                        <span
                            key={discipline.text}
                            className="flex items-center gap-4 mobile:gap-2.5"
                        >
                            {index > 0 && (
                                <span
                                    aria-hidden="true"
                                    className="block size-1.5 rounded-full bg-current"
                                />
                            )}
                            {/* Plain inline wrapper: inside the flex row each
                                text run / script letter would otherwise become
                                its own flex item and get pulled apart by gap. */}
                            <span>
                                <AccentedText
                                    text={discipline.text}
                                    accentIndices={discipline.accentIndices}
                                />
                            </span>
                        </span>
                    ))}
                </p>

                <p className="max-w-xs text-right text-sm font-bold text-white/70 mobile:hidden">
                    Desarrollo creativo, comunicación visual y gestión integral
                    de proyectos artísticos.
                </p>
            </div>
        </section>
    );
}
