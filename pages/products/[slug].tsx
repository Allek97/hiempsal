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
        fallback: true,
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

export default function ProductSlug({ product, fallback }: Props) {
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

    return (
        <div>
            <SWRConfig value={{ fallback }}>
                {product && <ProductView product={product} />}
            </SWRConfig>
        </div>
    );
}

ProductSlug.Layout = Layout;
