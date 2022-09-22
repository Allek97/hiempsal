import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

import { ProductView } from "@components/product";

import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
import { getConfig } from "@framework/api/config";

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

const ProductSlug = ({ product }: Props) => {
    const router = useRouter();
    if (!router.isFallback && !product) {
        return <h1>404 - Sorry could not find this page</h1>;
    }
    return <div>{product && <ProductView product={product} />}</div>;
};

// ProductSlug.Layout = Layout;

export default ProductSlug;
