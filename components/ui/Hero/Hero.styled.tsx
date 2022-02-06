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

export const Root = styled.div``;

export const HeroContainer = styled.div`
    ${tw`flex flex-col height[92vh]
    lg:(flex-row max-height[75vw])`}
`;

export const HeroImageWrapper = styled.div`
    ${tw`relative height[55%]
    md:height[50%]
    lg:(h-full w-2/3)`}

    & > span {
        filter: brightness(0.85);
    }
`;

export const HeroInfo = styled.div<Props>`
    ${tw`relative flex flex-col height[45%] padding[8vw 4vw 16vw] tracking-tighter
    md:height[50%]
    lg:(h-full w-1/3 padding[13vw 2vw 5vw] whitespace-pre-line)`}

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
        ${tw`mb-1 font-family["Whyte Inktrap"] font-size[45px] leading-tight
        break-words hyphens[auto]
        lg:(mr-10 mb-3 font-size[56px] line-height[1.05])
        xl:(font-size[75px])
        2xl:(font-size[5.2vw])`}
    }

    & > span {
        ${tw`mb-auto max-width[60vw]
        xl:(font-size[18px])`}
    }
`;

export const HeroBtn = styled(EffectButton)`
    ${tw`margin-top[10vw] md:margin-top[5.5vw]
    xl:(font-size[18px])`}
`;

export const DecorationTop = styled.span<Props>`
    ${tw`absolute block bottom[10vw] right[4vw] 
    height[6vw] width[25vw] p-0 
    xs:height[5vw]`}

    ${tw`md:(height[2rem] width[21vw] bottom[4.5rem])
    lg:(width[10rem] top[3.5rem] right[2vw])`}

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

export const DecorationBottom = styled(DecorationTop)`
    ${tw`bottom[6.5vw] right[6vw]
    md:bottom[3rem]
    lg:(top[3rem] right[4vw])`}

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

const primaryFontSize = css`
    ${tw`font-family[Whyte Inktrap] font-size[14vw] letter-spacing[-0.05em]
    sm:font-size[5.5rem]
    md:font-size[6.5rem]
    lg:(font-size[10vw])
    3xl:font-size[10.5rem]`}
`;

export const HeroMessage = styled.div`
    ${tw`flex flex-col items-center padding[5rem 0 8vw]
    lg:padding[7rem 0 2.5vw]`}

    span {
        ${tw`margin-bottom[2vw] text-lg
        md:text-xl
        lg:(margin-bottom[0vw] text-2xl)
        3xl:font-size[1.5rem]`}
    }

    h1 {
        ${primaryFontSize}
    }
`;
