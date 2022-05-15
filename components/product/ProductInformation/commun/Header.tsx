import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import Close from "@components/icons/Close";
import { useProductInfo } from "@components/product/context";
import { FC } from "react";
import { titleSize } from "./typography";

interface TitleProps {
    withBorder: boolean;
}

export const CloseBtn = styled(motion.button)`
    ${tw`display[none] 
    lg:(absolute top-1/2 right[0.6666666667vw]
     grid place-content-center w-10 h-10)`}
    transform: translateY(-50%);

    svg {
        ${tw`w-4 h-4`}
    }
    @media (hover: hover) and (pointer: fine) {
        transition: fill 0.1s cubic-bezier(0.49, 0.03, 0.13, 0.99);
        &:hover svg {
            transition: fill 0.1s cubic-bezier(0.49, 0.03, 0.13, 0.99);
            color: var(--orange-red);
        }
    }
`;

export const Title = styled.section<TitleProps>`
    ${tw`relative flex justify-between w-full padding[1em 4vw] 
    lg:padding[1em 1.3333333333vw]`}
    ${({ withBorder }) =>
        withBorder &&
        css`
            border-bottom: 2px solid hsla(0, 0%, 60%, 0.3);
        `}

    ${titleSize}
`;

interface Props {
    title: string;
    withBorder?: boolean;
}

const Header: FC<Props> = ({ title, withBorder = true }) => {
    const { closeProductInformation } = useProductInfo();
    return (
        <Title withBorder={withBorder}>
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

Header.defaultProps = {
    withBorder: true,
};

export default Header;
