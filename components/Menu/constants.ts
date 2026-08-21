export const LINKS: { label: string; href: string; accentIndices: number[] }[] =
    [
        { label: "Inicio", href: "/", accentIndices: [2, 5] },
        { label: "Sobre mí", href: "/sobre-mi", accentIndices: [1, 7] },
        { label: "Servicios", href: "/servicios", accentIndices: [1, 7] },
        { label: "Portfolio", href: "/portfolio", accentIndices: [1, 4] },
        { label: "Contacto", href: "/contacto", accentIndices: [2, 7] },
    ];

export const STRIPES: {
    color: string;
    duration: number;
    exitDuration: number;
    peakHeight: string;
}[] = [
    {
        color: "bg-lv-blue",
        duration: 2.2,
        exitDuration: 1.1,
        peakHeight: "3.4dvh",
    },
    {
        color: "bg-lv-yellow",
        duration: 1.6,
        exitDuration: 0.85,
        peakHeight: "1.7dvh",
    },
    {
        color: "bg-lv-blue",
        duration: 1.1,
        exitDuration: 0.6,
        peakHeight: "3.4dvh",
    },
];

export const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export const CURTAIN_DURATION = 1.3;

export const STRIPES_DELAY = 0.15;
