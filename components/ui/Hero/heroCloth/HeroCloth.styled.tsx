// import styled from "@emotion/styled";
import styled from "@emotion/styled";
import tw from "twin.macro";

// BUG: I need to import EffectButton as default or else It doesn't work
//      re-exporting is creating an error where EffectButton is not defined
import EffectButton from "@components/ui/EffectButton/EffectButton";

interface Props {
    isSelected: boolean;
}

export const Root = styled.div`
    ${tw`flex flex-col height[92vh]`}
`;

export const HeroImageWrapper = styled.div`
    ${tw`relative height[55%]`}
`;

export const HeroInfo = styled.div`
    ${tw`relative flex flex-col height[45%] padding[8vw 4vw 16vw] bg-accents-3 tracking-tighter`}

    & > h1 {
        ${tw`mb-1 font-family["Whyte Inktrap"] font-size[45px] leading-tight`}
    }

    & > span {
        ${tw`mb-auto max-width[60vw]`}
    }
`;

export const DecorationTop = styled.span`
    ${tw`absolute block bottom[10vw] right[4vw] 
    height[6vw] width[25vw] p-0 bg-accents-5 
    xs:height[5vw]`}

    ${tw`md:(height[2rem] width[21vw] bottom[4.5rem])`}

    transform: skewY(-10deg);
`;

export const DecorationBottom = styled(DecorationTop)`
    ${tw`bottom[6.5vw] right[6vw] opacity-70 bg-orange-red
    md:bottom[3rem]`}
`;

export const HeroBtn = styled(EffectButton)<Props>`
    ${tw`margin-top[10vw] md:margin-top[5.5vw]`}
`;
