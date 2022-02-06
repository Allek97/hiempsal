import Image from "next/image";

import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";
import { ProductGrid } from "@components/ui/Grid";
import Hero from "@components/ui/Hero/Hero";
import { ProductCard } from "@components/product/ProductCard";
import { Marquee } from "@components/ui";

import sponsors from "@lib/const/sponsors/clothBrands";
import { Partner } from "@components/elements";
import { TechArticle } from "@components/elements/TechArticle";

export async function getStaticProps() {
    const config = getConfig();

    const products = await getAllProducts(config);

    return {
        props: { products },
        revalidate: 4 * 60 * 60,
    };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ products }: Props) => {
    return (
        <main>
            <Hero variant="clothing" />
            <ProductGrid>
                {products.slice(0, 3).map((product, idx) => (
                    <ProductCard
                        product={product}
                        key={product.id}
                        variant="complex"
                        onDisplay={idx % 2 === 0 && idx !== 0}
                    />
                ))}
            </ProductGrid>
            <Partner />
            {/* <Marquee variant="clothing" direction="toLeft">
                {sponsors.map(({ icon: link, id, title }) => (
                    <Image
                        src={link}
                        alt={title}
                        quality="80"
                        width={200}
                        height={200}
                        layout="fixed"
                        key={id}
                    />
                ))}
            </Marquee> */}
            <Hero variant="technology" />
            <TechArticle />

            {/* <Grid>{JSON.stringify(products, null, 2)}</Grid> */}
        </main>
    );
};

Home.Layout = Layout;

export default Home;
