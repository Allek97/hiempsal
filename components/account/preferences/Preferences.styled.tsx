import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const paddings = css`
    ${tw`padding[0 4vw]
    md:padding[0 16vw]
    lg:padding[0 6.7vw]
    xl:padding[0 12vw]`}
`;

export const textSizeMain = css`
    ${tw`font-size[20px] line-height[1em] tracking-tighter 
    lg:(font-size[30px] line-height[1.5em] letter-spacing[-0.06em])
    2lg:font-size[2.7vw]`}

    ${tw`2xl:font-size[40px]`}
`;
export const textSizeSecondary = css`
    ${tw`font-size[20px] line-height[1em] tracking-tighter 
    lg:(font-size[22.5px] line-height[1.5em] letter-spacing[-0.06em])
    2lg:font-size[2vw]`}

    ${tw`2xl:font-size[30px]`}
`;

export const Container = styled.div`
    ${tw`flex flex-col w-full mb-24
    xl:mb-40`}
    ${paddings}

    & > div {
        h1 {
            ${textSizeMain}
        }
    }

    .notification {
        ${tw`max-width[30rem] width[90%] text-accents-7`}
        ${({ theme }) => theme.textSize.textSizeMedium}
    }
`;

export const MailForm = styled.form`
    ${tw`flex flex-col w-full mb-24 py-5 border-t-2 border-b-2 border-accents-4
    lg:(flex-row justify-between)`}

    h2 {
        ${textSizeSecondary}
    }

    .newsletter,
    .marketing {
        & > span {
            ${({ theme }) => theme.textSize.textSizeSmall}
        }
    }

    ul {
        ${({ theme }) => theme.textSize.textSizeMedium}
    }

    li {
        ${tw`mb-2`}
        &:before {
            content: "·";
            display: inline-block;
            vertical-align: middle;
            font-size: 2em;
        }
    }
`;
