import { motion, Variants } from "framer-motion";
import { Account } from "@components/account/commun";
import { Order } from "@framework/types/order";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";

import { FunctionalLink } from "@components/utils";

import {
    BackBtn,
    Container,
    Content,
    Package,
    PackageContent,
} from "./OrderView.styled";
import { QuantityIndicator } from "../../commun/Commun.styled";
import { OrderReview } from "../OrderReview";

interface Props {
    order: Order;
}

const textMotion: Variants = {
    hover: {
        fill: "white",
        backgroundColor: "black",
        color: "white",
        transition: {
            ease: "easeOut",
            duration: 2,
        },
    },
};

const OrderView: FC<Props> = ({ order }) => {
    return (
        <>
            <OrderReview />
            <Account>
                <Container>
                    <Link href="/account/orders" passHref>
                        <FunctionalLink>
                            <BackBtn
                                type="button"
                                whileHover="hover"
                                variants={textMotion}
                            >
                                <MdOutlineSubdirectoryArrowLeft />
                                <span className="border-b border-black leading-3">
                                    Order history
                                </span>
                            </BackBtn>
                        </FunctionalLink>
                    </Link>

                    <h2>Your full order has arrived</h2>
                    <Content>
                        <Package>
                            <div className="mb-4">
                                <h3 className="mb-1.5">Package 1</h3>
                                <span
                                    className="block mb-1.5"
                                    style={{ color: "orange" }}
                                >
                                    On Delivery
                                </span>
                                <div className="flex flex-col">
                                    <span className="mb-1.5">
                                        Processed on:
                                    </span>
                                    <span className="mb-1.5 uppercase font-bold">
                                        THU, NOVEMBER 11
                                    </span>
                                    <span className="mb-1.5">
                                        Estimated delivery:
                                    </span>
                                    <span className="uppercase font-bold">
                                        T.B.D
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="mr-2">
                                    Looking for your package?
                                </span>
                                <motion.a
                                    className="p-0.5 underline"
                                    href="https://www.framer.com/docs/component/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover="hover"
                                    variants={textMotion}
                                >
                                    Track it
                                </motion.a>
                            </div>
                            <div>
                                <span className="mr-2">
                                    For more details about your order see:
                                </span>
                                <motion.a
                                    className="p-0.5 underline"
                                    href="https://www.framer.com/docs/component/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover="hover"
                                    variants={textMotion}
                                >
                                    Order status
                                </motion.a>
                            </div>
                            <PackageContent>
                                <div>
                                    <div className="relative h-28 w-28 mr-5 bg-accents-4">
                                        <Image
                                            src="/images/Men-Hoodie-Black-Front.png"
                                            alt="hoodie"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                        <QuantityIndicator>3</QuantityIndicator>
                                    </div>
                                    <motion.button
                                        className="flex items-center mt-2.5 w-max mb-auto p-0.5 underline"
                                        type="button"
                                        whileHover="hover"
                                        variants={textMotion}
                                    >
                                        <IoMdChatbubbles className="mr-1.5" />
                                        Write a review
                                    </motion.button>
                                </div>
                                <div>
                                    <h2 className="mb-3.5 text-accents-9 uppercase">
                                        Essentials 3-stripes tricot track top
                                    </h2>
                                    <span className="mb-0.5">#1003</span>
                                    <span className="mb-0.5">
                                        Black / White
                                    </span>
                                    <span className="mb-0.5">M (Men)</span>
                                    <span className="mb-1">$C 100.90</span>
                                    <span className="italic">
                                        This item cannot be returned or
                                        exchanged
                                    </span>
                                </div>
                            </PackageContent>
                        </Package>

                        <Package>
                            <div className="mb-4">
                                <h3 className="mb-1.5">Package 1</h3>
                                <span
                                    className="block mb-1.5"
                                    style={{ color: "orange" }}
                                >
                                    On Delivery
                                </span>
                                <div className="flex flex-col">
                                    <span className="mb-1.5">
                                        Processed on:
                                    </span>
                                    <span className="mb-1.5 uppercase font-bold">
                                        THU, NOVEMBER 11
                                    </span>
                                    <span className="mb-1.5">
                                        Estimated delivery:
                                    </span>
                                    <span className="uppercase font-bold">
                                        T.B.D
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="mr-2">
                                    Looking for your package?
                                </span>
                                <motion.a
                                    className="p-0.5 underline"
                                    href="https://www.framer.com/docs/component/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover="hover"
                                    variants={textMotion}
                                >
                                    Track it
                                </motion.a>
                            </div>
                            <div>
                                <span className="mr-2">
                                    For more details about your order see:
                                </span>
                                <motion.a
                                    className="p-0.5 underline"
                                    href="https://www.framer.com/docs/component/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover="hover"
                                    variants={textMotion}
                                >
                                    Order status
                                </motion.a>
                            </div>
                            <PackageContent>
                                <div>
                                    <div className="relative h-28 w-28 mr-5 bg-accents-4">
                                        <Image
                                            src="/images/iphone.png"
                                            alt="hoodie"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                        <QuantityIndicator>3</QuantityIndicator>
                                    </div>
                                    <motion.button
                                        className="flex items-center mt-2.5 w-max mb-auto p-0.5 underline"
                                        type="button"
                                        whileHover="hover"
                                        variants={textMotion}
                                    >
                                        <IoMdChatbubbles className="mr-1.5" />
                                        Write a review
                                    </motion.button>
                                </div>
                                <div>
                                    <h2 className="mb-3.5 text-accents-9 uppercase">
                                        Essentials 3-stripes tricot track top
                                    </h2>
                                    <span className="mb-0.5">#1003</span>
                                    <span className="mb-0.5">
                                        Black / White
                                    </span>
                                    <span className="mb-0.5">M (Men)</span>
                                    <span className="mb-1">$C 100.90</span>
                                    <span className="italic">
                                        This item cannot be returned or
                                        exchanged
                                    </span>
                                </div>
                            </PackageContent>
                        </Package>
                    </Content>
                </Container>
            </Account>
        </>
    );
};

export default OrderView;
