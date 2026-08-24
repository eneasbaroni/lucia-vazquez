"use client";

import { motion } from "motion/react";

export function AboutIntro() {
    return (
        <motion.div
            className="flex flex-col gap-8 px-10 mobile:gap-6 mobile:px-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="font-archivo text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight uppercase">
                H
                <span className="font-lacquer lowercase text-[1.167em] leading-[0.1]">
                    o
                </span>
                la, soy Lucí
                <span className="font-lacquer lowercase text-[1.167em] leading-[0.1]">
                    a
                </span>
            </h2>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 mobile:grid-cols-1">
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
            </div>
        </motion.div>
    );
}
