import type { MetadataRoute } from "next";

// Update if/when a custom domain replaces this Vercel URL.
const SITE_URL = "https://lucia-vazquez.vercel.app";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
