import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { mainFont2, secondaryFont } from "../Commun/typography";

export const ReviewContainer = styled.div`
    ${tw`block px-8 bg-white mb-20`}
`;

export const CustomerReview = styled(motion.div)`
    ${tw`flex flex-col w-full padding[1.2em] mx-auto bg-white
    margin-bottom[1.4em] border-radius[5px]`}

    box-shadow: 2px 2px 8px hsl(0deg 0% 79% / 80%);

    ${mainFont2}

    & > div:nth-of-type(2) {
        ${tw`md:(flex justify-between mt-5)
        lg:(block mt-0)`}

        & > div:first-of-type {
            ${tw`flex flex-col mt-4 mb-6 w-max whitespace-nowrap
            md:(ml-40 my-0 order-2)
            lg:(order-1 w-auto ml-0 mt-4 mb-6)`}
        }
    }
`;

export const ReviewIdentification = styled.div`
    ${tw`flex items-center mr-auto`}

    & > div:first-of-type {
        ${tw`flex items-center justify-center height[42px] width[42px] 
        mr-2 border-radius[50%] bg-accents-7 text-white
        2xl:(h-11 w-11)`}
    }
    & > div:nth-of-type(2) {
        ${tw`flex flex-col justify-between`}

        span:first-of-type {
            ${tw`font-bold margin-bottom[0.2em]
            lg:mb-0`}
        }
        span:nth-of-type(2) {
            ${secondaryFont}
        }
    }
`;

export const ReviewField = styled.div`
    ${tw`flex`}

    span {
        line-height: 17px !important;
    }

    span:first-of-type {
        ${tw`text-accents-8 font-bold margin-right[0.3em]`}
    }

    &:not(:last-of-type) {
        ${tw`mb-1`}
    }
`;
export const ReviewPagination = styled.div`
    ${tw`mx-auto w-max my-5 font-size[14px] tracking-tighter`}

    ul {
        ${tw`flex items-center`}

        & .active {
            ${tw`font-bold`}
        }
        & .disabled {
            svg {
                ${tw`fill[var(--accents-5)]`}
            }
        }

        li {
        }

        li:not(:last-of-type) {
            ${tw`mr-4`}
        }

        svg {
            ${tw`width[22px] height[22px]`}

            &:first-of-type {
                ${tw`margin-right[14px]`}
            }
            &:last-of-type {
                ${tw`margin-left[14px]`}
            }
        }
    }
`;
