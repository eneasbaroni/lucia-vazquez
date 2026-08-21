"use client";

import { LINKS, CURTAIN_EASE } from "@/components/Menu/constants";
import { pageTransitionState } from "@/lib/pageTransitionState";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HOLD_MS = 1000;
const CURTAIN_DURATION = 0.7;

function getPageName(pathname: string) {
    const match = LINKS.find((link) =>
        link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
    );

    return match?.label ?? "";
}

export function PageTransition() {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [pageName, setPageName] = useState(() => getPageName(pathname));

    // Fires as soon as an internal link is clicked, before Next.js navigates,
    // so the overlay is already in place when the menu curtain retracts.
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const anchor = (event.target as HTMLElement)?.closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href || !href.startsWith("/") || anchor.target === "_blank")
                return;

            const url = new URL(href, window.location.href);
            if (url.pathname === pathname) return;

            setPageName(getPageName(url.pathname));
            setIsTransitioning(true);
            pageTransitionState.isActive = true;
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [pathname]);

    // app/template.tsx dispatches this once the new route has actually
    // mounted (a Next.js-guaranteed remount per navigation, unlike relying
    // on usePathname() here, which updates inconsistently mid-navigation).
    useEffect(() => {
        function handleReady() {
            const timeout = setTimeout(() => {
                pageTransitionState.isActive = false;
                setIsTransitioning(false);
                window.dispatchEvent(new Event("page-transition-lift"));
            }, HOLD_MS);

            return () => clearTimeout(timeout);
        }

        window.addEventListener("page-transition-ready", handleReady);
        return () =>
            window.removeEventListener("page-transition-ready", handleReady);
    }, []);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    key="page-transition"
                    className="fixed inset-0 z-[35] flex items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: {
                            duration: CURTAIN_DURATION,
                            ease: CURTAIN_EASE,
                        },
                    }}
                >
                    <span className="font-archivo text-4xl uppercase tracking-tight">
                        {pageName}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
