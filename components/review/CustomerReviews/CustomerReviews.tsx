import RatingStyle from "@components/elements/RatingStyle";
import { useProduct } from "@components/product/context";
import useReview from "@framework/review/use-review";
import { FC, useEffect, useMemo, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import {
    CustomerContainer,
    ReviewIdentification,
    ReviewContainer,
    ReviewField,
    ReviewPagination,
} from "./CustomerReviews.styled";

const CustomerReviews: FC = () => {
    const { productId } = useProduct();
    const getReview = useReview();

    const { data: reviews, isEmpty } = getReview({ productId: productId });

    const itemsPerPage = 4;
    const items: number[] = useMemo(() => Array.from(Array(100).keys()), []);

    const [currentItems, setCurrentItems] = useState<number[]>(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, items, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;

        setItemOffset(newOffset);
    };

    return (
        <ReviewContainer>
            {currentItems &&
                currentItems.map((el) => (
                    <CustomerContainer
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
                            <RatingStyle customSize="small" value={el % 5} />
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
                                <h2 className="font-bold mb-4">
                                    Fantastic product will recommend
                                </h2>
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
        </ReviewContainer>
    );
};

export default CustomerReviews;
