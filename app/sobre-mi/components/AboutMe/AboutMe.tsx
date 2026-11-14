import { AboutPhotos } from "../AboutPhotos/AboutPhotos";
import { AboutIntro } from "../AboutIntro/AboutIntro";

export function AboutMe() {
    return (
        <section className="flex w-full flex-col gap-16 bg-black py-24 text-white mobile:gap-10 mobile:py-16">
            <AboutIntro />
            <AboutPhotos />
        </section>
    );
}
