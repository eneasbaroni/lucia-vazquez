"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "../../constants";

function filterClassName(isActive: boolean) {
    return `tracking-widest uppercase transition-all ${
        isActive
            ? "text-2xl text-black mobile:text-lg"
            : "text-base text-black/40 hover:text-black/70 mobile:text-sm"
    }`;
}

export function PortfolioFilters() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("categoria");

    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-10 pb-10 mobile:px-5">
            <Link href={pathname} className={filterClassName(!activeCategory)}>
                Todos
            </Link>

            {CATEGORIES.map((category) => (
                <Link
                    key={category.slug}
                    href={`${pathname}?categoria=${category.slug}`}
                    className={filterClassName(activeCategory === category.slug)}
                >
                    {category.label}
                </Link>
            ))}
        </div>
    );
}
