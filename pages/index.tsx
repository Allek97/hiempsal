import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";
import Hero from "@components/ui/Hero/Hero";
import { ProductCard } from "@components/product/ProductCard";
import { Grid } from "@components/ui";

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
            <Grid layout="clothing">
                {products.slice(0, 3).map((product, idx) => (
                    <ProductCard
                        product={product}
                        key={product.id}
                        variant="complex"
                        onDisplay={idx % 2 === 0 && idx !== 0}
                    />
                ))}
            </Grid>
            <Partner />
            <Hero variant="technology" />

            <Grid layout="technology">
                <TechArticle />
                <TechArticle />
                <TechArticle />
                <TechArticle />
            </Grid>
        </main>
    );
};

Home.Layout = Layout;

export default Home;
