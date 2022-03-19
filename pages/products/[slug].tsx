// NOTE https://nextjs.org/learn/basics/dynamic-routes

import { Layout } from "@components/common";
import { ProductView } from "@components/product";
import { getConfig } from "@framework/api/config";
import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    const config = getConfig();
    const { products } = await getAllProductsPaths(config);

    return {
        paths: products.map(({ slug }) => ({
            params: {
                slug,
            },
        })),
        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{
    slug: string;
}>) => {
    const config = getConfig();
    const { product } = await getProduct({
        config,
        variables: { slug: params?.slug },
    });

    return {
        props: {
            product,
        },
    };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductSlug({ product }: Props) {
    return <div>{product && <ProductView product={product} />}</div>;
}

ProductSlug.Layout = Layout;
