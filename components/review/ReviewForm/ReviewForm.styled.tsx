import styled from "@emotion/styled";
import tw from "twin.macro";
import { mainFont } from "../typography";

export const Container = styled.div`
    ${tw`flex flex-col`}

    h2 {
        ${mainFont}
    }
`;
