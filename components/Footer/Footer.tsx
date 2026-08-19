export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="sticky bottom-0 z-0 flex h-dvh w-full flex-col justify-end gap-10 bg-white px-10 py-14 text-black mobile:gap-6 mobile:px-5 mobile:py-10">
            <div className="flex items-end justify-between gap-10 mobile:flex-col mobile:items-start mobile:gap-4">
                <p className="max-w-xs text-base font-light text-black/60 mobile:text-xs">
                    Espero que podamos crear grandes cosas juntos, gracias por
                    ver.
                </p>

                <h2 className="font-archivo text-right text-[clamp(3rem,10vw,9rem)] leading-[0.85] tracking-tight uppercase mobile:text-left">
                    Lucía
                    <br />
                    Vázquez Leal
                </h2>
            </div>

            <div className="grid grid-cols-4 gap-8 border-t border-black/20 pt-8 text-sm mobile:grid-cols-2 mobile:gap-x-5 mobile:gap-y-3 mobile:text-xs">
                <div className="flex flex-col gap-1 mobile:order-1 mobile:gap-0">
                    <span className="font-medium">Basada en</span>
                    <span className="text-black/60">
                        CABA, Buenos Aires, Argentina
                    </span>
                </div>

                <div className="flex flex-col gap-1 mobile:order-3 mobile:col-span-2 mobile:gap-0">
                    <span className="font-medium">Correo</span>
                    <a
                        href="mailto:luciavazquez.art@gmail.com"
                        className="text-black/60 hover:text-black break-words"
                    >
                        luciavazquez.art@gmail.com
                    </a>
                    <span className="mt-2 font-medium mobile:mt-1">
                        Whatsapp
                    </span>
                    <a
                        href="https://wa.me/5493513068019"
                        className="text-black/60 hover:text-black"
                    >
                        +54 9 3513068019
                    </a>
                </div>

                <div className="flex flex-col gap-1 mobile:order-2 mobile:gap-0">
                    <span className="font-medium">Instagram</span>
                    <a
                        href="https://instagram.com/luxciart"
                        className="text-black/60 hover:text-black"
                    >
                        @luxciart
                    </a>
                </div>

                <div className="flex flex-col gap-1 text-right mobile:order-4 mobile:col-span-2 mobile:text-left">
                    <span className="text-black/60">
                        © {year} Lucía Vázquez Leal
                    </span>
                </div>
            </div>
        </footer>
    );
}
