"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import { motion, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "../../constants";

type PortfolioFiltersProps = {
    scrollYProgress: MotionValue<number>;
};

function filterClassName(isActive: boolean) {
    return `font-archivo font-semibold block h-[1em] overflow-hidden text-lg tracking-normal transition-all font-stretch-80%  ${
        isActive ? "text-black/30" : "text-black"
    }`;
}

type FilterLinkProps = {
    href: string;
    label: string;
    isActive: boolean;
};

function FilterLink({ href, label, isActive }: FilterLinkProps) {
    return (
        <Link href={href} className={filterClassName(isActive)}>
            <motion.span
                className="flex flex-col"
                whileHover={{
                    y: "-50%",
                    transition: { duration: 0.3, ease: "easeInOut" },
                }}
            >
                <span className="block h-[1em] overflow-hidden leading-none">
                    {label}
                </span>
                <span className="block h-[1em] overflow-hidden leading-none">
                    {label}
                </span>
            </motion.span>
        </Link>
    );
}

export function PortfolioFilters({ scrollYProgress }: PortfolioFiltersProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("categoria");
    const isMobile = useIsMobile();

    const scrollOpacity = useTransform(
        scrollYProgress,
        [0, 0.02, 0.98, 1],
        [0, 1, 1, 0],
    );
    const pointerEvents = useTransform(scrollOpacity, (value) =>
        value > 0 ? "auto" : "none",
    );

    return (
        <motion.div
            style={
                isMobile ? undefined : { opacity: scrollOpacity, pointerEvents }
            }
            className="fixed bottom-16 left-10 z-100 flex flex-col items-start gap-0 mobile:static mobile:bottom-auto mobile:left-auto mobile:flex-row mobile:flex-wrap mobile:items-center mobile:gap-x-6 mobile:gap-y-2 mobile:px-5 mobile:pb-10"
        >
            <FilterLink
                href={pathname}
                label="Todos"
                isActive={!activeCategory}
            />

            {CATEGORIES.map((category) => (
                <FilterLink
                    key={category.slug}
                    href={`${pathname}?categoria=${category.slug}`}
                    label={category.label}
                    isActive={activeCategory === category.slug}
                />
            ))}
        </motion.div>
    );
}
