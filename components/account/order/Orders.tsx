import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiTwotoneFire } from "react-icons/ai";
import { SiOpennebula } from "react-icons/si";

import useCustomer from "@framework/customer/use-customer";
import { FunctionalLink } from "@components/utils";
import { getShopifyId } from "@lib/getShopifyId";

import { Account } from "../commun";
import { BrowsingBtn, QuantityIndicator } from "../commun/Commun.styled";

import {
    ContainerEmpty,
    OrderContainer,
    RootEmpty,
    OrderBox,
    OrderImageContainer,
    DetailBtnWrapper,
    DetailBtn,
    OrderContent,
    DecorationOneBottom,
    DecorationOneTop,
    DecorationTwoTop,
    DecorationTwoBottom,
} from "./Orders.styled";

const Orders: FC = () => {
    const dataSwr = useCustomer();
    const { data: customer } = dataSwr;

    return (
        <Account>
            {customer && customer.orders && customer.orders.length > 0 ? (
                <OrderContainer>
                    <h2>Order History</h2>
                    <OrderBox>
                        <div className="hidden sm:block">
                            <DecorationOneTop className="mt-5 lg:mt-6" />
                            <DecorationOneBottom className="mt-5 lg:mt-6" />
                        </div>
                        <div>
                            <h3>YOUR ORDER: ACA07897266</h3>
                            <span>November 8, 2021 | C$ 164.18 | 3 items</span>
                            <OrderContent>
                                <div>
                                    <OrderImageContainer>
                                        <QuantityIndicator>
                                            <span>3</span>
                                        </QuantityIndicator>
                                        <Image
                                            src="/images/macbook-pro-5.png"
                                            alt="order"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </OrderImageContainer>
                                    <OrderImageContainer>
                                        <QuantityIndicator>
                                            <span>2</span>
                                        </QuantityIndicator>
                                        <Image
                                            src="/images/Men-Hoodie-White-Front.png"
                                            alt="order"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </OrderImageContainer>
                                    <OrderImageContainer>
                                        <QuantityIndicator>
                                            <span>5</span>
                                        </QuantityIndicator>
                                        <Image
                                            src="/images/iphone.png"
                                            alt="order"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </OrderImageContainer>
                                </div>
                                <DetailBtnWrapper>
                                    <Link
                                        href={`/account/orders/${getShopifyId(
                                            customer.orders[0].id
                                        )}`}
                                        passHref
                                    >
                                        <FunctionalLink>
                                            <DetailBtn>
                                                <span className="mr-2">
                                                    View Details
                                                </span>
                                                <SiOpennebula />
                                            </DetailBtn>
                                        </FunctionalLink>
                                    </Link>
                                </DetailBtnWrapper>
                            </OrderContent>
                        </div>
                    </OrderBox>
                </OrderContainer>
            ) : (
                <ContainerEmpty>
                    <DecorationOneTop />
                    <DecorationOneBottom />
                    <DecorationTwoTop />
                    <DecorationTwoBottom />

                    <RootEmpty>
                        <h2>
                            No orders yet. Look for inspiration <br />
                            <Link href="/" passHref>
                                <FunctionalLink>
                                    <BrowsingBtn>
                                        <motion.span
                                            whileHover={{
                                                color: "black",
                                            }}
                                        >
                                            <AiTwotoneFire />
                                            <h1>discover our boutique</h1>
                                        </motion.span>
                                    </BrowsingBtn>
                                </FunctionalLink>
                            </Link>
                        </h2>
                    </RootEmpty>
                </ContainerEmpty>
            )}

            {/* <Userlist products={products} variant="order" /> */}
        </Account>
    );
};

export default Orders;
