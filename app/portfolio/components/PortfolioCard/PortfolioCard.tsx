"use client";

import type { PortfolioItem } from "@/lib/types";
import { motion, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PortfolioCardProps = {
    project: PortfolioItem;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
};

const MIN_SCALE = 0.88;
const HOLD_VH = 35;
const HOVER_INTERVAL_MS = 900;

export function PortfolioCard({
    project,
    index,
    total,
    scrollYProgress,
}: PortfolioCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const start = index / total;
    const end = (index + 1) / total;
    const windowScale = useTransform(
        scrollYProgress,
        [start, end],
        [1, MIN_SCALE],
    );
    const imageScale = useTransform(windowScale, (value) => 1 / value);

    useEffect(() => {
        if (!isHovered || project.images.length < 2) return;

        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % project.images.length);
        }, HOVER_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [isHovered, project.images.length]);

    function handleMouseLeave() {
        setIsHovered(false);
        setImageIndex(0);
    }

    return (
        <>
            <section
                style={{ zIndex: index + 1 }}
                className="sticky top-0 h-dvh w-full bg-black text-white"
            >
                <Link
                    href={`/portfolio/${project.slug}`}
                    className="relative flex h-full w-full items-end gap-10 overflow-hidden px-10 py-14 mobile:px-5 mobile:py-8"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{ scale: windowScale }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            style={{ scale: imageScale }}
                        >
                            <Image
                                src={project.images[imageIndex]}
                                alt={project.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="pointer-events-none absolute inset-0 bg-black/40" />
                    </motion.div>

                    <div className="relative flex flex-1 flex-col gap-4">
                        <h3 className="font-archivo w-[40dvw] text-[clamp(1.75rem,4vw,3rem)] leading-none uppercase tracking-tight mobile:w-full">
                            {project.title}
                        </h3>

                        <span className="text-xs font-light tracking-widest text-white/50 uppercase">
                            Ver proyecto
                        </span>

                        <span className="text-sm tracking-widest text-white/60 uppercase">
                            {project.client}
                        </span>
                    </div>
                </Link>
            </section>

            <div style={{ height: `${HOLD_VH}dvh` }} aria-hidden="true" />
        </>
    );
}
