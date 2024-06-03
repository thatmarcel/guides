import React from "react";

import "../styles/globals.css";

export const metadata = {
    title: "Guides",
    description: "guides or something i guess",
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="dark:bg-neutral-900 dark:text-white">
                {children}
            </body>
        </html>
    )
}
