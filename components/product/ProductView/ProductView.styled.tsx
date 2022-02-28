import styled from "@emotion/styled";
import tw from "twin.macro";
import Image from "next/image";
import { css } from "@emotion/react";

export const Root = styled.div`
    ${tw`relative max-w-5xl w-full min-height[auto]`}
`;

const common = css`
    ${tw`w-full h-full max-h-full object-cover`}
`;

export const SliderContainer = styled.div`
    ${common}
    ${tw`flex items-center justify-center overflow-x-hidden bg-orange-red min-height[auto]`}
`;

export const ImageContainer = styled.div`
    ${tw`relative h-full text-center`}
`;

export const ProductImage = styled(Image)`
    ${common}
`;
