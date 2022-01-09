import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`fixed z-index[41] h-full w-full flex flex-col py-36 bg-white `}

    padding-left: 4.4vw;
    padding-right: 4.4vw;
`;

export const Navigation = styled.nav`
    ${tw`flex flex-col text-3xl text-primary`}

    button {
        ${tw`padding[4vw 0] border-b-2 border-b-accents-3 letter-spacing[-.06em]`}
    }
`;
