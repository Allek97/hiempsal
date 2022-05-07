import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";
import tw from "twin.macro";

// #cdcdcd

const titleSize = css`
    ${tw`font-size[17px] tracking-tighter line-height[1.15em] font-semibold
    lg:(font-size[13.5px] line-height[1.1em])
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;
const featureSize = css`
    ${tw`font-family[Whyte Inktrap] font-size[40px] letter-spacing[-0.04em] line-height[1em]
    lg:(font-size[45px] letter-spacing[-0.06em])
    2lg:font-size[4vw]`}

    ${tw`
    2xl:font-size[60px]`}
`;

const descriptionSize = css`
    ${tw`font-size[16px] tracking-tighter line-height[1.3em]
        lg:(font-size[15px] letter-spacing[-0.04em])
        2lg:font-size[1.3333333333333vw]`}

    ${tw`2xl:font-size[24px]`}
`;

export const Root = styled.div`
    ${tw`flex flex-col margin-bottom[20vw] mr-auto
    md:margin-bottom[10vw]
    lg:(width[50.667vw] padding-right[10.667vw] mb-0)
    2xl:(width[42vw] pr-0)
    4xl:(width[46vw])`}

    h2 {
        ${tw`margin-bottom[7.2vw] text-accents-9
        md:mb-8`}
        ${titleSize}
    }

    h1 {
        ${tw`-ml-0.5 mb-6`}
        ${featureSize}
    }

    p {
        ${tw`margin-bottom[34px]`}
        ${descriptionSize}
    }
`;

export const ReviewContainer = styled(motion.div)`
    ${tw`flex items-center w-max cursor-pointer`}
`;

export const StyledRating = styled(Rating)`
    ${tw`column-gap[1px] margin-right[2vw] 
    lg:margin-right[0.66666666666667vw]`}

    svg {
        height: 10px;
        width: 10px;

        /* padding-right: 3px; */
    }

    .MuiRating-iconFilled {
        color: var(--orange-red);
    }
    .MuiRating-iconEmpty {
        color: #cdcdcd;
    }
`;
