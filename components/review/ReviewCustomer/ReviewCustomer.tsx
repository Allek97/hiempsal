import RatingStyle from "@components/elements/RatingStyle";
import { FC, useEffect, useMemo, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import {
    ReviewOverview,
    CustomerReview,
    ReviewIdentification,
    ReviewContainer,
    ReviewField,
    ReviewPagination,
} from "./ReviewCustomer.styled";

const ReviewCustomer: FC = () => {
    const itemsPerPage = 4;
    const items: number[] = useMemo(() => Array.from(Array(100).keys()), []);

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState<number[]>(items);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, items, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    // console.log(currentItems);
    console.log(items);

    return (
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
            {currentItems &&
                currentItems.map((el) => (
                    <CustomerReview
                        animate={{
                            opacity: [0, 1],
                            transition: { ease: "easeIn" },
                        }}
                        key={el}
                    >
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
                            <RatingStyle size="small" value={el % 5} />
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
        </ReviewContainer>
    );
};

export default ReviewCustomer;
