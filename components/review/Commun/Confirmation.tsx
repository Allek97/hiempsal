import styled from "@emotion/styled";
import { FC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import tw from "twin.macro";

interface Props {
    isReview?: boolean;
}

const Container = styled.div`
    ${tw`relative flex flex-col items-center width[80%] mx-auto py-12
     text-center
     sm:width[40%]
     lg:width[80%]`}

    h2 {
        ${tw`font-size[21px]`}
    }

    span {
        ${tw`font-size[14px] text-accents-6`}
    }
`;
const SocialContainer = styled.div`
    ${tw`flex items-center`}

    a {
        &:not(:last-of-type) {
            ${tw`mr-2`}
        }

        svg {
            ${tw`h-7 w-7 fill[var(--accents-7)]`}
            transition: fill 0.3s ease;
        }

        @media (hover: hover) and (pointer: fine) {
            &:hover svg {
                ${tw`fill[var(--accents-9)]`}
                transition: fill 0.3s ease;
            }
        }
    }
`;
const CloseWrapper = styled.div`
    ${tw`flex items-center`}

    svg {
        ${tw`absolute top-0 right-0 h-6 w-6 fill[var(--accents-7)] cursor-pointer`}
        transition: fill 0.3s ease;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover svg {
            ${tw`fill[var(--accents-4)]`}
            transition: fill 0.3s ease;
        }
    }
`;

const Confirmation: FC<Props> = ({ isReview = true }) => {
    return (
        <div className="px-8">
            <Container>
                <CloseWrapper>
                    <IoClose />
                </CloseWrapper>
                <div className="mb-2">
                    <AiFillHeart
                        className="h-7 w-7"
                        style={{ fill: "var(--orange-red)" }}
                    />
                </div>
                <h2 className="mb-3 font-bold">
                    Thank you for posting a {isReview ? "review" : "question"}!
                </h2>
                <span className="mb-3">
                    We value your input. Share your{" "}
                    {isReview ? "review" : "question"} so everyone else can
                    enjoy it too. We appreciate your efforts !
                </span>
                <SocialContainer>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebookSquare />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitterSquare />
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </a>
                </SocialContainer>
            </Container>
        </div>
    );
};

Confirmation.defaultProps = {
    isReview: true,
};

export default Confirmation;
