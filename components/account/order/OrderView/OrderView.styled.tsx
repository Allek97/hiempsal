import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

export const Container = styled.div`
    ${tw`mb-10 lg:mb-0`}
    ${({ theme }) => theme.layout.mainPadding}

    & > h2 {
        ${tw`mt-5 font-size[19px] uppercase font-bold mb-11
        xl:font-size[21px]
        3xl:font-size[23px]`}
        letter-spacing: 0.05em !important;
    }
`;

export const BackBtn = styled(motion.button)`
    ${tw`flex items-center uppercase font-bold`}
    letter-spacing: 0.1em !important;

    ${({ theme }) => theme.textSize.textSizeMedium}

    svg {
        ${tw`h-6 w-6 mr-4`}
        transform: rotateX(180deg);
    }
`;

export const Content = styled.ul`
    ${tw`flex flex-col justify-between flex-wrap`}
`;

export const Package = styled.li`
    ${tw`flex flex-col justify-between mb-12`}

    h3 {
        ${tw`uppercase font-bold`}
    }

    & > div:nth-of-type(2),
    div:nth-of-type(3) {
        ${({ theme }) => theme.textSize.textSizeMedium};
        letter-spacing: 0.025em !important;
    }
`;

export const orderInfoText = css`
    ${tw`font-size[13.5px] line-height[1.3em] tracking-tighter 
    lg:font-size[12.5px]
    2lg:font-size[1.1vw]`}

    ${tw`2xl:font-size[16px]`}
`;

export const PackageContent = styled.div`
    ${tw`flex mt-5`}

    & > div:first-of-type {
        ${tw`relative flex flex-col`}

        button {
            ${orderInfoText}
        }
    }
    & > div:nth-of-type(2) {
        ${tw`flex flex-col`}

        span {
            ${orderInfoText}
        }
    }

    img {
        padding: 4px !important;
    }
`;

export const OrderDetails = styled.div`
    ${tw`flex flex-col py-9 border-b border-black  
    md:w-2/3
    lg:(flex-row justify-between items-end)`}
`;

export const DetailBloc = styled.div`
    ${tw`flex flex-col`}
    &:last-of-type {
        & > div {
            ${tw`flex justify-between`}
        }
    }

    &:not(:last-of-type) {
        ${tw`mb-5`}
    }

    &:nth-of-type(2) {
        ${tw`lg:mr-40`}
    }
    h2 {
        ${({ theme }) => theme.textSize.textSizeLarge}
    }

    p {
        ${tw`mb-5 font-bold`}
    }
    span {
        &:not(:last-of-type) {
            ${tw`mb-1.5`}
        }
    }
`;
