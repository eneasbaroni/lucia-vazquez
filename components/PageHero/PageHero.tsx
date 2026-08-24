import { GrainOverlay } from "@/components";
import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
    image: string;
    title: ReactNode;
    description: string;
};

export function PageHero({ image, title, description }: PageHeroProps) {
    return (
        <section className="relative h-dvh w-full overflow-hidden text-white">
            <Image
                src={image}
                alt=""
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 object-cover"
            />

            <GrainOverlay mobileTileSize={180} mobileOpacity={0.1} />

            <div className="pointer-events-none absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-end justify-between gap-10 px-10 pb-12 mobile:flex-col mobile:items-start mobile:justify-end mobile:gap-0 mobile:px-5 mobile:pb-2">
                <h1 className="leading-[0.85] tracking-tight uppercase text-5xl mobile:order-2">
                    {title}
                </h1>

                <p className="max-w-md leading-none text-right text-sm mobile:text-xs text-white/70 mobile:text-white/80 mobile:absolute mobile:inset-x-5 mobile:top-1/2 mobile:max-w-none mobile:-translate-y-1/2 mobile:text-center font-archivo font-bold font-stretch-70%">
                    {description}
                </p>
            </div>
        </section>
    );
}
