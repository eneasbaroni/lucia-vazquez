import { PageHero } from "@/components";
import { AboutMe } from "./components";

export default function SobreMi() {
    return (
        <main className="flex flex-1 flex-col bg-white">
            <PageHero
                title="Sobre mí"
                description="Dirección creativa, comunicación visual y gestión integral de proyectos artísticos, con una trayectoria que comenzó en la pintura realista al óleo."
            />

            <AboutMe />
        </main>
    );
}
