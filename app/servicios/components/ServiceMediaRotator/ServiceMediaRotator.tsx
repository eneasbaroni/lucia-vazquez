"use client";

import type { ServiceMedia } from "@/lib/types";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

type ServiceMediaRotatorProps = {
    media: ServiceMedia[];
    alt: string;
};

const SLIDE_S = 4.5;
const FADE_S = 0.8;

export function ServiceMediaRotator({ media, alt }: ServiceMediaRotatorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [activeIndex, setActiveIndex] = useState(0);

    const current = media[activeIndex];
    const canRotate = media.length > 1;
    // Only run while the card is on screen — the stacked cards stay
    // mounted, and off-screen ones shouldn't keep swapping (and
    // loading) videos in the background.
    const isRunning = canRotate && isInView;

    function goToNext() {
        setActiveIndex((prev) => (prev + 1) % media.length);
    }

    return (
        <div ref={containerRef} className="absolute inset-0">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_S, ease: "easeInOut" }}
                >
                    {current.type === "video" ? (
                        <video
                            src={current.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <Image
                            src={current.src}
                            alt={`${alt} — ${current.label}`}
                            fill
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="object-cover"
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {canRotate && (
                <div className="pointer-events-none absolute inset-x-4 top-4 flex gap-1.5 mobile:inset-x-2 mobile:top-2 mobile:gap-1">
                    {media.map((item, index) => (
                        <div
                            key={item.src}
                            className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
                        >
                            <motion.div
                                // Re-keyed per slide (and per pause/resume) so the
                                // active segment always refills from empty.
                                key={
                                    index === activeIndex
                                        ? `active-${activeIndex}-${isRunning}`
                                        : `idle-${index}`
                                }
                                className="h-full w-full origin-left bg-white"
                                initial={{
                                    scaleX: index < activeIndex ? 1 : 0,
                                }}
                                animate={{
                                    scaleX:
                                        index < activeIndex ||
                                        (index === activeIndex && isRunning)
                                            ? 1
                                            : 0,
                                }}
                                transition={
                                    index === activeIndex
                                        ? { duration: SLIDE_S, ease: "linear" }
                                        : { duration: 0 }
                                }
                                onAnimationComplete={() => {
                                    // The filled bar is what advances the slide,
                                    // so bar and image can never drift apart.
                                    if (index === activeIndex && isRunning) {
                                        goToNext();
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={current.label + activeIndex}
                    className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 font-archivo text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm font-stretch-80% mobile:bottom-2 mobile:left-2 mobile:text-[0.6rem]"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {current.label}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
