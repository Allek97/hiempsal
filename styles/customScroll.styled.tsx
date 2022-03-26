import { css } from "@emotion/react";

const customScroll = css`
    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--accents-4);
        /* box-shadow: inset 0 0 6px RGBA(0, 0, 0, 0.5); */
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
        background-color: var(--accents-4);
    }
`;

export default customScroll;
