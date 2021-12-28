import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    isLoading: boolean;
}

export const Root = styled.button<Props>`
    ${tw`flex items-center justify-center w-full p-3.5 
    transition ease-in-out duration-300 shadow-lg rounded-sm bg-secondary 
    text-accents-1 text-center leading-6 capitalize cursor-pointer`}

    &:hover {
        ${tw`bg-accents-0 text-primary`}
    }

    &:focus {
        ${tw`outline-none`}
    }

    &:active {
        ${tw`bg-gray-600`}
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
