"use client";

import { AccentedText } from "@/components";
import type { Service } from "@/lib/types";
import { motion, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { ServiceMediaRotator } from "../ServiceMediaRotator/ServiceMediaRotator";

type ServiceCardProps = {
    service: Service;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
};

const MIN_SCALE = 0.88;
const SECTION_VH = 100;
const HOLD_VH = 35;
const CARD_UNIT_VH = SECTION_VH + HOLD_VH;

export function ServiceCard({
    service,
    index,
    total,
    scrollYProgress,
}: ServiceCardProps) {
    const isDark = index % 2 === 0;

    // Same math as PortfolioCard: scrollYProgress ("start start" →
    // "end end") hits 1 one viewport before the container's end, so it
    // is NOT proportional to index / total. Each card reaches the top
    // of the screen after index * CARD_UNIT_VH of scroll, so that's
    // where its shrink must start — otherwise every card after the
    // first starts shrinking early, and later cards more so.
    const scrollableVh = total * CARD_UNIT_VH - SECTION_VH;
    const start = (index * CARD_UNIT_VH) / scrollableVh;
    // Ends when the next card covers it; the last card has none, so
    // clamp to the end of the scroll range.
    const end = Math.min(1, ((index + 1) * CARD_UNIT_VH) / scrollableVh);
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
                className={`sticky top-0 flex h-dvh w-full items-stretch gap-8 px-10 py-14 mobile:flex-col mobile:gap-3 mobile:px-5 mobile:pt-14 mobile:pb-8 ${
                    isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
                <span className="font-instrument-serif [writing-mode:vertical-rl] self-start rotate-180 pb-6 text-sm mobile:text-xs tracking-widest uppercase opacity-60 mobile:order-2 mobile:rotate-0 mobile:pb-0 mobile:[writing-mode:horizontal-tb]">
                    Servicio / {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-1 flex-col justify-between py-4 mobile:order-3 mobile:justify-start mobile:gap-2 mobile:py-0">
                    <h2 className="font-archivo ![font-stretch:80%] max-w-xl text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[0.95] tracking-tight uppercase mobile:text-[1.5rem]">
                        <AccentedText
                            text={service.title}
                            accentIndices={service.accentIndices}
                        />
                    </h2>

                    <div className="flex flex-col mobile:mt-4 gap-4 mobile:flex-1">
                        <Link
                            href={`/portfolio?categoria=${service.slug}`}
                            className={`font-archivo block h-[1em] overflow-hidden text-base font-black [font-stretch:70%] tracking-0 ${
                                isDark ? "text-white" : "text-black"
                            }`}
                        >
                            <motion.span
                                className="flex flex-col "
                                whileHover={{
                                    y: "-50%",
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    },
                                }}
                            >
                                <span className="block h-[1em] overflow-hidden leading-none">
                                    Ver Portfolio
                                </span>
                                <span className="block h-[1em] overflow-hidden leading-none">
                                    Ver Portfolio
                                </span>
                            </motion.span>
                        </Link>

                        <div
                            className={`border-t ${
                                isDark ? "border-white/20" : "border-black/20"
                            }`}
                        />

                        <p
                            className={`max-w-md self-end text-right text-sm font-light mobile:font-archivo mobile:font-bold mobile:mt-auto mobile:self-start mobile:text-left ${
                                isDark
                                    ? "text-white/70 mobile:text-white"
                                    : "text-black/60 mobile:text-black"
                            }`}
                        >
                            {service.fullDescription}
                        </p>
                    </div>
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
                            <ServiceMediaRotator
                                media={service.media}
                                alt={service.title}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <div style={{ height: `${HOLD_VH}dvh` }} aria-hidden="true" />
        </>
    );
}
