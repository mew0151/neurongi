import { useEffect, useState } from "react";

export function usePWA() {
    const [isPWA, setIsPWA] = useState(false);
    useEffect(() => {
        const isStandalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            ("standalone" in window.navigator &&
                (window.navigator as Navigator & { standalone: boolean })
                    .standalone === true);

        setIsPWA(isStandalone);
    }, []);

    return isPWA;
}
