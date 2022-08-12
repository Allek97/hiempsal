import RatingStyle from "@components/elements/RatingStyle";
import { Review } from "@framework/types/review";
import { FC, useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import {
    CustomerContainer,
    ReviewIdentification,
    ReviewContainer,
    ReviewPagination,
    EmptyReviews,
} from "./Customer.styled";
import { CustomerQuestions } from "./Questions";
import { CustomerReviews } from "./Reviews";

interface Props {
    data: Review[];
    type: "review" | "question";
}

const Customer: FC<Props> = ({ data, type }) => {
    const itemsPerPage = 4;

    const [currentItems, setCurrentItems] = useState<Review[]>(data ?? []);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, data, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;

        setItemOffset(newOffset);
    };

    return (
        <ReviewContainer>
            {!data.length ? (
                <EmptyReviews>
                    <h1 className="text-md text-accents-6">
                        Be the first to engage with us and share your experience
                    </h1>
                </EmptyReviews>
            ) : (
                <>
                    {currentItems &&
                        currentItems.map((review) => (
                            <CustomerContainer
                                animate={{
                                    opacity: [0, 1],
                                    transition: { ease: "easeIn" },
                                }}
                                key={review.email}
                            >
                                <div className="flex">
                                    <ReviewIdentification>
                                        <div>
                                            <span>
                                                {review.name[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="capitalize">
                                                {review.name.split(" ")[0]}
                                            </span>
                                            <span>Verified Buyer</span>
                                        </div>
                                    </ReviewIdentification>
                                    {type === "review" && (
                                        <RatingStyle
                                            customSize="small"
                                            value={review.score}
                                        />
                                    )}
                                </div>
                                {type === "review" ? (
                                    <CustomerReviews review={review} />
                                ) : (
                                    <CustomerQuestions question={review} />
                                )}
                            </CustomerContainer>
                        ))}
                    <ReviewPagination>
                        <ReactPaginate
                            breakLabel=""
                            nextLabel={<RiArrowRightSLine />}
                            previousLabel={<RiArrowLeftSLine />}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={0}
                            pageCount={pageCount}
                            renderOnZeroPageCount={() => null}
                            pageClassName="review-page-item"
                            pageLinkClassName="review-page-link"
                            previousClassName="review-page-item"
                            previousLinkClassName="review-page-link"
                            nextClassName="review-page-item"
                            nextLinkClassName="review-page-link"
                            breakClassName="review-page-item"
                            breakLinkClassName="review-page-link"
                            containerClassName="review-pagination"
                            activeClassName="active"
                            disabledClassName="disabled"
                        />
                    </ReviewPagination>
                </>
            )}
        </ReviewContainer>
    );
};

export default Customer;
