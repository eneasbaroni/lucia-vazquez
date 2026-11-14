"use client";

import { AccentedText } from "@/components";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { AREAS } from "../../constants";

const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export function WhatIDo() {
    return (
        <div className="relative bg-black">
            <section className="sticky top-0 flex min-h-dvh w-full flex-col justify-center gap-16 bg-black px-10 py-24 text-white mobile:static mobile:gap-10 mobile:px-5 mobile:py-16">
                <motion.div
                    className="grid grid-cols-2 items-end gap-12 mobile:grid-cols-1 mobile:gap-6"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="font-archivo text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight uppercase">
                        <AccentedText
                            text="Lo que hago"
                            accentIndices={[1, 8]}
                        />
                    </h2>

                    <p className="text-base font-light text-white/70">
                        Mi trabajo se centra en el desarrollo de proyectos
                        visuales para artistas, marcas y espectáculos,
                        combinando diseño gráfico, identidad visual, dirección
                        de arte, contenido digital y comunicación creativa. Me
                        especializo en construir propuestas visuales que
                        conectan estrategia, estética y narrativa, participando
                        tanto en el proceso creativo como en la ejecución de
                        cada proyecto.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-8 border-t border-white/20 pt-8 mobile:gap-6">
                    <h3 className="font-instrument-serif text-sm font-normal tracking-widest uppercase opacity-60 mobile:text-xs">
                        Áreas de desarrollo
                    </h3>

                    <motion.ul
                        className="grid grid-cols-2 gap-x-12 gap-y-5 mobile:grid-cols-1 mobile:gap-y-4"
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {AREAS.map((area) => (
                            <motion.li
                                key={area}
                                className="flex items-start gap-4 text-base font-light text-white/80 mobile:gap-3 mobile:text-sm"
                                variants={itemVariants}
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-0.5 block h-5 w-3.5 shrink-0 bg-white mask-[url(/images/isotipo.svg)] mask-contain mask-center mask-no-repeat mobile:h-4 mobile:w-3"
                                />
                                {area}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                <Link
                    href="/servicios"
                    className="font-archivo block h-[1em] self-end overflow-hidden text-base font-black tracking-normal text-white [font-stretch:70%] mobile:self-start"
                >
                    <motion.span
                        className="flex flex-col"
                        whileHover={{
                            y: "-50%",
                            transition: { duration: 0.3, ease: "easeInOut" },
                        }}
                    >
                        <span className="block h-[1em] overflow-hidden leading-none">
                            Ver Servicios
                        </span>
                        <span className="block h-[1em] overflow-hidden leading-none">
                            Ver Servicios
                        </span>
                    </motion.span>
                </Link>
            </section>

            {/* Pin length: extra scroll during which the section stays centered
                before moving up. On mobile the content is taller than the
                viewport, so pinning would hide its bottom — skip it there. */}
            <div aria-hidden="true" className="h-[60dvh] mobile:hidden" />
        </div>
    );
}
