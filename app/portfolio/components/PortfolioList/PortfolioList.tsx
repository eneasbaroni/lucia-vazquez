"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import type { PortfolioItem } from "@/lib/types";
import { useScroll } from "motion/react";
import { useRef } from "react";
import { PortfolioCard } from "../PortfolioCard/PortfolioCard";
import { PortfolioCardMobile } from "../PortfolioCardMobile/PortfolioCardMobile";
import { PortfolioFilters } from "../PortfolioFilters/PortfolioFilters";

type PortfolioListProps = {
    projects: PortfolioItem[];
};

export function PortfolioList({ projects }: PortfolioListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} id="portfolio-work">
            <PortfolioFilters scrollYProgress={scrollYProgress} />

            {isMobile
                ? projects.map((project) => (
                      <PortfolioCardMobile
                          key={project.slug}
                          project={project}
                      />
                  ))
                : projects.map((project, index) => (
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
