import styled from "@emotion/styled";

import tw from "twin.macro";

export const Root = styled.aside`
    ${tw`relative block`}
`;

export const Overlay = styled.div`
    ${tw`fixed inset-0 z-index[95] bg-accents-9 opacity-40 pointer-events-auto`}

    cursor: url(/close-cursor-image.svg), pointer;
`;
