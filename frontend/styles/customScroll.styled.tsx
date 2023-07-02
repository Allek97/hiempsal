import { css } from "@emotion/react";

const customScroll = css`
    @media only screen and (min-width: 1024px) {
        &::-webkit-scrollbar {
            width: 7px;
        }

        &::-webkit-scrollbar-track {
            background-color: #fff;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--accents-3);
            /* box-shadow: inset 0 0 6px RGBA(0, 0, 0, 0.5); */
            border-radius: 3rem;
        }

        &::-webkit-scrollbar-thumb:window-inactive {
            background-color: var(--accents-3);
        }

        .scroller {
            overflow-y: scroll;
            scrollbar-color: var(--accents-3) var(--accents-4);
        }
    }
`;

export default customScroll;
