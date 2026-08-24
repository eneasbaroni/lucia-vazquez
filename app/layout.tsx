import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Lacquer } from "next/font/google";
import {
    Footer,
    IntroReveal,
    Logo,
    Menu,
    PageTransition,
    SmoothScroll,
} from "@/components";
import "./globals.css";

const archivo = Archivo({
    subsets: ["latin"],
    variable: "--font-archivo",
    axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    variable: "--font-instrument-serif",
    weight: ["400"],
});

const lacquer = Lacquer({
    subsets: ["latin"],
    variable: "--font-lacquer",
    weight: ["400"],
});

const SITE_NAME = "Lucía Vázquez Leal";
const SITE_DESCRIPTION =
    "Dirección creativa, diseño gráfico, producción audiovisual y producción integral de eventos.";
// Update if/when a custom domain replaces this Vercel URL.
const SITE_URL = "https://lucia-vazquez.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "es_AR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            data-scroll-behavior="smooth"
            className={`${archivo.variable} ${instrumentSerif.variable} ${lacquer.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <SmoothScroll />
                <Logo />
                <Menu />
                <PageTransition />
                <IntroReveal />
                {children}
                <Footer />
            </body>
        </html>
    );
}
