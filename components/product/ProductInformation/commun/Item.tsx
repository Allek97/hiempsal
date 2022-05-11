import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import tw from "twin.macro";
import { contentSize } from "./typography";

interface Props {
    title?: string;
    content: string;
    layout?: "A" | "B";
}

interface ItemProps {
    layout?: "A" | "B";
}

export const ItemContainer = styled.li<ItemProps>`
    ${tw`flex justify-between items-center`}

    ${({ layout }) =>
        layout === "A"
            ? css`
                  ${tw`width[calc(100% - 8vw)] padding[4vw 0] mx-auto
                  md:padding[3vw 0]
                    lg:(padding[2vw 0] width[calc(100% - 2.6666666667vw)])`}
              `
            : css`
                  ${tw`padding[6.7vw 4vw]
                    lg:padding[2.4666666667vw 2vw]`}
              `}

    ${contentSize}

    border-bottom: 1px solid hsla(0,0%,60%,.3);
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
