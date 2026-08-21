"use client";

import { pageTransitionState } from "@/lib/pageTransitionState";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: ReactNode }) {
    const [canReveal, setCanReveal] = useState(
        () => !pageTransitionState.isActive,
    );

    useEffect(() => {
        window.dispatchEvent(new Event("page-transition-ready"));

        if (canReveal) return;

        function handleLift() {
            setCanReveal(true);
        }

        window.addEventListener("page-transition-lift", handleLift);
        return () =>
            window.removeEventListener("page-transition-lift", handleLift);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            className="relative z-10 min-h-dvh"
            initial={{ y: "50vh" }}
            animate={{ y: canReveal ? "0vh" : "50vh" }}
            transition={{ duration: 0.7, ease: CURTAIN_EASE, delay: 0.15 }}
        >
            <div className="absolute inset-x-0 -top-[150vh] h-[150vh] bg-white" />
            {children}
        </motion.div>
    );
}
