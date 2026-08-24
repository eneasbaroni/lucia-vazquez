import { PageHero } from "@/components";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioItem } from "@/lib/types";
import type { Metadata } from "next";
import { PortfolioList } from "./components";

const portfolio = portfolioData as PortfolioItem[];

export const metadata: Metadata = {
    title: "Portfolio",
    description:
        "Dirección creativa, producción audiovisual y producción integral de eventos, junto a artistas y proyectos como Q'Lokura, Serú Girán, Soui Uno y Caballeros de la Quema.",
};

type PortfolioProps = {
    searchParams: Promise<{ categoria?: string }>;
};

export default async function Portfolio({ searchParams }: PortfolioProps) {
    const { categoria } = await searchParams;

    const filteredPortfolio = categoria
        ? portfolio.filter((project) => project.category === categoria)
        : portfolio;

    return (
        <main className="flex flex-1 flex-col bg-lv-cream">
            <PageHero
                image="/images/portfolioB.jpg"
                title={
                    <>
                        P
                        <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                            o
                        </span>
                        rtf
                        <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                            o
                        </span>
                        lio
                    </>
                }
                description="Dirección creativa, producción audiovisual y producción integral de eventos, junto a artistas y proyectos como Q'Lokura, Serú Girán, Soui Uno y Caballeros de la Quema."
            />

            <PortfolioList projects={filteredPortfolio} />
        </main>
    );
}
