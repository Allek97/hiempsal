import styled from "@emotion/styled";
import { Question } from "@framework/types/question";
import { FC } from "react";
import { MdHouseboat } from "react-icons/md";
import tw from "twin.macro";
import { CustomerContainer, ReviewIdentification } from "./Customer.styled";

interface Props {
    question: Question;
}
const Container = styled.div`
    ${tw`block mt-5 leading-tight`}
`;

export const CustomerQuestions: FC<Props> = ({ question }) => {
    return (
        <Container>
            <div className="mb-4 text-accents-7">
                <p>Q: {question.question}</p>
            </div>

            {question.answer && (
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
                                <span className="capitalize">
                                    Hiempsal Team
                                </span>
                            </div>
                        </ReviewIdentification>
                        <div className="mt-4 text-accents-7">
                            <p className="whitespace-pre-line">
                                A: {question.answer}
                            </p>
                        </div>
                    </div>
                </CustomerContainer>
            )}
        </Container>
    );
};
