import { GrainOverlay, HalftoneImage } from "@/components";

export function Hero() {
    return (
        <section className="flex w-full flex-col bg-white text-black">
            <div className="relative flex h-[70vh] w-full items-end justify-between gap-10 px-10 pb-12 mobile:flex-col mobile:items-start mobile:gap-6 mobile:px-5">
                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 h-full w-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/[0.04]"
                    style={{
                        WebkitMaskImage: "url('/images/logo.svg')",
                        maskImage: "url('/images/logo.svg')",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                    }}
                />

                <h1 className="leading-[0.85] tracking-tight uppercase text-5xl">
                    Lucía
                    <br />
                    Vázquez Leal
                </h1>

                <p className="max-w-xs text-right text-sm font-light text-black/70 mobile:text-left">
                    Desarrollo creativo, comunicación visual y gestión integral
                    de proyectos artísticos.
                </p>
            </div>

            <div className="relative h-dvh w-full overflow-hidden">
                <HalftoneImage
                    src="/images/hero/Hero-imgB.png"
                    alt="Lucía Vázquez Leal"
                    priority
                    sizes="100vw"
                    className="absolute inset-0"
                    imageClassName="object-top"
                    align="top"
                />

                <GrainOverlay />

                <div className="pointer-events-none absolute inset-0 bg-black/30" />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-sm font-light tracking-widest font-instrument-serif italic uppercase text-white/80">
                    <span>Telling stories</span>
                    <span>Through creative design</span>
                </div>
            </div>
        </section>
    );
}
