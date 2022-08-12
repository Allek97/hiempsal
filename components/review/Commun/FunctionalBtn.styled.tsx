import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { mainFont3 } from "./typography";

interface FunctionalProps {
    $isSelected: boolean;
}

export const FunctionalBtn = styled(Button)<FunctionalProps>`
    ${tw`padding-top[15px] padding-bottom[15px] border-radius[3px]`}
    ${mainFont3}
    box-shadow: 0.785217px 0.785217px 3.14087px rgb(0 0 0 / 28%);

    ${({ $isSelected }) =>
        $isSelected
            ? css`
                  ${tw`bg-secondary text-secondary`}
              `
            : css`
                  ${tw`bg-primary text-primary`}
              `}

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${({ $isSelected }) =>
                $isSelected
                    ? css`
                          ${tw`bg-primary text-primary`}
                      `
                    : css`
                          ${tw`bg-secondary text-secondary`}
                      `}
        }

        &:focus {
            ${tw`outline-none`}
        }
    }

    svg {
        ${tw`display[none]
        md:(block h-4 w-4 mr-3)
        lg:display[none]`}
    }
`;
