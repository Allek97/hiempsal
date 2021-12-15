/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    framework: "shopify",
    i18n: {
        locales: ["en-US", "es"],
        defaultLocale: "en-US",
    },
    images: {
        domains: ["cdn.shopify.com"],
    },
};
