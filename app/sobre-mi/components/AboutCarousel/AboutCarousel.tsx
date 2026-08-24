"use client";

import { motion } from "motion/react";
import Image from "next/image";

const CAROUSEL_IMAGES = [
    { src: "/images/about/about_01.jpg", width: 3712, height: 5568 },
    { src: "/images/about/about_02.png", width: 1080, height: 1440 },
    { src: "/images/about/about_03.jpg", width: 1612, height: 1080 },
    { src: "/images/about/about_04.jpg", width: 1179, height: 2096 },
    { src: "/images/about/about_05.png", width: 1086, height: 1448 },
    { src: "/images/about/about_06.png", width: 1094, height: 1438 },
];

const MARQUEE_DURATION = 45;

export function AboutCarousel() {
    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex w-max gap-4 px-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: MARQUEE_DURATION,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map(
                    (image, index) => (
                        <Image
                            key={`${image.src}-${index}`}
                            src={image.src}
                            alt=""
                            width={image.width}
                            height={image.height}
                            sizes="(max-width: 767px) 400px, 600px"
                            className="h-[420px] w-auto shrink-0 rounded-lg mobile:h-[260px]"
                        />
                    ),
                )}
            </motion.div>
        </div>
    );
}
