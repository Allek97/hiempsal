import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";
import { ProductCard } from "@components/product/ProductCard";
import { Grid } from "@components/ui";
import { HeroCloth } from "@components/ui/Hero";

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
            <HeroCloth />
            <Grid>
                {products.slice(0, 3).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="simple"
                    />
                ))}
            </Grid>
            {/* <Grid>{JSON.stringify(products, null, 2)}</Grid> */}
        </main>
    );
};

Home.Layout = Layout;

export default Home;
