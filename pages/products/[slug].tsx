import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { ProductView } from "@components/product";

import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
import getReviews from "@framework/review/getReviews";
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

    const reviews = await getReviews({
        config,
        productId: product?.id ?? "",
    });

    const key = `/api/reviews/${product?.id}`;

    return {
        props: {
            product,
            fallback: {
                [key]: reviews ?? null,
            },
        },
    };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ProductSlug = ({ product, fallback }: Props) => {
    const router = useRouter();
    if (!router.isFallback && !product) {
        return <h1>404 - Sorry could not find this page</h1>;
    }
    return (
        <div>
            <SWRConfig value={{ fallback }}>
                {product && <ProductView product={product} />}
            </SWRConfig>
        </div>
    );
};

// ProductSlug.Layout = Layout;

export default ProductSlug;
