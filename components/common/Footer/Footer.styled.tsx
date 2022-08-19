import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { EffectButton } from "@components/ui";

const paddingY = css`
    ${tw`padding-top[8vw] padding-bottom[32vw]
    md:(padding-top[4vw] padding-bottom[24vw])
    lg:(padding-top[7.5vw] padding-bottom[10vw])
    xl:padding-bottom[7vw]`}
`;

const fontFooterMain = css`
    ${tw`font-size[16px] tracking-tight
    lg:(font-size[15px])
    2lg:(font-size[1.4vw])`}

    ${tw`2xl:font-size[25px]`}
`;
const fontFooterNav = css`
    ${tw`font-size[25px] tracking-tight
    lg:(font-size[22.5px])
    2lg:(font-size[2vw])`}

    ${tw`2xl:font-size[30px]`}
`;

export const FooterContainer = styled.footer`
    ${tw`block bg-black-blue
    lg:(flex items-start flex-wrap justify-between)`}

    ${paddingY}
    ${({ theme }) => theme.layout.mainPadding}
`;

export const FooterUtilityBox = styled.div`
    ${tw`flex flex-wrap items-center justify-center 
    mx-auto 
    lg:(width[60%] mx-0)
    xl:(width[45%])`}

    ${tw`padding[8vw 0] 
    md:padding[4vw 0]
    lg:p-0`}
`;

export const FooterUtility = styled.div`
    ${tw`flex flex-col items-center justify-center w-1/2 text-white`}
    ${tw`margin-bottom[12vw] 
    md:margin-bottom[8vw]
    lg:(justify-start flex-row margin-bottom[4.5vw])`}

    button {
        ${tw`flex items-center justify-center width[50px] height[50px] 
        margin-bottom[1em] border-radius[50%] background-color[#303851]
        lg:(width[70px] height[70px] mb-0 margin-right[1.33vw])`}

        box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);

        svg {
            fill: white;
            ${tw`h-5 w-5`}
        }
        // BUG Weird behaviour if I dont include &
        & {
            @media (hover: hover) and (pointer: fine) {
                transition: background-color 0.2s;
                &:hover {
                    background-color: transparent;
                    transition: background-color 0.2s ease-in-out;
                }
            }
        }
    }

    span {
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
    ${tw`margin-bottom[8vw] text-white 
    lg:(width[40%])
    xl:(width[35%])`}
    ${fontFooterNav}
`;

export const FooterNavBtn = styled(EffectButton)`
    ${tw`padding[0.7em 0] border-b border-accents-6 border-solid text-secondary`}

    &:first-of-type {
        ${tw`border-t`}
    }
`;

export const FooterDescription = styled.div`
    ${tw`block lg:flex`}
`;

export const FooterInfo = styled.div`
    ${tw`block margin-bottom[8vw] 
    md:width[85%]
    lg:(width[50%] mb-0)
    xl:width[45%]`}

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
    ${tw`flex margin-bottom[8vw]
    lg:(ml-auto width[40%] mb-0)
    xl:width[35%]`}

    div {
        ${tw`flex flex-col w-1/2`}

        h3 {
            ${tw`margin-bottom[1.5em] text-accents-4 font-bold`}
            ${({ theme }) => theme.textSize.textSizeSmall}
        }
    }
`;

export const FooterSocialBtn = styled(EffectButton)`
    ${tw`margin-bottom[0.6em] text-secondary`}
    ${fontFooterMain}
`;

export const FooterLocation = styled.div`
    ${tw`flex items-center margin-bottom[16vw]
    lg:mb-24`}

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
    ${tw`flex justify-center flex-wrap w-max text-secondary
    lg:(justify-start width[50%])
    xl:width[45%]`}

    ${({ theme }) => theme.textSize.textSizeSmall}

    button {
        &:not(:last-of-type) {
            ${tw`margin-right[2.5vw]`}
        }
    }
`;

export const FooterPayments = styled.div`
    ${tw`display[none] 
    lg:(flex items-center justify-start flex-wrap 
        width[40%] ml-auto text-secondary)
    xl:width[35%]`}
`;

export const MoreBtn = styled(EffectButton)`
    ${fontFooterMain}

    @media (hover: hover) and (pointer: fine) {
        svg {
            transition: transform 0.2s;
        }

        &:hover > svg {
            transform: translateX(5px);
            transition: transform 0.2s ease-in-out;
        }
    }
`;
