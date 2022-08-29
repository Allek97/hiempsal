import { FC } from "react";
import Link from "next/link";
import { FunctionalLink } from "@components/utils";

import { AiTwotoneFire } from "react-icons/ai";

import { Grid } from "@components/ui";
import { Product } from "@framework/types/product";
import { ProductArticle } from "../ProductArticle";

import {
    BrowsingBtn,
    ContainerEmpty,
    DecorationOneBottom,
    DecorationOneTop,
    DecorationTwoBottom,
    DecorationTwoTop,
    Root,
    RootEmpty,
    UserlistFull,
} from "./Userlist.styled";

interface Props {
    variant: "product" | "wishlist" | "product-viewed" | "order";
    products: Product[];
}

const Userlist: FC<Props> = ({ products, variant }) => {
    return (
        <Root>
            {!products.length ? (
                <ContainerEmpty>
                    <DecorationOneTop />
                    <DecorationOneBottom />
                    <DecorationTwoTop />
                    <DecorationTwoBottom />

                    <RootEmpty>
                        <h1>
                            {variant === "wishlist" &&
                                "The products on your wish list will appear here"}
                            {variant === "product-viewed" &&
                                "Your visited products will appear here"}
                            {variant === "order" &&
                                "No orders yet. Look for inspiration"}
                        </h1>
                        <Link href="/" passHref>
                            <FunctionalLink>
                                <BrowsingBtn>
                                    <AiTwotoneFire />
                                    <h1>
                                        {variant === "order"
                                            ? "Search for an inspiration"
                                            : "Start browsing"}
                                    </h1>
                                </BrowsingBtn>
                            </FunctionalLink>
                        </Link>
                    </RootEmpty>
                </ContainerEmpty>
            ) : (
                <UserlistFull>
                    <h1>
                        {variant === "wishlist" && "Your Wish List"}
                        {variant === "product-viewed" && "Recently Viewed"}
                        {variant === "order" && "Your Orders"}
                    </h1>
                    <Grid layout="userlist">
                        {products.map((product) => (
                            <ProductArticle
                                product={product}
                                variant={variant}
                                layout="A"
                                key={product.id}
                            />
                        ))}
                    </Grid>
                </UserlistFull>
            )}
        </Root>
    );
};

export default Userlist;
