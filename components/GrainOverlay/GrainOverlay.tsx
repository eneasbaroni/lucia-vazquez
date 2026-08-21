"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type GrainOverlayProps = {
    className?: string;
    opacity?: number;
    tileSize?: number;
    frameCount?: number;
    fps?: number;
    blendMode?: CSSProperties["mixBlendMode"];
};

export function GrainOverlay({
    className = "",
    opacity = 0.16,
    tileSize = 400,
    frameCount = 6,
    fps = 18,
    blendMode = "difference",
}: GrainOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = overlayRef.current;
        if (!node) return;

        const canvas = document.createElement("canvas");
        canvas.width = tileSize;
        canvas.height = tileSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frames: string[] = [];
        for (let f = 0; f < frameCount; f++) {
            const imageData = ctx.createImageData(tileSize, tileSize);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const value = Math.random() > 0.5 ? 255 : 0;
                imageData.data[i] = value;
                imageData.data[i + 1] = value;
                imageData.data[i + 2] = value;
                imageData.data[i + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
            frames.push(canvas.toDataURL());
        }

        let index = 0;
        node.style.backgroundImage = `url(${frames[index]})`;

        const interval = setInterval(() => {
            index = (index + 1) % frames.length;
            node.style.backgroundImage = `url(${frames[index]})`;
        }, 1000 / fps);

        return () => clearInterval(interval);
    }, [tileSize, frameCount, fps]);

    return (
        <div
            ref={overlayRef}
            className={`pointer-events-none absolute inset-0 ${className}`}
            style={{
                backgroundSize: `${tileSize}px ${tileSize}px`,
                backgroundRepeat: "repeat",
                opacity,
                mixBlendMode: blendMode,
            }}
        />
    );
}
