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
    accentIndices?: number[];
    onClick?: () => void;
};

function renderAccented(label: string, accentIndices: number[]) {
    return label.split("").map((char, i) =>
        accentIndices.includes(i) ? (
            <span
                key={i}
                className="font-lacquer lowercase text-[1.167em] leading-[0.1]"
            >
                {char}
            </span>
        ) : (
            char
        ),
    );
}

export function MenuLink({
    href,
    label,
    index,
    accentIndices = [],
    onClick,
}: MenuLinkProps) {
    const [hasEntered, setHasEntered] = useState(false);

    return (
        <div className="mobile:flex mobile:w-full mobile:items-center mobile:border-b mobile:border-white/40 mobile:pt-0 mobile:pb-3">
            <MotionLink
                href={href}
                onClick={onClick}
                className="font-archivo block h-[1em] overflow-hidden text-lg leading-none font-stretch-90% text-white uppercase"
            >
                <motion.span
                    className="flex flex-col text-center mobile:text-left"
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
                    <span className="font-black block h-[1em] overflow-hidden leading-none">
                        {renderAccented(label, accentIndices)}
                    </span>
                    <span
                        aria-hidden="true"
                        className="font-instrument-serif block h-[1em] overflow-hidden font-stretch-normal leading-none italic"
                    >
                        {label}
                    </span>
                </motion.span>
            </MotionLink>
        </div>
    );
}
