export type ServiceMedia = {
    type: "image" | "video";
    src: string;
    /** Project / artist the piece belongs to. */
    label: string;
};

export type Service = {
    slug: string;
    title: string;
    accentIndices: number[];
    shortDescription: string;
    fullDescription: string;
    /** Rotated in the service card, in this order. */
    media: ServiceMedia[];
    /** Short name, used as the Portfolio filter label. */
    label: string;
    relatedProjects: string[];
};

export type PortfolioItem = {
    slug: string;
    title: string;
    category: string;
    client: string;
    shortDescription: string;
    fullDescription: string;
    media: "image" | "video";
    images: string[];
    videos?: string[];
};
