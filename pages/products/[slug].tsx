import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
// import { SWRConfig } from "swr";

import { Layout } from "@components/common";
import { ProductView } from "@components/product";

import getAllProductsPaths from "@framework/product/get-all-products-paths";
import getProduct from "@framework/product/get-product";
// import getReviews from "@framework/review/getReviews";
import { getConfig } from "@framework/api/config";
import Seo from "@components/SEO";
import { truncateText } from "@lib/truncateText";

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

    // const reviews = await getReviews({
    //     config,
    //     productId: product?.id ?? "",
    // });

    // const key = `/api/reviews/${product?.id}`;

    return {
        props: {
            product,
        },
    };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const DOMAIN = "https://www.hiempsal.vercel.app";
const ProductSlug = ({ product }: Props) => {
    if (!product) {
        return <h1>404 - Sorry could not find this page</h1>;
    }
    return (
        <>
            <Seo
                title={product.name}
                description={truncateText(product.description, 250)}
                canonical={`${DOMAIN}/${product.path}`}
                ogImage={product.images[0].url}
            />
            <div>
                <ProductView key={product.id} product={product} />
            </div>
        </>
    );
};

ProductSlug.Layout = Layout;

export default ProductSlug;
