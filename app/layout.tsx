import type { Metadata } from "next";
import {
    Archivo,
    Instrument_Serif,
    Google_Sans,
    Lacquer,
} from "next/font/google";
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

const googleSans = Google_Sans({
    subsets: ["latin"],
    variable: "--font-google-sans",
    weight: ["400"],
});

const lacquer = Lacquer({
    subsets: ["latin"],
    variable: "--font-lacquer",
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Lucía Vázquez Leal",
    description:
        "Dirección creativa, diseño gráfico, producción audiovisual y producción integral de eventos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            data-scroll-behavior="smooth"
            className={`${archivo.variable} ${instrumentSerif.variable} ${googleSans.variable} ${lacquer.variable} h-full antialiased`}
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
