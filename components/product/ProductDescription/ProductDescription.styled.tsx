import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const titleSize = css`
    ${tw`font-size[17px] tracking-tighter line-height[1.15em] font-bold
    lg:(font-size[13.5px] line-height[1.1em])
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;
const featureSize = css`
    ${tw`font-family[Whyte Inktrap] font-size[36px] letter-spacing[-0.04em] line-height[1em]
    lg:(font-size[40px] letter-spacing[-0.06em])
    2lg:font-size[3.65vw]`}

    ${tw`
    2xl:font-size[55px]`}
`;

const descriptionSize = css`
    ${tw`font-size[16px] tracking-tighter line-height[1.3em]
        lg:(font-size[15px] letter-spacing[-0.04em])
        2lg:font-size[1.3333333333333vw]`}

    ${tw`2xl:font-size[24px]`}
`;

export const Root = styled.div`
    ${tw`flex flex-col
    lg:(width[50.667vw] padding-right[10.667vw])
    2xl:(width[42vw] pr-0)
    4xl:(width[46vw])`}

    h2 {
        ${tw`margin-bottom[7.2vw]
        md:mb-8`}
        ${titleSize}
    }

    h1 {
        ${tw`-ml-0.5 mb-6`}
        ${featureSize}
    }

    p {
        ${descriptionSize}
    }
`;
