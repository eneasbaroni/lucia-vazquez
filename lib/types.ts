export type Service = {
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    images: string[];
    relatedProjects: string[];
};

export type PortfolioItem = {
    slug: string;
    title: string;
    category: string;
    client: string;
    shortDescription: string;
    fullDescription: string;
    images: string[];
};
