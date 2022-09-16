// NOTE https://nextjs.org/learn/basics/dynamic-routes

import { Layout } from "@components/common";
import { ProductView } from "@components/product";

import { getConfig } from "@framework/api/config";
import { getQueryProducts } from "@framework/product";
import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
import { Product } from "@framework/types/product";
import useAddViewed from "@framework/viewed/use-add-viewed";

import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
import { useEffect } from "react";

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

    const query = `product_type:${product?.type ?? "clothing"}`;

    const similarProducts: Product[] = await getQueryProducts({
        config,
        variables: { querySearch: query },
    });

    return {
        props: {
            product,
            similarProducts,
        },
    };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ProductSlug({ product, similarProducts }: Props) {
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
            {product && (
                <ProductView
                    product={product}
                    similarProducts={similarProducts}
                />
            )}
        </div>
    );
}

ProductSlug.Layout = Layout;
