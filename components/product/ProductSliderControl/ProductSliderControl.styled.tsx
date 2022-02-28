import styled from "@emotion/styled";
import tw from "twin.macro";

interface ControlBtnProps {
    direction: "left" | "right";
}

export const Root = styled.div`
    ${tw``}
`;

export const ControlBtn = styled.button<ControlBtnProps>``;
