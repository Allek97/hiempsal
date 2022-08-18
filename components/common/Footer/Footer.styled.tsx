import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { EffectButton } from "@components/ui";
import { transientOptions } from "@lib/transientOptions";

const paddingY = css`
    ${tw`padding-top[8vw] padding-bottom[32vw]`}
`;

const fontFooterMain = css`
    ${tw`font-size[16px] tracking-tight
    lg:(font-size[15px])
    2lg:(font-size[1.4vw])`}

    ${tw`2xl:font-size[25px]`}
`;

export const Container = styled.footer`
    ${tw`block bg-black-blue`}

    ${paddingY}
    ${({ theme }) => theme.layout.mainPadding}
`;

export const FooterUtilityBox = styled.div`
    ${tw`flex flex-wrap items-center justify-center
    padding[8vw 0]`}
`;

export const FooterUtility = styled.div`
    ${tw`flex flex-col items-center justify-center margin-bottom[12vw]
    w-1/2 text-white`}

    button {
        ${tw`flex items-center justify-center width[50px] height[50px] 
        margin-bottom[1em] border-radius[50%] background-color[#303851]`}

        box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);

        svg {
            fill: white;
            ${tw`h-5 w-5`}
        }
    }

    & > span {
        &:first-of-type {
            ${fontFooterMain}
            ${tw`margin-bottom[0.5em]`}
        }
        &:nth-of-type(2) {
            ${({ theme }) => theme.textSize.textSizeSmall}
            ${tw`text-accents-4 font-bold tracking-normal 
            lg:tracking-normal`}
        }
    }
`;

export const FooterNavigation = styled.nav`
    ${tw`margin-bottom[8vw] text-white`}
    ${fontFooterMain}
`;

export const FooterNavBtn = styled(EffectButton, transientOptions)`
    ${tw`py-4 border-b border-accents-6 border-solid text-secondary
    `}

    ${({ theme }) => theme.textSize.textSizeHeader}

    &:first-of-type {
        ${tw`border-t`}
    }
`;

export const FooterInfo = styled.div`
    ${tw`block margin-bottom[8vw]`}

    h3 {
        ${tw`margin-bottom[1em] text-accents-4 font-bold`}
        ${({ theme }) => theme.textSize.textSizeSmall}
    }

    p {
        ${tw`text-secondary leading-tight 
        lg:leading-tight`}

        ${fontFooterMain}
    }
`;

export const FooterSocialBox = styled.div`
    ${tw`flex margin-bottom[8vw]`}

    div {
        ${tw`flex flex-col w-1/2`}

        h3 {
            ${tw`margin-bottom[1.5em] text-accents-4 font-bold`}
            ${({ theme }) => theme.textSize.textSizeSmall}
        }
    }
`;

export const FooterSocialBtn = styled(EffectButton, transientOptions)`
    ${tw`margin-bottom[0.6em] text-secondary`}
    ${fontFooterMain}
`;

export const FooterLocation = styled.div`
    ${tw`flex items-center w-max margin-bottom[16vw]`}

    svg {
        fill: white;
        ${tw`w-auto h-6`}

        path {
            fill: white;
        }
    }

    & > div {
        ${tw`flex flex-col margin-left[1vw]`}

        span {
            &:first-of-type {
                ${tw`text-secondary`}
            }
            &:nth-of-type(2) {
                ${tw`text-accents-5`}
                ${({ theme }) => theme.textSize.textSizeSmall}
            }
        }
    }
`;

export const FooterSub = styled.nav`
    ${tw`flex justify-center flex-wrap w-full text-secondary`}

    ${({ theme }) => theme.textSize.textSizeSmall}

    button {
        &:not(:last-of-type) {
            ${tw`margin-right[2.5vw]`}
        }
    }
`;
