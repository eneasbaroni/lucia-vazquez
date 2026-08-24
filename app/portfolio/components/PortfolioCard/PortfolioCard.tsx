"use client";

import type { PortfolioItem } from "@/lib/types";
import { motion, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { PortfolioMedia } from "../PortfolioMedia/PortfolioMedia";

type PortfolioCardProps = {
    project: PortfolioItem;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
};

const MIN_SCALE = 0.88;
const MIN_CARD_SCALE = 0.97;
const SECTION_VH = 100;
const HOLD_VH = 35;
const CARD_UNIT_VH = SECTION_VH + HOLD_VH;

export function PortfolioCard({
    project,
    index,
    total,
    scrollYProgress,
}: PortfolioCardProps) {
    // scrollYProgress reaches 1 when the container's end meets the
    // viewport's end (offset "end end"), i.e. after scrolling only
    // (total * CARD_UNIT_VH - SECTION_VH) worth of height — one
    // viewport short of the container's full height. So progress is
    // NOT proportional to index/total; it has to be derived from the
    // actual scrollable distance.
    //
    // All sections share the same scroll container, so a card doesn't
    // "unstick" on its own — it stays pinned (already shrunk, already
    // faded) until the next card's section reaches the top and covers
    // it with a higher z-index. That happens a full CARD_UNIT_VH later,
    // not just SECTION_VH later.
    const scrollableVh = total * CARD_UNIT_VH - SECTION_VH;
    const start = (index * CARD_UNIT_VH) / scrollableVh;
    // The last card has no next section to cover it, so its raw
    // cover point falls past 1 — clamp it, since scrollYProgress
    // (and the offsets Framer Motion feeds to the WAAPI) never go
    // beyond [0, 1].
    const coverPoint = Math.min(
        1,
        ((index + 1) * CARD_UNIT_VH) / scrollableVh,
    );

    const imageScale = useTransform(
        scrollYProgress,
        [start, coverPoint],
        [1, MIN_SCALE],
    );
    const cardScale = useTransform(
        scrollYProgress,
        [start, coverPoint],
        [1, MIN_CARD_SCALE],
    );
    return (
        <>
            <section
                style={{ zIndex: index + 1 }}
                className="sticky top-0 h-dvh w-full bg-linear-to-b from-transparent from-50% to-lv-cream to-50% text-black"
            >
                <Link
                    href={`/portfolio/${project.slug}`}
                    className="flex h-full w-full flex-col items-start justify-center gap-6 px-10 py-14 pl-[29%]"
                >
                    <motion.div
                        className="flex w-full origin-center items-center justify-center overflow-hidden rounded-xl bg-white p-10 will-change-transform"
                        style={{ scale: cardScale }}
                    >
                        <motion.div
                            className="relative aspect-[16/9] w-full origin-center will-change-transform"
                            style={{ scale: imageScale }}
                        >
                            <PortfolioMedia project={project} sizes="100vw" />
                        </motion.div>
                    </motion.div>

                    <div className="flex w-full items-center gap-4 border-b border-black/30">
                        <span className="font-archivo pb-1 text-sm font-black tracking-normal uppercase font-stretch-80%">
                            {project.client}
                        </span>

                        <span className="font-instrument-serif pb-1 text-base text-black/70">
                            {project.title}
                        </span>
                    </div>
                </Link>
            </section>

            <div style={{ height: `${HOLD_VH}dvh` }} aria-hidden="true" />
        </>
    );
}
