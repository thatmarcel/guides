const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dash",
                permanent: false
            },
            {
                source: "/guide/:slug",
                destination: "/g/:slug",
                permanent: false
            },
            {
                source: "/guides/:slug",
                destination: "/g/:slug",
                permanent: false
            }
        ]
    }
};

module.exports = withNextIntl(nextConfig);