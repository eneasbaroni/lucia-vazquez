import Link from "next/link";

export function Logo() {
    return (
        <Link
            href="/"
            aria-label="Ir al inicio"
            className="fixed top-5 left-6 z-70 block h-9 w-6 mix-blend-difference mobile:h-7 mobile:w-5"
        >
            <span
                className="block h-full w-full bg-white mask-[url(/images/isotipo.svg)] mask-contain mask-center mask-no-repeat"
            />
        </Link>
    );
}
