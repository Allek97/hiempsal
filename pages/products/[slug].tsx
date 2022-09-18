// NOTE https://nextjs.org/learn/basics/dynamic-routes

import { Layout } from "@components/common";
import { ProductView } from "@components/product";

import { getConfig } from "@framework/api/config";
import { getAllProducts } from "@framework/product";
import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
import getReviews from "@framework/review/getReviews";
import { Product } from "@framework/types/product";
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

    const res: Product[] = await getAllProducts(config);

    const similarProducts = res.filter(
        (similarProduct) => similarProduct.type === product?.type
    );
    const boutiqueProducts = res.filter(
        (boutiqueProduct) => boutiqueProduct.type !== product?.type
    );

    const reviews = await getReviews({
        config,
        productId: product?.id ?? "",
    });

    const key = `/api/reviews/${product?.id}`;

    return {
        props: {
            product,
            similarProducts,
            boutiqueProducts,
            fallback: {
                [key]: reviews ?? null,
            },
        },
    };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductSlug({
    product,
    similarProducts,
    boutiqueProducts,
    fallback,
}: Props) {
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
                {product && (
                    <ProductView
                        product={product}
                        similarProducts={similarProducts}
                        boutiqueProducts={boutiqueProducts}
                    />
                )}
            </SWRConfig>
        </div>
    );
}

ProductSlug.Layout = Layout;
