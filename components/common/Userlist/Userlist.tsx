import { FC, useState } from "react";

import { AiTwotoneFire } from "react-icons/ai";

import { Product } from "@framework/types/product";

import {
    BrowsingBtn,
    ContainerEmpty,
    DecorationOneBottom,
    DecorationOneTop,
    Root,
    RootEmpty,
    UserlistBox,
    UserlistFull,
} from "./Userlist.styled";
import { ProductArticle } from "../ProductArticle";

interface Props {
    variant: "wishlist" | "product-viewed";
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
                    <UserlistBox>
                        {products.map((product) => (
                            <ProductArticle
                                key={product.id}
                                variant={variant}
                                product={product}
                            />
                        ))}
                    </UserlistBox>
                </UserlistFull>
            )}
        </Root>
    );
};

export default Userlist;
