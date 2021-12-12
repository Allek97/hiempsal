import { getConfig } from "@framework/api/config";
import type { InferGetStaticPropsType, NextPage } from "next";
import { getAllProducts } from "@framework/product";

export async function getStaticProps() {
    const config = getConfig();

    const products = await getAllProducts(config);

    return {
        props: { products },
        revalidate: 4 * 60 * 60,
    };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ products }) => {
    return <div>Hello World</div>;
};

export default Home;
