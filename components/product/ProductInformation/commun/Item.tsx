import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import tw from "twin.macro";
import { contentSize } from "./typography";

interface Props {
    title?: string;
    content: string;
    layout?: "A" | "B" | "C";
}

interface ItemProps {
    layout?: "A" | "B" | "C";
}

export const ItemContainer = styled.li<ItemProps>`
    ${tw`flex justify-between items-center`}

    ${({ layout }) =>
        layout === "A" &&
        css`
            ${tw`width[calc(100% - 8vw)] padding[4vw 0] mx-auto
                  md:padding[3vw 0]
                  lg:(padding[2vw 0] width[calc(100% - 2.6666666667vw)])`}
            border-bottom: 1px solid hsla(0,0%,60%,.3);
        `}

    ${({ layout }) =>
        layout === "B" &&
        css`
            ${tw`padding[6.7vw 4vw]
                    lg:padding[2.4666666667vw 2vw]`}
        `}

    ${({ layout, theme }) =>
        layout === "C" &&
        css`
            ${tw`flex-col items-start width[calc(100% - 8vw)] padding[4vw 0] mx-auto 
                  md:padding[3vw 0] 
                  lg:(padding[2vw 0] width[calc(100% - 2.6666666667vw)])`}
            border-bottom: 1px solid hsla(0,0%,60%,.3);

            span {
                ${tw`margin-bottom[0.5em] font-bold`}
            }
            p {
                ${theme.textSize.textSizeMain}
            }
        `}


    ${contentSize}
`;

const Item: FC<Props> = ({ title, content, layout = "A" }) => {
    return (
        <ItemContainer layout={layout}>
            {title && <span>{title}</span>}
            <p>{content}</p>
        </ItemContainer>
    );
};

Item.defaultProps = {
    title: undefined,
    layout: "A",
};

export default Item;
