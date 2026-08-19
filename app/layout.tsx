import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { Menu } from "@/components";
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

export const metadata: Metadata = {
    title: "Lucía Vázquez Leal",
    description:
        "Dirección creativa, diseño gráfico, producción audiovisual y producción integral de eventos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            className={`${inter.variable} ${archivo.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Menu />
                {children}
            </body>
        </html>
    );
}
