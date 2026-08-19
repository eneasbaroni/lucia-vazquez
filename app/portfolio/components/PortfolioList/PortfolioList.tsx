"use client";

import type { PortfolioItem } from "@/lib/types";
import Lenis from "lenis";
import { useEffect } from "react";
import { PortfolioCardDesktop } from "../PortfolioCardDesktop/PortfolioCardDesktop";
import { PortfolioCardMobile } from "../PortfolioCardMobile/PortfolioCardMobile";

type PortfolioListProps = {
    projects: PortfolioItem[];
};

export function PortfolioList({ projects }: PortfolioListProps) {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <div className="flex flex-col overflow-x-hidden">
            {projects.map((project) => (
                <div key={project.slug}>
                    <PortfolioCardDesktop project={project} />
                    <PortfolioCardMobile project={project} />
                </div>
            ))}
        </div>
    );
}
