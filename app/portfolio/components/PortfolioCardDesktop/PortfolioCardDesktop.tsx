"use client";

import type { PortfolioItem } from "@/lib/types";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PortfolioCardDesktopProps = {
    project: PortfolioItem;
};

const HOVER_INTERVAL_MS = 900;
const MIN_WIDTH_VW = 38;
const MAX_WIDTH_VW = 50;

export function PortfolioCardDesktop({ project }: PortfolioCardDesktopProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const backWidthVw = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [MIN_WIDTH_VW, MAX_WIDTH_VW, MIN_WIDTH_VW],
    );
    const backWidth = useTransform(backWidthVw, (value) => `${value}vw`);

    const grayscaleAmount = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [1, 0, 1],
    );
    const filter = useTransform(
        grayscaleAmount,
        (value) => `grayscale(${value})`,
    );

    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

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
        <Link
            ref={ref}
            href={`/portfolio/${project.slug}`}
            className="hidden w-full items-center gap-10 border-b border-white/10 bg-black pr-10 text-white md:flex"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative aspect-[4/3] shrink-0 overflow-hidden"
                style={{ width: backWidth, filter }}
            >
                <Image
                    src={project.images[imageIndex]}
                    alt={project.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                />
            </motion.div>

            <motion.div
                className="flex flex-1 flex-col gap-4"
                style={{ opacity: textOpacity }}
            >
                <h3 className="font-archivo w-[40dvw] text-[clamp(1.75rem,4vw,3rem)] leading-none uppercase tracking-tight">
                    {project.title}
                </h3>

                <span className="text-xs font-light tracking-widest text-white/50 uppercase">
                    Ver proyecto
                </span>

                <span className="text-sm tracking-widest text-white/60 uppercase">
                    {project.client}
                </span>
            </motion.div>
        </Link>
    );
}
