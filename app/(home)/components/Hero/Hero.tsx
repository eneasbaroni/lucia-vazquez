import { GrainOverlay } from "@/components";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative h-dvh w-full overflow-hidden text-white">
            <Image
                src="/images/hero/Hero-imgB.png"
                alt="Lucía Vázquez Leal"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 object-cover object-top"
            />

            <GrainOverlay mobileTileSize={180} mobileOpacity={0.1} />

            <div className="pointer-events-none absolute inset-0 bg-black/30" />

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-sm font-light tracking-widest font-instrument-serif italic uppercase text-white/80">
                <span>Telling stories</span>
                <span>Through creative design</span>
            </div>

            <div className="absolute inset-0 flex items-end justify-between gap-10 px-10 pb-12 mobile:flex-col mobile:items-start mobile:justify-end mobile:gap-0 mobile:px-5 mobile:pb-2">
                <h1 className="leading-[0.85] tracking-tight uppercase text-5xl mobile:order-2">
                    Lucí
                    <span className="font-lacquer lowercase text-[3.5rem] leading-[0.85]">
                        a
                    </span>
                    <br />
                    Váz
                    <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                        q
                    </span>
                    uez L
                    <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                        e
                    </span>
                    al
                </h1>

                <p className="max-w-xs text-right text-sm font-light text-white/70 mobile:hidden">
                    Desarrollo creativo, comunicación visual y gestión integral
                    de proyectos artísticos.
                </p>
            </div>
        </section>
    );
}
