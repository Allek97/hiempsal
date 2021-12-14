import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import Layout from "@components/common/Layout";

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
    return <div>{JSON.stringify(products, null, 2)}</div>;
};

Home.Layout = Layout;

export default Home;
