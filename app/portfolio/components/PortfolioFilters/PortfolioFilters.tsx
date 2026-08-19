"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "../../constants";

export function PortfolioFilters() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("categoria");

    return (
        <div className="flex flex-wrap gap-3 px-10 pb-10 mobile:px-5">
            <Link
                href={pathname}
                className={`rounded-full border px-4 py-2 text-sm tracking-widest uppercase ${
                    !activeCategory
                        ? "border-black bg-black text-white"
                        : "border-black/20 text-black/60 hover:border-black/60"
                }`}
            >
                Todos
            </Link>

            {CATEGORIES.map((category) => (
                <Link
                    key={category.slug}
                    href={`${pathname}?categoria=${category.slug}`}
                    className={`rounded-full border px-4 py-2 text-sm tracking-widest uppercase ${
                        activeCategory === category.slug
                            ? "border-black bg-black text-white"
                            : "border-black/20 text-black/60 hover:border-black/60"
                    }`}
                >
                    {category.label}
                </Link>
            ))}
        </div>
    );
}
