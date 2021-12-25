/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

export const Root = styled.div<any>`
    ${tw`relative h-full mx-auto`}
    max-width: 153.75rem; // 2460px
    color: ${theme`textColor[base]`};
`;

export const Fit = styled.main`
    min-height: calc(100vh - 5.5rem);
`;
