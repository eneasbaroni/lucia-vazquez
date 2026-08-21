import Image from "next/image";

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
                <Image
                    src="/images/hero/Hero-imgB.png"
                    alt="Lucía Vázquez Leal"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                />

                <div
                    className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' result='noise'/%3E%3CfeComponentTransfer in='noise'%3E%3CfeFuncA type='linear' slope='4' intercept='0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundSize: "150px 150px",
                        backgroundRepeat: "repeat",
                    }}
                />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-sm font-light tracking-widest font-instrument-serif italic uppercase text-white/80">
                    <span>Telling stories</span>
                    <span>Through creative design</span>
                </div>
            </div>
        </section>
    );
}
