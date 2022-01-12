import { FC } from "react";

import { AiTwotoneFire } from "react-icons/ai";
import { useUI } from "@components/ui/context";
import {
    BrowsingBtn,
    ContainerEmpty,
    Root,
    RootEmpty,
} from "./Wishlist.styled";

const Wishlist: FC = () => {
    const { closeUsernav } = useUI();
    return (
        <Root>
            <ContainerEmpty>
                {/* <>
                    <DecorationOneTop />
                    <DecorationOneBottom />
                </> */}

                <RootEmpty>
                    <h1>The products on your wish list will appear here</h1>
                    <BrowsingBtn onClick={closeUsernav}>
                        <AiTwotoneFire />
                        <h1>Start browsing</h1>
                    </BrowsingBtn>
                </RootEmpty>
                {/* 
                <>
                    <DecorationTwoTop />
                    <DecorationTwoBottom />
                </> */}
            </ContainerEmpty>
        </Root>
    );
};

export default Wishlist;
