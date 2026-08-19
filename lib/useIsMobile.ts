import { useEffect, useState } from "react";

function getIsMobile() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
}

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        setIsMobile(mediaQuery.matches);

        function handleChange(event: MediaQueryListEvent) {
            setIsMobile(event.matches);
        }

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isMobile;
}
