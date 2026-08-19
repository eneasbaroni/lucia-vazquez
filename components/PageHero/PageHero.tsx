type PageHeroProps = {
    title: string;
    description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
    return (
        <section className="w-full bg-white text-black">
            <div className="flex w-full flex-col gap-4 px-10 pt-[28vh] pb-16 mobile:px-5 mobile:pt-40">
                <h1 className="font-archivo leading-[0.9] tracking-tight uppercase text-[clamp(2.5rem,8vw,7rem)]">
                    {title}
                </h1>

                <p className="max-w-md text-base font-light text-black/60">
                    {description}
                </p>
            </div>
        </section>
    );
}
