import RatingStyle from "@components/elements/RatingStyle";
import { Review } from "@framework/types/review";
import { FC, useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import {
    CustomerContainer,
    ReviewIdentification,
    ReviewContainer,
    ReviewField,
    ReviewPagination,
    EmptyReviews,
} from "./CustomerReviews.styled";

interface Props {
    reviews: Review[];
    isEmpty: boolean;
}

const CustomerReviews: FC<Props> = ({ reviews, isEmpty }) => {
    const itemsPerPage = 4;

    const [currentItems, setCurrentItems] = useState<Review[]>(reviews ?? []);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(reviews.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(reviews.length / itemsPerPage));
    }, [itemOffset, reviews, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % reviews.length;

        setItemOffset(newOffset);
    };

    return (
        <ReviewContainer>
            {isEmpty ? (
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
                                    <RatingStyle
                                        customSize="small"
                                        value={review.score}
                                    />
                                </div>
                                <div>
                                    {review.productType === "clothing"
                                        ? review.clothChecks && (
                                              <div>
                                                  <ReviewField>
                                                      <span>Fit:</span>
                                                      <span>
                                                          {
                                                              review.clothChecks
                                                                  .fit
                                                          }
                                                      </span>
                                                  </ReviewField>
                                                  <ReviewField>
                                                      <span>Quality:</span>
                                                      <span>
                                                          {
                                                              review.clothChecks
                                                                  .integrity
                                                          }
                                                      </span>
                                                  </ReviewField>
                                                  <ReviewField>
                                                      <span>Durability:</span>
                                                      <span>
                                                          {
                                                              review.clothChecks
                                                                  .durability
                                                          }
                                                      </span>
                                                  </ReviewField>
                                              </div>
                                          )
                                        : review.techChecks && (
                                              <div>
                                                  <ReviewField>
                                                      <span>Fit:</span>
                                                      <span>
                                                          {
                                                              review.techChecks
                                                                  .fit
                                                          }
                                                      </span>
                                                  </ReviewField>
                                                  <ReviewField>
                                                      <span>Quality:</span>
                                                      <span>
                                                          {
                                                              review.techChecks
                                                                  .integrity
                                                          }
                                                      </span>
                                                  </ReviewField>
                                                  <ReviewField>
                                                      <span>Durability:</span>
                                                      <span>
                                                          {
                                                              review.techChecks
                                                                  .durability
                                                          }
                                                      </span>
                                                  </ReviewField>
                                              </div>
                                          )}

                                    <div className="mb-4">
                                        <h2 className="font-bold mb-4">
                                            {review.title}
                                        </h2>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
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

export default CustomerReviews;
