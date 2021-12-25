import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.main`
    ${tw`fixed inset-0 z-40 h-full overflow-hidden`}
`;

export const Container = styled.div`
    ${tw`flex flex-1 flex-col overflow-hidden`}
`;

export const Navigation = styled.section`
    ${tw`pt-20 px-8 text-2xl text-primary`}

    background : var(--primary);
`;
export const Content = styled.section`
    ${tw`flex max-w-full min-h-screen px-8 outline-none`}

    background : var(--primary);
`;

export const Article = styled.article`
    ${tw`h-full w-screen lg:max-w-4xl px-12 shadow-xl text-base overflow-y-auto`}
`;
