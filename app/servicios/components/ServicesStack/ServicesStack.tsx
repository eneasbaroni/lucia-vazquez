"use client";

import type { Service } from "@/lib/types";
import { useScroll } from "motion/react";
import { useRef } from "react";
import { ServiceCard } from "../ServiceCard/ServiceCard";

type ServicesStackProps = {
    services: Service[];
};

export function ServicesStack({ services }: ServicesStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

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
