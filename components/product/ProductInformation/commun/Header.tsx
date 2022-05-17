import { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import Close from "@components/icons/Close";
import { useProductInfo } from "@components/product/context";
import { useUI } from "@components/ui/context";
import { titleSize } from "./typography";

interface TitleProps {
    withBorder: boolean;
    withSidePaddings: boolean;
}
interface CloseProps {
    withSidePaddings: boolean;
}

export const CloseBtn = styled(motion.button)<CloseProps>`
    ${tw`display[none] 
    lg:(absolute top-1/2
     grid place-content-center w-10 h-10)`}
    transform: translateY(-50%);

    ${({ withSidePaddings }) =>
        withSidePaddings
            ? css`
                  ${tw`lg:right[0.6666666667vw]`}
              `
            : css`
                  ${tw`lg:right[0vw]`}
              `}

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
    ${tw`relative flex justify-between w-full padding[1em 0]`}
    ${({ withBorder }) =>
        withBorder &&
        css`
            border-bottom: 2px solid hsla(0, 0%, 60%, 0.3);
        `}
    ${({ withSidePaddings }) =>
        withSidePaddings &&
        css`
            ${tw`padding[1em 4vw] 
                 lg:padding[1em 1.3333333333vw]`}
        `}
    h1 {
        ${tw`mr-auto`}
    }

    ${titleSize}
`;

interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    withBorder?: boolean;
    withSidePaddings?: boolean;
}

const Header: FC<Props> = ({
    title,
    withBorder = true,
    withSidePaddings = true,
}) => {
    const { closeProductInformation } = useProductInfo();
    const { closeHelp } = useUI();
    return (
        <Title withBorder={withBorder} withSidePaddings={withSidePaddings}>
            <h1>{title}</h1>
            <CloseBtn
                withSidePaddings={withSidePaddings}
                type="button"
                onClick={() => {
                    closeProductInformation();
                    closeHelp();
                }}
            >
                <Close />
            </CloseBtn>
        </Title>
    );
};

Header.defaultProps = {
    withBorder: true,
    withSidePaddings: true,
};

export default Header;
