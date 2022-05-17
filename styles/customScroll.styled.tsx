import { css } from "@emotion/react";

const customScroll = css`
    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 0px;
    }

    &::-webkit-scrollbar-track {
        background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--accents-5);
        /* box-shadow: inset 0 0 6px RGBA(0, 0, 0, 0.5); */
        border-radius: 0px;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
        background-color: var(--accents-5);
    }

    .scroller {
        overflow-y: scroll;
        scrollbar-color: var(--accents-5) var(--accents-6);
    }
`;

export default customScroll;
