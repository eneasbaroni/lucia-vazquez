"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HalftoneImageProps = {
    src: string;
    alt: string;
    priority?: boolean;
    sizes?: string;
    className?: string;
    imageClassName?: string;
    align?: "top" | "center" | "bottom";
    cellSize?: number;
    dotColor?: string;
    maxOpacity?: number;
};

export function HalftoneImage({
    src,
    alt,
    priority,
    sizes = "100vw",
    className = "",
    imageClassName = "",
    align = "center",
    cellSize = 4,
    dotColor = "0,0,0",
    maxOpacity = 0.45,
}: HalftoneImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let cancelled = false;
        let resizeObserver: ResizeObserver | undefined;

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        function draw() {
            if (cancelled || !container || !canvas) return;

            const width = container.clientWidth;
            const height = container.clientHeight;
            if (!width || !height) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / cellSize);
            const rows = Math.ceil(height / cellSize);

            const sampleCanvas = document.createElement("canvas");
            sampleCanvas.width = cols;
            sampleCanvas.height = rows;
            const sampleCtx = sampleCanvas.getContext("2d", {
                willReadFrequently: true,
            });
            if (!sampleCtx) return;

            // Replicate object-cover cropping so the sampled grid lines up
            // with what the visible <Image> actually shows.
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const boxRatio = cols / rows;
            let drawWidth: number;
            let drawHeight: number;
            let offsetX: number;
            let offsetY: number;

            if (imgRatio > boxRatio) {
                drawHeight = rows;
                drawWidth = rows * imgRatio;
                offsetX = (cols - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = cols;
                drawHeight = cols / imgRatio;
                offsetX = 0;
                offsetY =
                    align === "top"
                        ? 0
                        : align === "bottom"
                          ? rows - drawHeight
                          : (rows - drawHeight) / 2;
            }

            sampleCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            const { data } = sampleCtx.getImageData(0, 0, cols, rows);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const i = (row * cols + col) * 4;
                    const luminance =
                        (0.299 * data[i] +
                            0.587 * data[i + 1] +
                            0.114 * data[i + 2]) /
                        255;
                    const darkness = Math.pow(1 - luminance, 2.4);
                    const radius = Math.min(
                        (cellSize / 2) * darkness,
                        (cellSize / 2) * 0.75,
                    );

                    if (radius < 0.35) continue;

                    ctx.beginPath();
                    ctx.arc(
                        col * cellSize + cellSize / 2,
                        row * cellSize + cellSize / 2,
                        radius,
                        0,
                        Math.PI * 2,
                    );
                    ctx.fillStyle = `rgba(${dotColor}, ${maxOpacity})`;
                    ctx.fill();
                }
            }
        }

        img.onload = () => {
            draw();
            resizeObserver = new ResizeObserver(() => draw());
            resizeObserver.observe(container);
        };

        return () => {
            cancelled = true;
            resizeObserver?.disconnect();
        };
    }, [src, cellSize, dotColor, maxOpacity, align]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes}
                className={`object-cover ${imageClassName}`}
            />

            <canvas
                ref={canvasRef}
                className="pointer-events-none backdrop-blur-[2px] absolute inset-0 h-full w-full"
            />
        </div>
    );
}
