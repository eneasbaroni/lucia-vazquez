import type { PortfolioItem } from "@/lib/types";
import Image from "next/image";

type PortfolioMediaProps = {
    project: PortfolioItem;
    sizes: string;
};

export function PortfolioMedia({ project, sizes }: PortfolioMediaProps) {
    if (project.media === "video" && project.videos?.[0]) {
        return (
            <video
                src={project.videos[0]}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            />
        );
    }

    return (
        <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes={sizes}
            className="object-cover"
        />
    );
}
