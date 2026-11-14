"use client";

import { motion } from "motion/react";
import Image from "next/image";

const PHOTOS = [
    { src: "/images/about/about_02.png", alt: "Lucía trabajando en el estudio" },
    { src: "/images/about/about_01.jpg", alt: "Lucía en un set de filmación" },
    { src: "/images/about/about_05.png", alt: "Lucía en el estudio" },
];

export function AboutPhotos() {
    return (
        <div className="grid grid-cols-3 gap-4 px-10 mobile:gap-2 mobile:px-5">
            {PHOTOS.map((photo, index) => (
                <motion.div
                    key={photo.src}
                    className="relative aspect-3/4 overflow-hidden rounded-lg"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: index * 0.12,
                    }}
                >
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 767px) 33vw, 30vw"
                        className="object-cover"
                    />
                </motion.div>
            ))}
        </div>
    );
}
