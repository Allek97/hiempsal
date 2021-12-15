import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";
import { Grid } from "@components/ui/Grid";
import { Hero } from "@components/ui/Hero";
import { ProductCard } from "@components/product/ProductCard";

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
        <>
            <Grid>
                {products.slice(0, 1).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="simple"
                    />
                ))}
            </Grid>
            <Grid>{JSON.stringify(products, null, 2)}</Grid>
        </>
    );
};

Home.Layout = Layout;

export default Home;
