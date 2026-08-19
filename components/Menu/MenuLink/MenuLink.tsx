"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { CURTAIN_EASE } from "../constants";

const MotionLink = motion.create(Link);

type MenuLinkProps = {
    href: string;
    label: string;
    index: number;
    onClick?: () => void;
};

export function MenuLink({ href, label, index, onClick }: MenuLinkProps) {
    const [hasEntered, setHasEntered] = useState(false);

    return (
        <MotionLink
            href={href}
            onClick={onClick}
            className="font-archivo block h-[1em] overflow-hidden text-[clamp(2.5rem,7vw,5rem)] leading-none font-stretch-expanded text-white uppercase"
        >
            <motion.span
                className="flex flex-col"
                initial={{ y: "100%" }}
                animate={{
                    y: "0%",
                    transition: {
                        duration: 0.5,
                        delay: hasEntered ? 0 : 0.25 + index * 0.08,
                        ease: CURTAIN_EASE,
                    },
                }}
                exit={{
                    y: "100%",
                    transition: { duration: 0.35, ease: CURTAIN_EASE },
                }}
                whileHover={{
                    y: "-50%",
                    transition: { duration: 0.4, ease: CURTAIN_EASE },
                }}
                onAnimationComplete={() => setHasEntered(true)}
            >
                <span className="block h-[1em] overflow-hidden leading-none">
                    {label}
                </span>
                <span
                    aria-hidden="true"
                    className="block h-[1em] overflow-hidden leading-none"
                >
                    {label}
                </span>
            </motion.span>
        </MotionLink>
    );
}
