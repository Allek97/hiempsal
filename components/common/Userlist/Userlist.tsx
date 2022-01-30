import { FC, useState } from "react";

import { AiTwotoneFire } from "react-icons/ai";
import { useUsernavUI } from "@components/ui/usernavContext";
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
}

const Userlist: FC<Props> = ({ variant }) => {
    const { closeUsernav } = useUsernavUI();

    const [isWishlistEmpty, _] = useState<boolean>(false);
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
                        <BrowsingBtn onClick={closeUsernav}>
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
                        <ProductArticle variant={variant} />
                        <ProductArticle variant={variant} />
                        <ProductArticle variant={variant} />
                        <ProductArticle variant={variant} />
                        <ProductArticle variant={variant} />
                    </UserlistBox>
                </UserlistFull>
            )}
        </Root>
    );
};

export default Userlist;
