"use client";

import type { Service } from "@/lib/types";
import { useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import Lenis from "lenis";

type ServicesStackProps = {
    services: Service[];
};

export function ServicesStack({ services }: ServicesStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <div ref={containerRef}>
            {services.map((service, index) => (
                <ServiceCard
                    key={service.slug}
                    service={service}
                    index={index}
                    total={services.length}
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </div>
    );
}
