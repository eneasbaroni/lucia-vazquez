"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
    CURTAIN_DURATION,
    CURTAIN_EASE,
    LINKS,
    STRIPES,
    STRIPES_DELAY,
} from "./constants";
import { MenuLink } from "./MenuLink/MenuLink";

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const iconOffset = isMobile ? 3 : 3.5;

    function toggleMenu() {
        setIsOpen((prev) => !prev);
    }

    return (
        <>
            <button
                type="button"
                onClick={toggleMenu}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
                className="fixed top-6 left-1/2 z-[70] h-2 w-20 -translate-x-1/2 mix-blend-difference cursor-pointer mobile:h-1.75 mobile:w-14"
            >
                <motion.span
                    className="absolute top-0 h-px bg-white"
                    initial={false}
                    animate={
                        isOpen
                            ? {
                                  left: "27.5%",
                                  y: iconOffset,
                                  rotate: 45,
                                  width: "45%",
                              }
                            : { left: "0%", y: 0, rotate: 0, width: "100%" }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                    className="absolute top-1.75 h-px bg-white"
                    initial={false}
                    animate={
                        isOpen
                            ? {
                                  left: "27.5%",
                                  y: -iconOffset,
                                  rotate: -45,
                                  width: "45%",
                              }
                            : { left: "0%", y: 0, rotate: 0, width: "100%" }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-30 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                )}

                {isOpen && (
                    <motion.div
                        key="curtain"
                        className="fixed inset-x-0 top-0 z-40 overflow-hidden bg-black"
                        initial={{ height: 0 }}
                        animate={{ height: "100dvh" }}
                        exit={{ height: 0 }}
                        transition={{
                            duration: CURTAIN_DURATION,
                            ease: CURTAIN_EASE,
                        }}
                    >
                        <div
                            className="pointer-events-none absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/[0.08]"
                            style={{
                                WebkitMaskImage: "url('/images/logo.svg')",
                                maskImage: "url('/images/logo.svg')",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                                maskPosition: "center",
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                            }}
                        />

                        <nav className="flex h-dvh w-full flex-col items-center font-stretch-expanded justify-center gap-4 px-10 mobile:px-5">
                            {LINKS.map((link, index) => (
                                <MenuLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    index={index}
                                    onClick={() => setIsOpen(false)}
                                />
                            ))}
                        </nav>
                    </motion.div>
                )}

                {isOpen && (
                    <motion.div
                        key="stripes"
                        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col"
                        initial={{ top: 0 }}
                        animate={{ top: "100dvh" }}
                        exit={{ top: 0 }}
                        transition={{
                            duration: CURTAIN_DURATION,
                            ease: CURTAIN_EASE,
                        }}
                    >
                        {STRIPES.map((stripe, index) => (
                            <motion.div
                                key={index}
                                className={`w-full ${stripe.color}`}
                                initial={{ height: 0 }}
                                animate={{
                                    height: ["0dvh", stripe.peakHeight, "0dvh"],
                                    transition: {
                                        duration: stripe.duration,
                                        times: [0, 0.5, 1],
                                        ease: "easeInOut",
                                        delay: STRIPES_DELAY,
                                    },
                                }}
                                exit={{
                                    height: ["0dvh", stripe.peakHeight, "0dvh"],
                                    transition: {
                                        duration: stripe.exitDuration,
                                        times: [0, 0.5, 1],
                                        ease: "easeInOut",
                                        delay: 0,
                                    },
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
