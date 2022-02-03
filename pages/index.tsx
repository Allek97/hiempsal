import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";
import { ProductGrid } from "@components/ui/Grid";
import Hero from "@components/ui/Hero/Hero";
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
            <Hero variant="technology" />

            {/* <Grid>{JSON.stringify(products, null, 2)}</Grid> */}
        </main>
    );
};

Home.Layout = Layout;

export default Home;
