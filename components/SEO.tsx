/* eslint-disable react/prop-types */
import Head from "next/head";

const DOMAIN = "https://www.hiempsal.vercel.app";
const DEFAULT_OG_IMAGE =
    "https://og-image.vercel.app/Hiempsal.jpeg?theme=dark&md=1&fontSize=150px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg";

export default function Seo({
    title = "",
    description = "Official Hiempsal® E-commerce | Everything you need for your next fashion look and technological device is available online. Check out T-shirts, Hoodies, Laptops, Tablets; Other high-end gadgets. Are you ready?",
    siteName = "Hiempsal E-commerce Shop",
    canonical = DOMAIN,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    twitterHandle = "@IAllekAmazigh",
}) {
    return (
        <Head>
            <title key="title">
                {title ? `${title} | ${siteName}` : `${siteName}`}
            </title>
            <meta name="description" content={description} />
            <meta key="og_type" property="og:type" content={ogType} />
            <meta key="og_title" property="og:title" content={title} />
            <meta
                key="og_description"
                property="og:description"
                content={description}
            />
            <meta key="og_locale" property="og:locale" content="en_IE" />
            <meta
                key="og_site_name"
                property="og:site_name"
                content={siteName}
            />
            <meta
                key="og_url"
                property="og:url"
                content={canonical ?? DOMAIN}
            />
            <meta
                key="og_site_name"
                property="og:site_name"
                content={siteName}
            />
            <meta
                key="og_image"
                property="og:image"
                content={ogImage ?? DEFAULT_OG_IMAGE}
            />
            <meta
                key="og_image:alt"
                property="og:image:alt"
                content={`${title} | ${siteName}`}
            />
            <meta
                key="og_image:width"
                property="og:image:width"
                content="1200"
            />
            <meta
                key="og_image:height"
                property="og:image:height"
                content="630"
            />

            <meta name="robots" content="index,follow" />

            <meta
                key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                key="twitter:site"
                name="twitter:site"
                content={twitterHandle}
            />
            <meta
                key="twitter:creator"
                name="twitter:creator"
                content={twitterHandle}
            />
            <meta
                key="twitter:title"
                property="twitter:title"
                content={title}
            />
            <meta
                key="twitter:description"
                property="twitter:description"
                content={description}
            />

            <link rel="canonical" href={canonical ?? DOMAIN} />

            <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
    );
}
