"use client";

import { CURTAIN_EASE } from "@/components/Menu/constants";
import { useIsMobile } from "@/lib/useIsMobile";
import {
    AnimatePresence,
    motion,
    useTransform,
    type MotionValue,
} from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "../../constants";

const RISE_DURATION = 0.5;
const LIFT_DURATION = 0.5;
const HOLD_MS = 500;

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
    onNavigate: (href: string, label: string) => void;
};

function FilterLink({ href, label, isActive, onNavigate }: FilterLinkProps) {
    return (
        <Link
            href={href}
            className={filterClassName(isActive)}
            onClick={(event) => {
                event.preventDefault();
                onNavigate(href, label);
            }}
        >
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("categoria");
    const isMobile = useIsMobile();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [pendingLabel, setPendingLabel] = useState("");

    const scrollOpacity = useTransform(
        scrollYProgress,
        [0, 0.02, 0.98, 1],
        [0, 1, 1, 0],
    );
    const pointerEvents = useTransform(scrollOpacity, (value) =>
        value > 0 ? "auto" : "none",
    );

    function handleNavigate(href: string, label: string) {
        if (isTransitioning) return;

        setPendingLabel(label);
        setIsTransitioning(true);

        // Nothing else happens until the curtain has fully covered the
        // screen — only then do we navigate and jump the scroll
        // position, so none of it is ever visible to the user.
        setTimeout(() => {
            router.push(href, { scroll: false });

            const worksEl = document.getElementById("portfolio-work");
            if (worksEl) {
                window.scrollTo(
                    0,
                    worksEl.getBoundingClientRect().top + window.scrollY,
                );
            }

            setTimeout(() => setIsTransitioning(false), HOLD_MS);
        }, RISE_DURATION * 1000);
    }

    return (
        <>
            <motion.div
                style={
                    isMobile
                        ? undefined
                        : { opacity: scrollOpacity, pointerEvents }
                }
                className="fixed bottom-16 left-10 z-100 flex flex-col items-start gap-0 mobile:static mobile:bottom-auto mobile:left-auto mobile:flex-row mobile:flex-wrap mobile:items-center mobile:gap-x-6 mobile:gap-y-2 mobile:px-5 mobile:pb-10"
            >
                <FilterLink
                    href={pathname}
                    label="Todos"
                    isActive={!activeCategory}
                    onNavigate={handleNavigate}
                />

                {CATEGORIES.map((category) => (
                    <FilterLink
                        key={category.slug}
                        href={`${pathname}?categoria=${category.slug}`}
                        label={category.label}
                        isActive={activeCategory === category.slug}
                        onNavigate={handleNavigate}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        key="filter-curtain"
                        className="fixed inset-0 z-200 flex items-center justify-center bg-black text-white"
                        initial={{ y: "100%" }}
                        animate={{
                            y: "0%",
                            transition: {
                                duration: RISE_DURATION,
                                ease: CURTAIN_EASE,
                            },
                        }}
                        exit={{
                            y: "-100%",
                            transition: {
                                duration: LIFT_DURATION,
                                ease: CURTAIN_EASE,
                            },
                        }}
                    >
                        <span className="font-archivo text-2xl tracking-tight uppercase mobile:text-sm">
                            {pendingLabel}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
