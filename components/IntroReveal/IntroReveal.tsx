"use client";

import { pageTransitionState } from "@/lib/pageTransitionState";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const SMALL_SIZE = "10vmax";
const FULL_SIZE = "260vmax";
const GROW_MS = 1400;
const BLACK_FADE_MS = 900;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
// app/template.tsx slides the page content up (y: 50vh -> 0vh) over
// 0.85s once it's allowed to start. The reveal window sits outside that
// transform, but content seen *through* it is still inside — so the
// zoom can't start until that slide has settled, or you'd see the page
// still translating through the peephole.
const TEMPLATE_SLIDE_MS = 850;
const SETTLE_BUFFER_MS = 150;

function setMaskSize(node: HTMLDivElement, prefix: string, value: string) {
    node.style.setProperty("mask-size", `${prefix}${value}`);
    node.style.setProperty("-webkit-mask-size", `${prefix}${value}`);
}

export function IntroReveal() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    // On a fresh document load (not a menu-driven client navigation),
    // useLayoutEffect still can't run until *after* the browser paints
    // the server-rendered HTML — so if the overlay's initial style
    // starts hidden, that first paint shows the raw, unmasked page for
    // one frame before JS flips it on. Deciding this directly in the
    // render (mirroring how app/template.tsx reads the same flag) lets
    // the very first paint already be correct, with nothing for JS to
    // fix up.
    const startVisible = isHome && !pageTransitionState.isActive;
    const whiteRef = useRef<HTMLDivElement>(null);
    const blackRef = useRef<HTMLDivElement>(null);

    // Rendered as a sibling of {children} in layout.tsx, outside
    // app/template.tsx's translated wrapper — and template.tsx doesn't
    // remount this on navigation the way it remounts page content, so
    // this effect (keyed on pathname) is what replays the reveal every
    // time the user actually lands on "/".
    useLayoutEffect(() => {
        const white = whiteRef.current;
        const black = blackRef.current;
        if (!white || !black) return;

        if (!isHome) {
            white.style.opacity = "0";
            black.style.opacity = "0";
            return;
        }

        let growFrame1 = 0;
        let growFrame2 = 0;
        let growTimer: ReturnType<typeof setTimeout>;

        // Snaps the overlay to fully visible (small, solid) immediately,
        // no transition. This is the "white screen with the logo" state
        // — it should appear the instant it's allowed to, not fade in.
        function show(white: HTMLDivElement, black: HTMLDivElement) {
            white.style.transition = "none";
            black.style.transition = "none";
            white.style.opacity = "1";
            black.style.opacity = "1";
            setMaskSize(white, "100% 100%, ", SMALL_SIZE);
            setMaskSize(black, "", SMALL_SIZE);
        }

        // Starts the zoom-and-fade a bit later, once the content behind
        // the peephole has actually settled into place.
        function grow(white: HTMLDivElement, black: HTMLDivElement) {
            growTimer = setTimeout(() => {
                growFrame1 = requestAnimationFrame(() => {
                    growFrame2 = requestAnimationFrame(() => {
                        black.style.setProperty(
                            "transition",
                            `mask-size ${GROW_MS}ms ${EASE}, -webkit-mask-size ${GROW_MS}ms ${EASE}, opacity ${BLACK_FADE_MS}ms ${EASE}`,
                        );
                        white.style.setProperty(
                            "transition",
                            `mask-size ${GROW_MS}ms ${EASE}, -webkit-mask-size ${GROW_MS}ms ${EASE}, opacity ${GROW_MS}ms ${EASE}`,
                        );

                        setMaskSize(black, "", FULL_SIZE);
                        black.style.opacity = "0";

                        setMaskSize(white, "100% 100%, ", FULL_SIZE);
                        white.style.opacity = "0";
                    });
                });
            }, TEMPLATE_SLIDE_MS + SETTLE_BUFFER_MS);
        }

        if (pageTransitionState.isActive) {
            // Arriving via a menu click: PageTransition's own black
            // curtain (with the page name) is still up. Keep our overlay
            // hidden until that curtain starts lifting. It dispatches
            // "page-transition-lift" at the exact instant it begins its
            // own 0.7s exit (see PageTransition.tsx) — since our overlay
            // sits above the curtain (z-500 vs z-35), showing it right
            // then means it instantly takes over as the curtain retreats,
            // so the page underneath (still mid-slide) is never exposed.
            white.style.opacity = "0";
            black.style.opacity = "0";

            const handleLift = () => {
                window.removeEventListener("page-transition-lift", handleLift);
                show(white, black);
                grow(white, black);
            };
            window.addEventListener("page-transition-lift", handleLift);
            return () => {
                window.removeEventListener("page-transition-lift", handleLift);
                clearTimeout(growTimer);
                cancelAnimationFrame(growFrame1);
                cancelAnimationFrame(growFrame2);
            };
        }

        // Fresh load: no curtain, show the overlay immediately.
        show(white, black);
        grow(white, black);

        return () => {
            clearTimeout(growTimer);
            cancelAnimationFrame(growFrame1);
            cancelAnimationFrame(growFrame2);
        };
    }, [isHome, pathname]);

    return (
        <>
            <div
                ref={whiteRef}
                className="pointer-events-none fixed inset-0 z-500 bg-white"
                style={{
                    opacity: startVisible ? 1 : 0,
                    maskImage:
                        "linear-gradient(#000, #000), url('/images/logo.svg')",
                    WebkitMaskImage:
                        "linear-gradient(#000, #000), url('/images/logo.svg')",
                    maskRepeat: "no-repeat, no-repeat",
                    WebkitMaskRepeat: "no-repeat, no-repeat",
                    maskPosition: "center, center",
                    WebkitMaskPosition: "center, center",
                    maskSize: `100% 100%, ${SMALL_SIZE}`,
                    WebkitMaskSize: `100% 100%, ${SMALL_SIZE}`,
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                }}
            />

            <div
                ref={blackRef}
                className="pointer-events-none fixed inset-0 z-500 bg-black"
                style={{
                    opacity: startVisible ? 1 : 0,
                    maskImage: "url('/images/logo.svg')",
                    WebkitMaskImage: "url('/images/logo.svg')",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: SMALL_SIZE,
                    WebkitMaskSize: SMALL_SIZE,
                }}
            />
        </>
    );
}
