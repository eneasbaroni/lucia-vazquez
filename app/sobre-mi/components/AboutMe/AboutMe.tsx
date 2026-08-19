"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const MAX_ZOOM = 1.15;

export function AboutMe() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const imageScale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [1, MAX_ZOOM, 1],
    );

    return (
        <section
            ref={ref}
            className="flex w-full items-center gap-16 bg-black px-10 py-24 text-white mobile:flex-col mobile:items-start mobile:gap-8 mobile:px-5 mobile:py-16"
        >
            <div className="relative aspect-[3/4] w-full max-w-md shrink-0 overflow-hidden mobile:max-w-full">
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: imageScale }}
                >
                    <Image
                        src="/images/services/service_01.jpg"
                        alt="Lucía Vázquez Leal"
                        fill
                        sizes="(min-width: 768px) 30vw, 90vw"
                        className="object-cover"
                    />
                </motion.div>
            </div>

            <motion.div
                className="flex max-w-2xl flex-col gap-6"
                style={{ opacity: textOpacity }}
            >
                <h2 className="font-archivo text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight uppercase">
                    Hola, soy Lucía
                </h2>

                <p className="text-base font-light text-white/70">
                    Tengo 32 años, nací en la provincia de Córdoba y
                    actualmente vivo en CABA, Buenos Aires. Me dedico al
                    desarrollo creativo, la comunicación visual y la gestión
                    integral de proyectos artísticos, combinando diseño
                    gráfico, ilustración, dirección creativa, producción
                    audiovisual y acompañamiento de artistas en distintas
                    etapas de sus proyectos.
                </p>

                <p className="text-base font-light text-white/70">
                    Mi recorrido comenzó como artista plástica,
                    especializándome en pintura realista al óleo y
                    participando en diversas exposiciones en galerías de
                    arte. Siempre me motivó la expresión de lo intangible a
                    través de la estética visual.
                </p>

                <p className="text-base font-light text-white/70">
                    Con el tiempo, ese universo se expandió hacia nuevas
                    áreas, integrando producción artística, estilismo,
                    investigación visual, contenido audiovisual, comunicación
                    y desarrollo creativo aplicado a proyectos y acompañando
                    a artistas.
                </p>

                <p className="text-base font-light text-white/70">
                    Disfruto crear, investigar y construir ideas que
                    conecten identidad, estética y experiencia.
                </p>
            </motion.div>
        </section>
    );
}
