import { getConfig } from "@framework/api/config";
import getAllProductsPaths from "@framework/product/get-all-products-paths";
import { GetStaticPaths, GetStaticPropsContext } from "next";

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

export const getStaticProps = ({
    params,
}: GetStaticPropsContext<{
    slug: string;
}>) => {
    const config = getConfig();
};
