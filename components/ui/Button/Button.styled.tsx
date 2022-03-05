import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isLoading: boolean;
}

export const Root = styled.button<Props>`
    ${tw`flex items-center justify-center w-full 
    shadow-lg rounded-sm bg-secondary  
    text-accents-1 text-center leading-6 capitalize cursor-pointer`}

    transition: background 0.5s cubic-bezier(0.19, 1, 0.22, 1),
        color 0.5s cubic-bezier(0.19, 1, 0.22, 1);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${tw`text-primary`}
            background-color: white;
        }
    }

    &:focus {
        ${tw`outline-none`}
    }

    @media (hover: hover) and (pointer: fine) {
        &:active {
            ${tw`bg-accents-2 text-primary`}
        }
    }

    ${(props) =>
        props.isLoading &&
        css`
            ${tw`bg-accents-1 text-accents-3 border-accents-2 cursor-not-allowed`}
        `}
`;

// export const Rooted = Root.withComponent(`a`);

// .root {
//     @apply bg-secondary text-accents-1 cursor-pointer inline-flex px-10 rounded-sm leading-6
//     transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center
//     uppercase py-4 border border-transparent items-center;
// }

// .root:hover {
//     @apply bg-accents-0 text-primary border border-secondary;
// }

// .root:focus {
//     @apply outline-none;
// }

// .root[data-active] {
//     @apply bg-gray-600;
// }

// .loading {
//     @apply bg-accents-1 text-accents-3 border-accents-2 cursor-not-allowed;
// }
