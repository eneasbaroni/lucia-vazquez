import type { PortfolioItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type PortfolioCardMobileProps = {
    project: PortfolioItem;
};

export function PortfolioCardMobile({ project }: PortfolioCardMobileProps) {
    return (
        <Link
            href={`/portfolio/${project.slug}`}
            className="flex w-full flex-col gap-3 px-5 pb-8"
        >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex w-full items-center gap-3 border-b border-black/30 pb-2 text-black">
                <span className="font-archivo text-xs font-black tracking-normal uppercase font-stretch-80%">
                    {project.client}
                </span>

                <span className="font-instrument-serif text-sm text-black/70">
                    {project.title}
                </span>
            </div>
        </Link>
    );
}
