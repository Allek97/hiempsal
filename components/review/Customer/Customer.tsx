import RatingStyle from "@components/elements/RatingStyle";
import { Question } from "@framework/types/question";
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

type Data = Review | Question;

interface Props {
    data: Data[];
    type: "review" | "question";
}

const Customer: FC<Props> = ({ data, type }) => {
    const itemsPerPage = 4;

    const [currentItems, setCurrentItems] = useState<Data[]>(data ?? []);
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
                        currentItems.map((item) => (
                            <CustomerContainer
                                animate={{
                                    opacity: [0, 1],
                                    transition: { ease: "easeIn" },
                                }}
                                key={item._id}
                            >
                                <div className="flex">
                                    <ReviewIdentification>
                                        <div>
                                            <span>
                                                {item.name[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="capitalize">
                                                {item.name.split(" ")[0]}
                                            </span>
                                            <span>Verified Buyer</span>
                                        </div>
                                    </ReviewIdentification>
                                    {type === "review" && (
                                        <RatingStyle
                                            customSize="small"
                                            value={(item as Review).score}
                                        />
                                    )}
                                </div>
                                {type === "review" ? (
                                    <CustomerReviews review={item as Review} />
                                ) : (
                                    <CustomerQuestions
                                        question={item as Question}
                                    />
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
                            pageClassName="item-page-item"
                            pageLinkClassName="item-page-link"
                            previousClassName="item-page-item"
                            previousLinkClassName="item-page-link"
                            nextClassName="item-page-item"
                            nextLinkClassName="item-page-link"
                            breakClassName="item-page-item"
                            breakLinkClassName="item-page-link"
                            containerClassName="item-pagination"
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
