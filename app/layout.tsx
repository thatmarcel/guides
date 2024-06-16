"use server"

import React from "react";

import "@fontsource-variable/public-sans";

import "../styles/globals.css";
import {getLocale} from "next-intl/server";
import {Metadata, ResolvingMetadata} from "next";

export async function generateMetadata(
    _params: any,
    _parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "Guides",
        description: "guides or something i guess",
    }
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const local = await getLocale();
    const languageCode = local.includes("de") ? "de" : "en";

    return (
        <html lang={languageCode}>
            <body className="dark:bg-neutral-900 dark:text-white overflow-x-hidden">
                {children}
            </body>
        </html>
    )
}
