type PageHeroProps = {
    title: string;
    description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
    return (
        <section className="relative flex h-[70vh] w-full items-end justify-between gap-10 bg-white px-10 pb-12 text-black mobile:flex-col mobile:items-start mobile:gap-6 mobile:px-5">
            <div
                className="pointer-events-none absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/4"
                style={{
                    WebkitMaskImage: "url('/images/logo.svg')",
                    maskImage: "url('/images/logo.svg')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                }}
            />

            <h1 className="leading-[0.85] tracking-tight uppercase text-5xl">
                {title}
            </h1>

            <p className="max-w-md leading-none text-right text-sm font-light text-black/60 mobile:text-left">
                {description}
            </p>
        </section>
    );
}
