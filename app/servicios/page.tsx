import { PageHero } from "@/components";
import services from "@/data/services.json";
import { ServicesStack } from "./components";

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
                description="Dirección creativa, diseño gráfico, producción audiovisual y producción integral de eventos, a medida de cada proyecto."
            />

            <ServicesStack services={services} />
        </main>
    );
}
