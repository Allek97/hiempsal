import { FC, useState } from "react";

import { AiTwotoneFire } from "react-icons/ai";

import { Grid } from "@components/ui";
import { Product } from "@framework/types/product";
import { ProductArticle } from "../ProductArticle";

import {
    BrowsingBtn,
    ContainerEmpty,
    DecorationOneBottom,
    DecorationOneTop,
    Root,
    RootEmpty,
    UserlistFull,
} from "./Userlist.styled";

interface Props {
    variant: "product" | "wishlist" | "product-viewed" | "order";
    products: Product[];
}

const Userlist: FC<Props> = ({ products, variant }) => {
    const [isWishlistEmpty, setIsWishlistEmpty] = useState<boolean>(false);
    return (
        <Root>
            {isWishlistEmpty ? (
                <ContainerEmpty>
                    <>
                        <DecorationOneTop />
                        <DecorationOneBottom />
                    </>

                    <RootEmpty>
                        <h1>
                            {variant === "wishlist"
                                ? "The products on your wish list will appear here"
                                : "Your visited products will appear here"}
                        </h1>
                        <BrowsingBtn onClick={() => alert("close")}>
                            <AiTwotoneFire />
                            <h1>Start browsing</h1>
                        </BrowsingBtn>
                    </RootEmpty>
                </ContainerEmpty>
            ) : (
                <UserlistFull>
                    <h1>
                        {variant === "wishlist"
                            ? "Your Wish List"
                            : "Recently Viewed"}
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
