import type { PortfolioItem } from "@/lib/types";
import Link from "next/link";
import { PortfolioMedia } from "../PortfolioMedia/PortfolioMedia";

type PortfolioCardMobileProps = {
    project: PortfolioItem;
};

export function PortfolioCardMobile({ project }: PortfolioCardMobileProps) {
    return (
        <Link
            href={`/portfolio/${project.slug}`}
            className="flex w-full flex-col gap-3 px-5 pb-8"
        >
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <PortfolioMedia project={project} sizes="100vw" />
            </div>

            <div className="flex w-full items-end gap-3  border-black/30 pb-0 text-black">
                <span className="font-archivo text-base font-black tracking-normal uppercase font-stretch-70% border-b-2 pb-0.5 border-black/90">
                    {project.client}
                </span>

                <span className="font-instrument-serif w-full border-b border-black/40 pb-1 text-sm text-black/60">
                    {project.title}
                </span>
            </div>
        </Link>
    );
}
