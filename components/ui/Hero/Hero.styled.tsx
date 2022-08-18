// import styled from "@emotion/styled";
import styled from "@emotion/styled";
import tw from "twin.macro";

// BUG: I need to import EffectButton as default or else It doesn't work
//      re-exporting is creating an error where EffectButton is not defined
import EffectButton from "@components/ui/EffectButton/EffectButton";
import { css } from "@emotion/react";

interface Props {
    variant: "clothing" | "technology";
}

const mainTextSize = css`
    ${tw`font-size[45px] line-height[0.95em] letter-spacing[-0.06em] 
    lg:(font-size[52px] letter-spacing[-0.03em])
    xl:font-size[75px]`}

    ${tw`2xl:font-size[5vw]
    4xl:font-size[5.3333333333vw]`}
`;

export const secondaryTextSize = css`
    ${tw`font-size[16px] line-height[1.3em] tracking-tighter 
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[19px]`}
`;

const primaryFontSize = css`
    ${tw`font-family[Whyte Inktrap] font-size[55px] letter-spacing[-0.06em] line-height[0.9em]
    md:font-size[90px]
    lg:line-height[0.85em]
    xl:font-size[120px]
    2xl:font-size[8vw]`}
`;

export const tertiaryFontSize = css`
    ${tw`font-size[17px] line-height[1.15em] tracking-tighter 
    lg:(font-size[15px] letter-spacing[-0.04em])
    2lg:(font-size[1.33333333333vw] line-height[1.3em])`}

    ${tw`2xl:font-size[25px]`}
`;

export const Root = styled.div``;

export const HeroContainer = styled.div`
    ${tw`flex flex-col
    lg:flex-row`}

    @media (min-width: 64em) {
        height: calc(100vh - 40px);
        min-height: calc(45vw);
    }
`;

export const HeroImageWrapper = styled.div`
    ${tw`relative height[98vw]
    md:height[73vw]
    lg:(h-full w-2/3)`}

    span,img {
        filter: brightness(0.85);
    }
`;

export const HeroInfo = styled.div<Props>`
    ${tw`relative flex flex-col padding[8vw 4vw 16vw] tracking-tighter
    md:(padding[8vw 3.75vw 16vw])
    lg:(h-full w-1/3 padding[calc(16vw - 27px) 2.6666666667vw 5.0666666667vw] whitespace-pre-line)`}

    ${(props) =>
        props.variant === "clothing"
            ? css`
                  ${tw`bg-accents-3`}
              `
            : css`
                  background-color: #073068;

                  color: var(--primary);
              `}  

    & > h1 {
        ${tw`mb-3 font-family["Whyte Inktrap"]
        break-words hyphens[auto]
        lg:(mr-6 mb-4)`}

        ${mainTextSize}
    }

    & > span {
        ${tw`mb-7 max-width[60vw]`}

        ${secondaryTextSize}
    }
`;

export const HeroBtn = styled(EffectButton)`
    ${tw``}

    ${({ theme }) => theme.textSize.textSizeMain}

    // Target smartphones, touchscreens, still on W3C draft
    @media (hover: none) and (pointer: coarse) {
        svg {
            ${tw`opacity-100`}
            transform: translateX(0);
        }
        h1 {
            transform: translateX(1.4em);
        }
    }
    // Target desktop ,mouse, touch pad
    @media (hover: hover) and (pointer: fine) {
        &:hover svg {
            opacity: 1;
            transform: none;
        }

        &:hover h1 {
            transform: translateX(1.4em);
        }
    }
`;

export const DecorationBottom = styled.span<Props>`
    ${tw`absolute block bottom[10vw]
    height[6vw] width[25vw] p-0 
    xs:height[5vw]`}

    ${tw`md:(height[2rem] width[21vw] bottom[4.5rem])
    lg:(width[10rem] top[3.5rem])`}


    ${({ theme }) => theme.layout.mainRightAbsolute}

    transform: skewY(-10deg);

    ${(props) =>
        props.variant === "clothing"
            ? css`
                  ${tw`bg-accents-5`}
              `
            : css`
                  ${tw`bg-primary`}
              `}
`;

export const DecorationTop = styled(DecorationBottom)`
    ${tw`bottom[6.5vw] right[7vw]
    md:(bottom[3rem] right[6.75vw])
    lg:(top[3rem] right[5vw])`}

    ${(props) =>
        props.variant === "clothing"
            ? css`
                  ${tw`bg-orange-red opacity-70`}
              `
            : css`
                  background-image: linear-gradient(
                      140deg,
                      rgb(121, 40, 202),
                      rgb(121, 255, 225) 100%
                  );

                  opacity: 85%;
              `}
`;

const heroMessageLayout = css`
    ${tw`padding[20vw 0 8vw]
    md:padding[10vw 0 8vw]
    lg:padding[8.4vw 0 4.6666666667vw]`}
`;

export const HeroMessage = styled.div`
    ${tw`flex flex-col items-center`}

    ${heroMessageLayout}

    span {
        ${tw`margin-bottom[8vw]
        lg:margin-bottom[2vw]`}

        ${tertiaryFontSize}
    }

    h1 {
        ${primaryFontSize}
    }
`;
