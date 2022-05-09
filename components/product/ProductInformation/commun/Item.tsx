import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import tw from "twin.macro";

interface Props {
    title: string;
    content?: string;
}

const featureText = css`
    ${tw`font-size[11px] tracking-tighter line-height[1.2em]
    lg:(font-size[11.25px] letter-spacing[-.04em] line-height[1.3em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

export const Feature = styled.li`
    ${tw`flex justify-between items-center  
    padding[4vw 0] width[calc(100% - 8vw)] mx-auto 
    md:padding[3vw 0]
    lg:(padding[2vw 0] width[calc(100% - 2.6666666667vw)])`}

    ${featureText}

    border-bottom: 1px solid hsla(0,0%,60%,.3);
`;

const Item: FC<Props> = ({ title, content }) => {
    return (
        <Feature>
            <span>{title}</span>
            {content && <p>{content}</p>}
        </Feature>
    );
};

Item.defaultProps = {
    content: "",
};

export default Item;
