import { motion, Variants } from "framer-motion";
import { Account } from "@components/account/commun";
import { Order } from "@framework/types/order";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { RiTruckFill } from "react-icons/ri";

import { FunctionalLink } from "@components/utils";
import { useUI } from "@components/ui/context";

import {
    BackBtn,
    Container,
    Content,
    DetailBloc,
    OrderDetails,
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
    const { openReview } = useUI();
    return (
        <>
            <OrderReview productId="gid://shopify/Product/7096221368509" />
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
                                <h3 className="mb-2">Package 1</h3>
                                <span
                                    className="block mb-2"
                                    style={{ color: "orange" }}
                                >
                                    On Delivery
                                </span>
                                <div className="flex flex-col">
                                    <span className="mb-2">Processed on:</span>
                                    <span className="mb-2 uppercase font-bold">
                                        THU, NOVEMBER 11
                                    </span>
                                    <span className="mb-2">
                                        Estimated delivery:
                                    </span>
                                    <span className="uppercase font-bold">
                                        T.B.D
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="mr-2 leading-normal">
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
                            <PackageContent>
                                <div>
                                    <div className="relative h-28 w-28 mr-5 bg-accents-4">
                                        <Link href="/" passHref>
                                            <FunctionalLink>
                                                <Image
                                                    src="/images/Men-Hoodie-Black-Front.png"
                                                    alt="hoodie"
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </FunctionalLink>
                                        </Link>
                                        <QuantityIndicator>3</QuantityIndicator>
                                    </div>
                                    <motion.button
                                        className="flex items-center mt-2.5 w-max mb-auto p-0.5 underline"
                                        type="button"
                                        whileHover="hover"
                                        variants={textMotion}
                                        onClick={() => openReview()}
                                    >
                                        <IoMdChatbubbles className="mr-1.5" />
                                        Write a review
                                    </motion.button>
                                </div>
                                <div>
                                    <Link href="/" passHref>
                                        <FunctionalLink>
                                            <motion.h2
                                                className="mb-3.5 text-accents-9 uppercase"
                                                style={{
                                                    transformOrigin:
                                                        "bottom center",
                                                }}
                                                whileHover={{
                                                    skewX: "-10deg",
                                                }}
                                            >
                                                Essentials 3-stripes tricot
                                                track top
                                            </motion.h2>
                                        </FunctionalLink>
                                    </Link>
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
                                <h3 className="mb-2">Package 2</h3>
                                <span
                                    className="block mb-2"
                                    style={{ color: "orange" }}
                                >
                                    On Delivery
                                </span>
                                <div className="flex flex-col">
                                    <span className="mb-2">Processed on:</span>
                                    <span className="mb-2 uppercase font-bold">
                                        THU, NOVEMBER 11
                                    </span>
                                    <span className="mb-2">
                                        Estimated delivery:
                                    </span>
                                    <span className="uppercase font-bold">
                                        T.B.D
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="mr-2 leading-normal">
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
                                        onClick={() => openReview()}
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
                        <OrderDetails>
                            <DetailBloc>
                                <h2 className="font-bold uppercase mb-2">
                                    Details
                                </h2>
                                <p>Order</p>
                                <span>#1001</span>
                                <span>2021-11-08</span>
                            </DetailBloc>
                            <DetailBloc>
                                <p>Carrier</p>
                                <span className="flex items-center">
                                    <RiTruckFill
                                        className="mr-2"
                                        style={{ fill: "var(--accents-7)" }}
                                    />
                                    DHL Express
                                </span>
                                <span>Standard Delivery</span>
                                <span>JJD01234234</span>
                            </DetailBloc>
                        </OrderDetails>
                        <OrderDetails>
                            <DetailBloc>
                                <h2 className="font-bold uppercase mb-2">
                                    Address
                                </h2>
                                <span>Allek Ilias</span>
                                <span>2190 rue de cologne</span>
                                <span>Montréal QC H3M 2W6, Canada</span>
                                <span>4389980902</span>
                                <span>iliasallek.aek@gmail.com</span>
                            </DetailBloc>
                        </OrderDetails>
                        <OrderDetails className="w-2/3 max-w-lg border-b-0">
                            <DetailBloc className="w-full">
                                <h2 className="font-bold uppercase mb-2">
                                    Order
                                </h2>
                                <div>
                                    <span>2 items</span>
                                    <span>C$ 168.00</span>
                                </div>
                                <div>
                                    <span>Subtotal (before taxes)</span>
                                    <span>C$ 168.00</span>
                                </div>
                                <div>
                                    <span>Delivery</span>
                                    <span>Free</span>
                                </div>
                                <div>
                                    <span>Sales tax</span>
                                    <span>C$ 168.00</span>
                                </div>
                                <div className="mt-3">
                                    <p>Amount</p>
                                    <span>C$ 168.00</span>
                                </div>
                            </DetailBloc>
                        </OrderDetails>
                        <div>
                            <span className="mr-2 leading-normal">
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
                    </Content>
                </Container>
            </Account>
        </>
    );
};

export default OrderView;
