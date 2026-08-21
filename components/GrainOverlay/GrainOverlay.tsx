"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

type GrainOverlayProps = {
    className?: string;
    opacity?: number;
    tileSize?: number;
    frameCount?: number;
    fps?: number;
    blendMode?: CSSProperties["mixBlendMode"];
    mobileOpacity?: number;
    mobileTileSize?: number;
};

export function GrainOverlay({
    className = "",
    opacity = 0.16,
    tileSize = 400,
    frameCount = 6,
    fps = 18,
    blendMode = "difference",
    mobileOpacity,
    mobileTileSize,
}: GrainOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const effectiveOpacity = isMobile && mobileOpacity !== undefined ? mobileOpacity : opacity;
    const effectiveTileSize = isMobile && mobileTileSize !== undefined ? mobileTileSize : tileSize;

    useEffect(() => {
        const node = overlayRef.current;
        if (!node) return;

        const canvas = document.createElement("canvas");
        canvas.width = effectiveTileSize;
        canvas.height = effectiveTileSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frames: string[] = [];
        for (let f = 0; f < frameCount; f++) {
            const imageData = ctx.createImageData(effectiveTileSize, effectiveTileSize);
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
    }, [effectiveTileSize, frameCount, fps]);

    return (
        <div
            ref={overlayRef}
            className={`pointer-events-none absolute inset-0 ${className}`}
            style={{
                backgroundSize: `${effectiveTileSize}px ${effectiveTileSize}px`,
                backgroundRepeat: "repeat",
                opacity: effectiveOpacity,
                mixBlendMode: blendMode,
            }}
        />
    );
}
