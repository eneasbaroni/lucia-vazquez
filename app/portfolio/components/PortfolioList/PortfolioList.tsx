import type { PortfolioItem } from "@/lib/types";
import { PortfolioCardDesktop } from "../PortfolioCardDesktop/PortfolioCardDesktop";
import { PortfolioCardMobile } from "../PortfolioCardMobile/PortfolioCardMobile";

type PortfolioListProps = {
    projects: PortfolioItem[];
};

export function PortfolioList({ projects }: PortfolioListProps) {
    return (
        <div className="flex flex-col overflow-x-hidden">
            {projects.map((project) => (
                <div key={project.slug}>
                    <PortfolioCardDesktop project={project} />
                    <PortfolioCardMobile project={project} />
                </div>
            ))}
        </div>
    );
}
