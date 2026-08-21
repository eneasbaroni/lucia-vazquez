import { PageHero } from "@/components";
import { AboutMe } from "./components";

export default function SobreMi() {
    return (
        <main className="flex flex-1 flex-col bg-white">
            <PageHero
                title={
                    <>
                        S
                        <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                            o
                        </span>
                        bre m
                        <span className="font-lacquer lowercase text-[3.5rem] leading-[0.1]">
                            í
                        </span>
                    </>
                }
                description="Dirección creativa, comunicación visual y gestión integral de proyectos artísticos, con una trayectoria que comenzó en la pintura realista al óleo."
            />

            <AboutMe />
        </main>
    );
}
