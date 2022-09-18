import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";

import Hero from "@components/ui/Hero/Hero";

import { Partner } from "@components/elements";
import { TechArticle } from "@components/elements/TechArticle";
import { Grid } from "@components/ui/Grid";
import { ProductCard } from "@components/product";
import { Layout } from "@components/common";
import { Paddings } from "@components/ui";

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
            <Paddings>
                <Grid layout="clothing">
                    {products
                        .filter((element) => element.type === "clothing")
                        .slice(0, 3)
                        .map((product, idx) => (
                            <ProductCard
                                product={product}
                                key={product.id}
                                variant="complex"
                                isDisplayed={idx % 2 === 0 && idx !== 0}
                            />
                        ))}
                </Grid>
            </Paddings>
            <Partner />
            <Hero variant="technology" />
            <Paddings>
                <Grid layout="technology">
                    {products
                        .filter((element) => element.type === "technology")
                        .slice(0, 3)
                        .map((product) => (
                            <TechArticle product={product} key={product.id} />
                        ))}
                    {/* <TechArticle /> */}
                </Grid>
            </Paddings>
        </main>
    );
};

Home.Layout = Layout;

export default Home;
