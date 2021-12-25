import styled from "@emotion/styled";
import tw from "twin.macro";

export const MobileMenuRoot = styled.nav`
    ${tw`fixed bottom-4 left-1/2 z-50 w-12 h-12`}
    transform: translateX(-50%);
`;

export const MenuBtn = styled.button`
    ${tw`absolute z-10 flex items-center justify-center w-full h-full 
        border-radius[50%] bg-primary hover:text-accents-6`};

    box-shadow: var(--shadow-2);

    svg {
        ${tw`h-6 w-6`}
    }
`;

export const Navigation = styled.nav`
    ${tw`absolute top-0 flex items-center h-full w-full bg-primary`}

    box-shadow: var(--shadow-0);
    border-radius: 50%;
`;

export const Cart = styled.div`
    ${tw`absolute left-1/2 w-20 h-10 flex items-center rounded-3xl opacity-100 bg-primary`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(100%); */
    box-shadow: var(--shadow-1);

    button {
        ${tw`transition-colors ml-auto mr-5 hover:text-accents-6`}
    }
`;

export const Profile = styled.div`
    ${tw`absolute -left-full w-20 h-10 flex items-center rounded-3xl opacity-100 bg-primary`}

    // BUG: translate-x not working in tailwind
    /* transform: translateX(-100%); */
    box-shadow: var(--shadow-1);

    button {
        ${tw`transition-colors mr-auto ml-3.5 hover:text-accents-6`}

        svg {
            ${tw`h-6 w-6`}
        }
    }
`;
