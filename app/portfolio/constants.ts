import services from "@/data/services.json";

// Portfolio filters ARE the services: same slugs, same order, taken
// straight from data/services.json so they can never drift apart.
export const CATEGORIES = services.map(({ slug, label }) => ({ slug, label }));
