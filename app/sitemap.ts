import type { MetadataRoute } from "next";

// Update if/when a custom domain replaces this Vercel URL.
const SITE_URL = "https://lucia-vazquez.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/servicios", "/portfolio", "/sobre-mi"];

    return routes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
    }));
}
