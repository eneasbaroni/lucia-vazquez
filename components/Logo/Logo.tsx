import Link from "next/link";

export function Logo() {
    return (
        <Link
            href="/"
            aria-label="Ir al inicio"
            className="fixed top-6 left-6 z-70 block h-6 w-11 mix-blend-difference mobile:h-5 mobile:w-9"
        >
            <span
                className="block h-full w-full bg-white"
                style={{
                    WebkitMaskImage: "url('/images/logo.svg')",
                    maskImage: "url('/images/logo.svg')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                }}
            />
        </Link>
    );
}
