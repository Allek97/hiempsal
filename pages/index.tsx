import type { InferGetStaticPropsType, NextPage } from "next";

export async function getStaticProps() {
    return {
        props: { product: 5 },
        revalidate: 4 * 60 * 60,
    };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ product }) => {
    return <div>Hello World</div>;
};

export default Home;
