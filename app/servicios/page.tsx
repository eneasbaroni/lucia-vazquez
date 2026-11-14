import { PageHero } from "@/components";
import servicesData from "@/data/services.json";
import type { Service } from "@/lib/types";
import type { Metadata } from "next";
import { ServicesStack } from "./components";

const services = servicesData as Service[];

export const metadata: Metadata = {
    title: "Servicios",
    description:
        "Diseño gráfico, dirección creativa, producción integral, edición audiovisual, coordinación y hospitality para artistas, a medida de cada proyecto.",
};

export default function Servicios() {
    return (
        <main className="flex flex-1 flex-col bg-white">
            <PageHero
                image="/images/services.jpg"
                title={
                    <>
                        S
                        <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                            e
                        </span>
                        rvici
                        <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                            o
                        </span>
                        s
                    </>
                }
                description="Diseño gráfico, dirección creativa, producción integral, edición audiovisual, coordinación y hospitality para artistas, a medida de cada proyecto."
            />

            <ServicesStack services={services} />
        </main>
    );
}
