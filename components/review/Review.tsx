import { FC } from "react";
import { Container } from "@components/product/ProductInformation/commun";
import RatingStyle from "@components/elements/RatingStyle";

import {
    Header,
    ReviewContainer,
    ReviewOverview,
    UtilBtn,
    CustomerReview,
    ReviewIdentification,
    ReviewField,
} from "./Review.styled";
import { useReview } from "./context";

// NOTE This component will sit beside <ProductInformation /> component
const Review: FC = () => {
    const { isReviewOpen, openReview, closeReview } = useReview();

    return (
        <Container>
            <Header>
                <UtilBtn
                    type="button"
                    $isSelected={isReviewOpen}
                    onClick={openReview}
                >
                    Reviews
                </UtilBtn>
                <UtilBtn
                    type="button"
                    $isSelected={!isReviewOpen}
                    onClick={closeReview}
                >
                    Questions
                </UtilBtn>
            </Header>
            <ReviewContainer>
                <ReviewOverview>
                    <span className="mr-3">4.7</span>
                    <div className="flex flex-col self-center mt-2.5">
                        <RatingStyle size="large" value={4.3} />
                        <span className="text-xs tracking-normal text-accents-6 mt-2">
                            5 Reviews
                        </span>
                    </div>
                </ReviewOverview>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((el) => (
                    <CustomerReview key={el}>
                        <div className="flex">
                            <ReviewIdentification>
                                <div>
                                    <span>I</span>
                                </div>
                                <div>
                                    <span>Ilias</span>
                                    <span>Verified Buyer</span>
                                </div>
                            </ReviewIdentification>
                            <RatingStyle size="small" value={4.3} />
                        </div>
                        <div>
                            <div>
                                <ReviewField>
                                    <span>Fit:</span>
                                    <span>True to size</span>
                                </ReviewField>
                                <ReviewField>
                                    <span>Quality:</span>
                                    <span>Nice quality</span>
                                </ReviewField>
                                <ReviewField>
                                    <span>Durability:</span>
                                    <span>Very durable</span>
                                </ReviewField>
                            </div>
                            <div className="mb-4">
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Ducimus dolore placeat
                                    molestias necessitatibus? Expedita adipisci
                                    pariatur, provident quidem veniam temporibus
                                    blanditiis? Dignissimos odio et iure! Aut
                                    doloremque harum tempore minima. Lorem
                                    ipsum, dolor sit amet consectetur
                                    adipisicing elit. Enim, ad vero numquam
                                    autem iure quaerat nobis soluta molestiae
                                    placeat maxime mollitia eum, consectetur
                                    voluptas. Eum ipsum odit sed numquam odio?
                                </p>
                            </div>
                        </div>
                    </CustomerReview>
                ))}
            </ReviewContainer>
        </Container>
    );
};

export default Review;
