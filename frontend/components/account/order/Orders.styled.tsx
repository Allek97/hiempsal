import { Button } from "@components/ui";
import styled from "@emotion/styled";
import tw from "twin.macro";

export const OrderContainer = styled.div`
    ${({ theme }) => theme.layout.mainPadding}
    ${tw`mb-10`}
    h2 {
        ${tw`mt-5 mb-10 font-family[Whyte Inktrap] font-size[19px]
        lg:mt-0
        xl:font-size[21px]
        3xl:font-size[23px]`}
    }
`;

export const OrderBox = styled.div`
    ${tw`relative flex flex-col mb-10 bg-accents-1 py-6
    lg:bg-white`}

    ${tw`padding[4vw] 
    md:(padding[3vw])`}
    ${tw`lg:(padding[2vw])`}

    box-shadow: 1px 1px 3px rgb(0 0 0 / 14%);

    h3 {
        ${tw`mb-4 font-bold`}
        ${({ theme }) => theme.textSize.textSizeLarge}
    }
`;

export const OrderContent = styled.div`
    ${tw`flex flex-col items-start mt-8
    md:flex-row`}

    & > div:first-of-type {
        ${tw`flex flex-wrap gap-3 md:mr-10`}
    }
`;

export const OrderImageContainer = styled.div`
    ${tw`relative w-24 h-24 border-radius[3px] bg-accents-4`};

    img {
        padding: 4px !important;
    }
`;

export const DetailBtnWrapper = styled.div`
    ${tw`mt-6 width[60%] max-width[15rem]
     md:(ml-auto mt-auto) 
     lg:mb-0`}

    & > div {
        ${tw`w-full`}
    }
`;

export const DetailBtn = styled(Button)`
    ${tw`padding-top[1em] padding-bottom[1em]
    height[max-content]
    capitalize text-secondary tracking-tighter
    lg:py-4`}

    box-shadow: 1px 1px 3px rgb(0 0 0 / 14%);
    /* ${({ theme }) => theme.textSize.textSizeLarge} */
`;

// NOTE Empty component

export const RootEmpty = styled.div`
    ${tw`flex flex-row items-center justify-center w-full h-full height[40vh] min-height[20rem]
    border-t-2 border-accents-7 
    font-family[Whyte Inktrap] text-2xl text-center letter-spacing[-0.03em]
    md:font-size[1.8rem]
    lg:(height[90vh] border-0 font-size[2.7vw])
    2xl:font-size[2.7rem]`}

    & > h2:first-of-type {
        ${tw`inline-block`}
        ${tw`mb-3 lg:mb-5`}
    }
`;

export const DecorationOneTop = styled.span`
    ${tw`absolute block top[1rem] right[4vw] 
    height[1.7rem] width[8rem] p-0 bg-accents-9`}

    transform: skewY(-10deg);
`;

export const DecorationOneBottom = styled(DecorationOneTop)`
    ${tw`top[2rem] right[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const DecorationTwoTop = styled.span`
    ${tw`absolute block bottom[1rem] left[4vw] 
    height[1.7rem] width[8rem] p-0 bg-accents-9`}

    transform: skewY(-10deg);
`;

export const DecorationTwoBottom = styled(DecorationTwoTop)`
    ${tw`bottom[2rem] left[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const ContainerEmpty = styled.div<Record<string, unknown>>`
    ${tw`relative w-full h-full mb-5
    xl:margin-top[-1.5rem]
    2xl:margin-top[-2.5rem]
    4xl:margin-top[-4.5rem]`}

    ${({ theme }) => theme.layout.mainPadding}
`;
