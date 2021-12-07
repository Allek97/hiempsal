/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    framework: process.env.NEXT_PUBLIC_FRAMEWORK,
    i18n: {
        locales: ["en-US", "es"],
        defaultLocale: "en-US",
    },
};
