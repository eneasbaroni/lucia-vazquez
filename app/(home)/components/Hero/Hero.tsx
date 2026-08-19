import Image from "next/image";

export function Hero() {
    return (
        <section className="flex h-dvh w-full flex-col bg-white text-black">
            <div className="relative flex h-1/2 w-full items-end px-10 pb-12 mobile:px-5">
                <h1 className="w-full leading-[0.85] tracking-tight uppercase text-[clamp(1.5rem,10vw,9rem)]">
                    Lucía
                    <br />
                    Vázquez Leal
                </h1>

                <div className="absolute top-20 right-10 flex flex-col items-end gap-1 text-right text-sm font-light tracking-widest uppercase text-black/60 mobile:top-16 mobile:right-5">
                    <span>Telling stories</span>
                    <span>Through creative design</span>
                </div>
            </div>

            <div className="relative h-1/2 w-full overflow-hidden">
                <Image
                    src="/images/hero/Hero-imgB.png"
                    alt="Lucía Vázquez Leal"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                />
            </div>
        </section>
    );
}
