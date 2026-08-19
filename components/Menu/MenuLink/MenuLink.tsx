"use client";

import { motion } from "motion/react";
import { CURTAIN_EASE } from "../constants";

type MenuLinkProps = {
    href: string;
    label: string;
    index: number;
    onClick?: () => void;
};

export function MenuLink({ href, label, index, onClick }: MenuLinkProps) {
    return (
        <motion.a
            href={href}
            onClick={onClick}
            className="font-archivo block h-[1em] overflow-hidden text-[clamp(2.5rem,7vw,5rem)] leading-none font-stretch-expanded text-white uppercase"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, delay: 0.25 + index * 0.06 }}
        >
            <motion.span
                className="flex flex-col"
                initial={{ y: "0%" }}
                whileHover={{ y: "-50%" }}
                transition={{ duration: 0.4, ease: CURTAIN_EASE }}
            >
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
            </motion.span>
        </motion.a>
    );
}
