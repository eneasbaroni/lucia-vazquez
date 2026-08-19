"use client";

import type { PortfolioItem } from "@/lib/types";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PortfolioCardMobileProps = {
    project: PortfolioItem;
};

const HOVER_INTERVAL_MS = 900;
const MIN_HEIGHT_REM = 14;
const MAX_HEIGHT_REM = 20;

export function PortfolioCardMobile({ project }: PortfolioCardMobileProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [frontIndex, setFrontIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const backHeightRem = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [MIN_HEIGHT_REM, MAX_HEIGHT_REM, MIN_HEIGHT_REM],
    );
    const backHeight = useTransform(backHeightRem, (value) => `${value}rem`);

    useEffect(() => {
        if (!isHovered || project.images.length < 2) return;

        const interval = setInterval(() => {
            setFrontIndex((prev) => (prev + 1) % project.images.length);
        }, HOVER_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [isHovered, project.images.length]);

    function handleMouseLeave() {
        setIsHovered(false);
        setFrontIndex(0);
    }

    return (
        <Link
            ref={ref}
            href={`/portfolio/${project.slug}`}
            className="flex w-full flex-col items-start gap-4 border-b border-white/10 bg-black py-4 text-white md:hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full overflow-hidden"
                style={{ height: backHeight }}
            >
                <Image
                    src={project.images[0]}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover grayscale"
                />

                <div className="absolute top-0 bottom-0 left-6 right-6 m-auto aspect-[4/3] overflow-hidden shadow-xl">
                    <Image
                        src={project.images[frontIndex]}
                        alt={project.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            </motion.div>

            <div className="flex flex-col gap-4 pr-5">
                <h3 className="font-archivo w-full text-[clamp(1.75rem,4vw,3rem)] leading-none uppercase tracking-tight">
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
    );
}
