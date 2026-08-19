export const LINKS = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Servicios", href: "/servicios" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contacto", href: "/contacto" },
];

export const STRIPES: { color: string; duration: number; exitDuration: number }[] = [
    { color: "bg-lv-blue", duration: 2.2, exitDuration: 1.1 },
    { color: "bg-lv-yellow", duration: 1.6, exitDuration: 0.85 },
    { color: "bg-lv-blue", duration: 1.1, exitDuration: 0.6 },
];

export const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export const CURTAIN_DURATION = 1.3;

export const STRIPES_DELAY = 0.15;
