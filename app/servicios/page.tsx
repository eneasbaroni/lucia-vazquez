import { PageHero } from "@/components";
import services from "@/data/services.json";
import { ServicesStack } from "./components";

export default function Servicios() {
    return (
        <main className="flex flex-1 flex-col bg-white">
            <PageHero
                title="Servicios"
                description="Dirección creativa, diseño gráfico, producción audiovisual y producción integral de eventos, a medida de cada proyecto."
            />

            <ServicesStack services={services} />
        </main>
    );
}
