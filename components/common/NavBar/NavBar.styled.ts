import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`sticky top-0 z-50 bg-primary`}
`;

export const Navigation = styled.nav`
    ${tw`flex`}
`;

export const LogoWrapper = styled.div`
    ${tw`transition-transform h-9 w-9 cursor-pointer`}

    svg {
        ${tw`w-full h-full`}
    }

    &:hover {
        transform: scale(1.05);
    }
`;

export const NavbarItem = styled.span`
    ${tw`transition-transform text-lg text-accents-6 cursor-pointer`}

    &:hover {
        ${tw`text-accents-9`}
        transform: skew(-10deg);
    }
`;

export const HiemsalWrapper = styled.div`
    ${tw`w-52 m-auto cursor-pointer`}

    svg {
        ${tw`w-full h-full`}
    }
`;

export const UtilWrapper = styled.div`
    ${tw`flex items-center space-x-5`}

    svg {
        ${tw`cursor-pointer transition-colors hover:text-accents-6`}
    }
`;

export const Profile = styled.div`
    ${tw`inline-block h-8 w-8 rounded-full border-2 border-primary 
    hover:border-secondary 
    focus:border-secondary transition-colors ease-linear`}

    background-image: linear-gradient(140deg, rgb(121, 40, 202), rgb(121, 255, 225) 100%);
`;
