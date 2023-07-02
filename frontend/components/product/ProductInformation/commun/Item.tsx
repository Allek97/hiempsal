import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import tw from "twin.macro";
import { contentSize, subTitleSize } from "./typography";

interface Props {
    title?: string;
    content: string;
    layout?: "A" | "B" | "C" | "D";
}

interface ItemProps {
    layout?: "A" | "B" | "C" | "D";
}

const commonLayout = css`
    ${tw`width[calc(100% - 8vw)] padding[4vw 0] mx-auto
        md:padding[3vw 0]
        lg:(padding[2vw 0] width[calc(100% - 2.6666666667vw)])`}
    border-bottom: 1px solid hsla(0,0%,60%,.3);
`;

export const ItemContainer = styled.li<ItemProps>`
    ${tw`flex justify-between items-center`}

    p {
        ${tw`whitespace-pre-wrap`}
    }

    span {
        ${tw`block pr-5`}
    }

    ${contentSize}

    ${({ layout }) => layout === "A" && commonLayout}

    ${({ layout, theme }) =>
        layout === "B" &&
        css`
            ${tw`padding[6.7vw 4vw]
                    lg:padding[2.4666666667vw 2vw]`}

            ${theme.textSize.textSizeMedium}
        `}

    ${({ layout, theme }) =>
        layout === "C" &&
        css`
            ${commonLayout}
            ${tw`flex-col items-start`}

            span {
                ${tw`margin-bottom[0.5em] font-bold`}
                ${theme.textSize.textSizeMedium}
            }
            p {
                ${theme.textSize.textSizeMain}
            }
        `}
            
            ${({ layout, theme }) =>
        layout === "D" &&
        css`
            ${commonLayout}
            ${tw`flex-col items-start`}
            
            

            span {
                ${tw`margin-bottom[0.5em]`}
                ${subTitleSize}
            }
            p {
                ${theme.textSize.textSizeMedium}
                ${tw`line-height[1.3]`}
            }
        `}
`;

const Item: FC<Props> = ({ title, content, layout = "A", children }) => {
    return (
        <ItemContainer layout={layout}>
            {title && <span>{title}</span>}
            <p>{content}</p>
            {children}
        </ItemContainer>
    );
};

Item.defaultProps = {
    title: undefined,
    layout: "A",
};

export default Item;
