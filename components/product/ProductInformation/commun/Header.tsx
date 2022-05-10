import styled from "@emotion/styled";
import tw from "twin.macro";
import Close from "@components/icons/Close";
import { useProductInfo } from "@components/product/context";
import { FC } from "react";
import { titleSize } from "./typography";

export const CloseBtn = styled.button`
    ${tw`display[none] 
    lg:(absolute top-1/2 right[0.6666666667vw]
     grid place-content-center w-10 h-10)`}
    transform: translateY(-50%);

    svg {
        ${tw`w-4 h-14`}
    }
`;

export const Title = styled.section`
    ${tw`relative flex justify-between w-full padding[1em 4vw] 
    lg:padding[1em 1.3333333333vw]`}
    border-bottom: 2px solid hsla(0,0%,60%,.3);

    ${titleSize}
`;

interface Props {
    title: string;
}

const Header: FC<Props> = ({ title }) => {
    const { closeProductInformation } = useProductInfo();
    return (
        <Title>
            <h1>{title}</h1>
            <CloseBtn
                type="button"
                onClick={() => {
                    closeProductInformation();
                }}
            >
                <Close />
            </CloseBtn>
        </Title>
    );
};

export default Header;
