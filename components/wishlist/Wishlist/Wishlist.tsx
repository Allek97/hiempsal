import { FC, useState } from "react";

import { AiTwotoneFire } from "react-icons/ai";
import { useUI } from "@components/ui/context";
import {
    BrowsingBtn,
    ContainerEmpty,
    DecorationOneBottom,
    DecorationOneTop,
    Root,
    RootEmpty,
    WishlistBox,
    WishlistFull,
} from "./Wishlist.styled";
import WishlistArticle from "../WishlistArticle/WishlistArticle";

const Wishlist: FC = () => {
    const { closeUsernav } = useUI();

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
                        <h1>The products on your wish list will appear here</h1>
                        <BrowsingBtn onClick={closeUsernav}>
                            <AiTwotoneFire />
                            <h1>Start browsing</h1>
                        </BrowsingBtn>
                    </RootEmpty>
                </ContainerEmpty>
            ) : (
                <WishlistFull>
                    <h1>Your Wish List</h1>
                    <WishlistBox>
                        <WishlistArticle />
                        <WishlistArticle />
                        <WishlistArticle />
                    </WishlistBox>
                </WishlistFull>
            )}
        </Root>
    );
};

export default Wishlist;
