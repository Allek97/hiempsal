import customScroll from "@assets/customScroll.styled";
import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`fixed z-index[41] h-full w-full flex flex-col padding-top[30vw] pb-20 bg-white overflow-y-auto
    xs:padding-top[23vw]`}

    padding-left : 4.4vw;
    padding-right: 4.4vw;

    @media only screen and (min-width: 40em) {
        padding-top: 18vw;
    }
    @media only screen and (min-width: 48em) {
        padding-top: 8rem;
    }

    ${customScroll}
`;

export const Navigation = styled.nav`
    ${tw`flex flex-col text-3xl text-primary mb-10`}

    button {
        ${tw`padding[4.4vw 0] border-b-2 border-b-accents-3 letter-spacing[-.06em]
        sm:padding[3vw 0]
        md:padding[1.5rem 0]`}

        svg {
            ${tw`text-accents-9`}
        }
    }
`;

export const Complement = styled.div`
    ${tw`flex flex-col text-lg mb-10`}

    button {
        ${tw`w-max py-1 letter-spacing[-.06em]`}

        svg {
            ${tw`text-accents-9`}
        }
    }
`;

export const DecorationTop = styled.span`
    ${tw`absolute block bottom[3vw] right[4.4vw] 
    height[6vw] width[25vw] p-0 bg-accents-5 
    xs:height[5vw]`}

    ${tw`md:(height[2rem] bottom[2.5vw])`}

    transform: skewY(-10deg);
`;

export const DecorationBottom = styled(DecorationTop)`
    ${tw`bottom-0 right[6vw] opacity-70 bg-red
    md:bottom-0`}
`;
