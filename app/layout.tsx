import type { Metadata } from "next";
import {
    Inter,
    Archivo,
    Instrument_Serif,
    Imbue,
    Google_Sans,
} from "next/font/google";
import { Footer, Logo, Menu, PageTransition, SmoothScroll } from "@/components";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

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

const imbue = Imbue({
    subsets: ["latin"],
    variable: "--font-imbue",
    weight: ["400"],
});

const googleSans = Google_Sans({
    subsets: ["latin"],
    variable: "--font-google-sans",
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
            className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${imbue.variable} ${googleSans.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <SmoothScroll />
                <Logo />
                <Menu />
                <PageTransition />
                {children}
                <Footer />
            </body>
        </html>
    );
}
