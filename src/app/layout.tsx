import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";

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

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, viewport-fit=cover"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
