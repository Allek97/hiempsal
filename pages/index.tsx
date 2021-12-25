import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";
import { ProductCard } from "@components/product/ProductCard";
import { Grid } from "@components/ui";

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
                {products.slice(0, 3).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="simple"
                    />
                ))}
            </Grid>
            {/* <Grid>{JSON.stringify(products, null, 2)}</Grid> */}
        </>
    );
};

Home.Layout = Layout;

export default Home;
