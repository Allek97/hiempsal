import styled from "@emotion/styled";
import { Review } from "@framework/types/review";
import { FC } from "react";
import { MdHouseboat } from "react-icons/md";
import tw from "twin.macro";
import { CustomerContainer, ReviewIdentification } from "./Customer.styled";

interface Props {
    question: Review;
}
const Container = styled.div`
    ${tw`block mt-5 leading-tight`}
`;

export const CustomerQuestions: FC<Props> = ({ question }) => {
    return (
        <Container>
            <div className="mb-4 text-accents-7">
                <p>
                    Q: {question.review} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Sit blanditiis, ducimus odio totam illo
                    modi quis quam natus. Tenetur corrupti ea at architecto
                    reiciendis quis quia dignissimos eaque soluta ipsam?
                </p>
            </div>

            <CustomerContainer
                animate={{
                    opacity: [0, 1],
                    transition: { ease: "easeIn" },
                }}
                key={question.email}
            >
                <div className="flex flex-col">
                    <ReviewIdentification>
                        <div>
                            <span>
                                <MdHouseboat className="w-4 h-4" />
                            </span>
                        </div>
                        <div>
                            <span className="capitalize">Hiempsal Team</span>
                        </div>
                    </ReviewIdentification>
                    <div className="mt-4 text-accents-7">
                        <p className="whitespace-pre-line">
                            A: {question.review} Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Sit blanditiis,
                            ducimus odio totam illo modi quis quam natus.
                            Tenetur corrupti ea at architecto reiciendis quis
                            quia dignissimos eaque soluta ipsam?
                        </p>
                    </div>
                </div>
            </CustomerContainer>
        </Container>
    );
};
