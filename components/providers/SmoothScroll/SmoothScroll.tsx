"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const SmoothScroll = () => {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;

        // Lenis measures the scrollable height once on init. If that
        // happens before every image has finished loading and settling
        // into its final layout, the wheel (driven by Lenis' own,
        // possibly-stale measurement) can end up capped short of the
        // page's real height — while dragging the native scrollbar,
        // which reflects the actual DOM, still reaches the rest.
        function resize() {
            lenis.resize();
        }

        if (document.readyState === "complete") {
            resize();
        } else {
            window.addEventListener("load", resize);
        }

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            window.removeEventListener("load", resize);
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        // This component lives in the root layout, so the same Lenis
        // instance persists across client-side navigations — it never
        // finds out the route changed. Next.js resets the native scroll
        // position to the top on navigation, but Lenis keeps easing
        // toward whatever target it last had for the *previous* page, so
        // its virtual scroll position (and the height limit it clamps
        // wheel input to) goes stale relative to the page that just
        // mounted. Resyncing it here is what a hard reload does for free
        // by rebuilding Lenis from scratch.
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
    }, [pathname]);

    return null;
};
