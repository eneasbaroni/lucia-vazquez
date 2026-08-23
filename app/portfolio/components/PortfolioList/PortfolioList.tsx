"use client";

import type { PortfolioItem } from "@/lib/types";
import { useScroll } from "motion/react";
import { useRef } from "react";
import { PortfolioCard } from "../PortfolioCard/PortfolioCard";
import { PortfolioFilters } from "../PortfolioFilters/PortfolioFilters";

type PortfolioListProps = {
    projects: PortfolioItem[];
};

export function PortfolioList({ projects }: PortfolioListProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef}>
            <PortfolioFilters scrollYProgress={scrollYProgress} />

            {projects.map((project, index) => (
                <PortfolioCard
                    key={project.slug}
                    project={project}
                    index={index}
                    total={projects.length}
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </div>
    );
}
