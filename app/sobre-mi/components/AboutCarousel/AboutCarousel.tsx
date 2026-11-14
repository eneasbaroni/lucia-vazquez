"use client";

import { motion } from "motion/react";
import Image from "next/image";

const CAROUSEL_IMAGES = [
    {
        src: "/images/about/about_02.png",
        alt: "Lucía trabajando en el estudio",
        width: 1080,
        height: 1440,
    },
    {
        src: "/images/about/about_01.jpg",
        alt: "Lucía en un set de filmación",
        width: 3712,
        height: 5568,
    },
    {
        src: "/images/about/about_05.png",
        alt: "Lucía en el estudio",
        width: 1086,
        height: 1448,
    },
    {
        src: "/images/about/about_03.jpg",
        alt: "Set de filmación",
        width: 1612,
        height: 1080,
    },
];

// With only a few photos, one set can be narrower than a wide screen,
// which would leave a gap before the loop restarts. Rendering the set
// four times and moving by half (= two full sets) keeps the strip
// always wider than the viewport while still looping seamlessly.
const SET_REPEATS = 4;
const MARQUEE_DURATION = 45;

export function AboutCarousel() {
    const images = Array.from(
        { length: SET_REPEATS },
        () => CAROUSEL_IMAGES,
    ).flat();

    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex w-max gap-4 pr-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: MARQUEE_DURATION,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {images.map((image, index) => (
                    <Image
                        key={`${image.src}-${index}`}
                        src={image.src}
                        // Only the first set is announced; the repeats are decorative.
                        alt={index < CAROUSEL_IMAGES.length ? image.alt : ""}
                        width={image.width}
                        height={image.height}
                        sizes="(max-width: 767px) 400px, 600px"
                        className="h-[420px] w-auto shrink-0 rounded-lg mobile:h-[260px]"
                    />
                ))}
            </motion.div>
        </div>
    );
}
