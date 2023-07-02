import styled from "@emotion/styled";
import { Review } from "@framework/types/review";
import { FC } from "react";
import tw from "twin.macro";
import { ReviewField } from "./Customer.styled";

interface Props {
    review: Review;
}

const Container = styled.div`
    ${tw`md:(flex justify-between mt-5)
    lg:(block mt-0)`}

    & > div:first-of-type {
        ${tw`flex flex-col mt-4 mb-6 w-max whitespace-nowrap
        md:(ml-40 my-0 order-2)
        lg:(order-1 w-auto ml-0 mt-4 mb-6)`}
    }
`;

export const CustomerReviews: FC<Props> = ({ review }) => {
    return (
        <Container>
            {review.productType === "clothing"
                ? review.clothChecks && (
                      <div>
                          <ReviewField>
                              <span>Fit:</span>
                              <span>{review.clothChecks.fit}</span>
                          </ReviewField>
                          <ReviewField>
                              <span>Quality:</span>
                              <span>{review.clothChecks.integrity}</span>
                          </ReviewField>
                          <ReviewField>
                              <span>Durability:</span>
                              <span>{review.clothChecks.durability}</span>
                          </ReviewField>
                      </div>
                  )
                : review.techChecks && (
                      <div>
                          <ReviewField>
                              <span>Battery life:</span>
                              <span>{review.techChecks.battery}</span>
                          </ReviewField>
                          <ReviewField>
                              <span>Design:</span>
                              <span>{review.techChecks.design}</span>
                          </ReviewField>
                          <ReviewField>
                              <span>Performance:</span>
                              <span>{review.techChecks.performance}</span>
                          </ReviewField>
                          <ReviewField>
                              <span>Usability:</span>
                              <span>{review.techChecks.usability}</span>
                          </ReviewField>
                      </div>
                  )}

            <div className="mb-4">
                <h2 className="font-bold mb-4">{review.title}</h2>
                <p className="whitespace-pre-line">{review.review}</p>
            </div>
        </Container>
    );
};
