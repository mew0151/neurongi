// "use client";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";
// import Head from "next/head";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "virus",
    description: "im neurongi virus"
};

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    viewportFit: "cover"
};

// safe area 관련 참고
// https://developers-kr.googleblog.com/2017/04/chrome-58-beta-indexeddb-2021.html
export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
