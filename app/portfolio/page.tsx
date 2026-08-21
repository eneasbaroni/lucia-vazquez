import { PageHero } from "@/components";
import portfolio from "@/data/portfolio.json";
import { PortfolioFilters, PortfolioList } from "./components";

type PortfolioProps = {
    searchParams: Promise<{ categoria?: string }>;
};

export default async function Portfolio({ searchParams }: PortfolioProps) {
    const { categoria } = await searchParams;

    const filteredPortfolio = categoria
        ? portfolio.filter((project) => project.category === categoria)
        : portfolio;

    return (
        <main className="flex flex-1 flex-col bg-white">
            <PageHero
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

            <PortfolioFilters />

            <PortfolioList projects={filteredPortfolio} />
        </main>
    );
}
