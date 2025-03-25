"use client";

import { usePWA } from "@/hooks/usePWA";
import "@/styles/pages/home.scss";

// components
import WebLanding from "@/components/home/WebLanding";
import AppMain from "@/components/home/AppMain";

export default function Home() {
    const isPWA = usePWA();
    return <div className="home">{isPWA ? <AppMain /> : <WebLanding />}</div>;
}
