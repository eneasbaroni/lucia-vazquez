import type { Metadata } from "next";
import { Inter, Archivo, Instrument_Serif, Imbue } from "next/font/google";
import { Footer, Logo, Menu, SmoothScroll } from "@/components";
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

export const metadata: Metadata = {
    title: "Lucía Vázquez Leal",
    description:
        "Dirección creativa, diseño gráfico, producción audiovisual y producción integral de eventos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${imbue.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <SmoothScroll />
                <Logo />
                <Menu />
                <div className="relative z-10">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
