import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface UserlistBtnProps {
    isWishlist: boolean;
    isAddedToWishlist: boolean;
}

export const Root = styled.li`
    ${tw`width[calc(50% - 1vw)] margin[1vw 0 10vw]
    lg:(width[calc(50% - 0.75rem)] margin[1vw 0 5.5vw])`}
`;

export const UserlistProduct = styled.article`
    ${tw`flex flex-col`}
`;

export const UserlistImageWrapper = styled.div`
    ${tw`flex justify-center items-center mx-3`}

    width: 70%;
    /* max-width: 14rem; */

    & > div:first-of-type {
        ${tw`w-full mx-4 xs:mx-8`}
    }
`;

/////////////////////////////////////////////
// Userlist product information
/////////////////////////////////////////////

export const UserlistInfo = styled.div`
    ${tw`relative flex flex-col padding[2vw 2vw 0]
    lg:p-0`}

    h3 {
        ${tw`width[calc(100% - 5vw)] margin[0.8vw 0] font-size[13px] tracking-tighter cursor-pointer
        lg:(font-size[18.5px] mt-4 mb-2.5 leading-5)
        xl:font-size[1.45vw]
        3xl:(font-size[23.5px])`}
    }

    span {
        ${tw`margin-bottom[3.2vw] font-size[12px] tracking-tighter
        lg:(mb-8 font-size[13px])
        xl:font-size[1.1vw]
        3xl:(font-size[17.5px])`}
    }
`;

export const UserlistBtn = styled.button<UserlistBtnProps>`
    ${tw`padding-top[1vw] margin-top[0.8vw] font-size[1.3em] cursor-pointer
    lg:(mt-4 pt-1)`}

    svg {
        ${(props) =>
            props.isWishlist &&
            css`
                fill: red;
            `}

        ${(props) =>
            !props.isWishlist &&
            css`
                fill: ${props.isAddedToWishlist ? "red" : "currentColor"};
            `}
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover svg {
        transform: scale(0.9);
    }
`;

export const UserlistBonus = styled.div`
    ${tw`flex items-center font-size[12px] cursor-pointer
    lg:(font-size[13px])
    xl:font-size[1.1vw]
    3xl:(font-size[17.5px])`}

    svg {
        ${tw`ml-1 mr-2 font-size[15px]
        xl:font-size[1.2vw]
        3xl:(font-size[21px])`}
    }

    p {
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover p {
        transform: skewX(-10deg);
    }
`;

export const AddToCartBtn = styled(Button)`
    ${tw`padding-top[3.7vw] padding-bottom[3.7vw] margin[4vw 0] border border-accents-1 bg-white 
    text-primary font-size[14px] tracking-tighter 
    lg:(my-7 py-7 font-size[15px])
    xl:font-size[1.15vw]
    3xl:(font-size[19px])`}

    box-shadow: 1px 1px 3px rgb(0 0 0 / 14%);
`;
