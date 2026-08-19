"use client";

import type { Service } from "@/lib/types";
import { motion, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";

type ServiceCardProps = {
    service: Service;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
};

const MIN_SCALE = 0.88;
const HOLD_VH = 35;

export function ServiceCard({
    service,
    index,
    total,
    scrollYProgress,
}: ServiceCardProps) {
    const isDark = index % 2 === 0;

    const start = index / total;
    const end = (index + 1) / total;
    const windowScale = useTransform(
        scrollYProgress,
        [start, end],
        [1, MIN_SCALE],
    );
    const imageScale = useTransform(windowScale, (value) => 1 / value);

    return (
        <>
            <section
                style={{ zIndex: index + 1 }}
                className={`sticky top-0 flex h-dvh w-full items-stretch gap-8 px-10 py-14 mobile:flex-col mobile:gap-3 mobile:px-5 mobile:py-8 ${
                    isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
                <span className="[writing-mode:vertical-rl] self-start rotate-180 text-sm tracking-widest uppercase opacity-60 mobile:order-2 mobile:rotate-0 mobile:[writing-mode:horizontal-tb]">
                    Servicio / {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-1 flex-col justify-between py-4 mobile:order-3 mobile:flex-none mobile:justify-start mobile:gap-2 mobile:py-0">
                    <h2 className="font-archivo max-w-xl text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[0.95] tracking-tight uppercase mobile:text-[1.5rem]">
                        {service.title}
                    </h2>

                    <p
                        className={`max-w-md border-t pt-4 text-base font-light mobile:pt-2 mobile:text-sm ${
                            isDark
                                ? "border-white/20 text-white/70"
                                : "border-black/20 text-black/60"
                        }`}
                    >
                        {service.fullDescription}
                    </p>
                </div>

                <div className="relative h-full w-[42%] shrink-0 mobile:order-1 mobile:h-44 mobile:w-full">
                    <motion.div
                        className="absolute inset-0 overflow-hidden rounded-2xl"
                        style={{ scale: windowScale }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            style={{ scale: imageScale }}
                        >
                            <Image
                                src={service.images[0]}
                                alt={service.title}
                                fill
                                sizes="(min-width: 1024px) 40vw, 90vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <div style={{ height: `${HOLD_VH}dvh` }} aria-hidden="true" />
        </>
    );
}
