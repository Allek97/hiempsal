// NOTE https://nextjs.org/learn/basics/dynamic-routes

import { Layout } from "@components/common";
import { ProductView } from "@components/product";

import { getConfig } from "@framework/api/config";
import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
import getReviews from "@framework/review/getReviews";
import useAddViewed from "@framework/viewed/use-add-viewed";

import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SWRConfig } from "swr";

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
    const addViewedProduct = useAddViewed();
    useEffect(() => {
        async function fetcher(): Promise<void> {
            try {
                if (product)
                    await addViewedProduct({
                        product,
                    });
            } catch (err) {
                console.log(err);
            }
        }

        fetcher();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

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

ProductSlug.Layout = Layout;

export default ProductSlug;
