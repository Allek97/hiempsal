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
} from "./Wishlist.styled";

const Wishlist: FC = () => {
    const { closeUsernav } = useUI();

    const [isWishlistEmpty, _] = useState<boolean>(true);
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
                <div>
                    <h1>Wishlist</h1>
                </div>
            )}
        </Root>
    );
};

export default Wishlist;
