/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
    reactStrictMode: true,
    framework: "shopify",
    i18n: {
        locales: ["en-US", "es"],
        defaultLocale: "en-US",
    },
    images: {
        domains: [
            "cdn.shopify.com",
            "hiempsal.s3.amazonaws.com",
            "upload.wikimedia.org",
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};
