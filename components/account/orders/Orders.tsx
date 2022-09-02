import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiTwotoneFire } from "react-icons/ai";
import { SiOpennebula } from "react-icons/si";

import useCustomer from "@framework/customer/use-customer";
import { FunctionalLink } from "@components/utils";

import { Account } from "../commun";
import { BrowsingBtn } from "../commun/Commun.styled";

import {
    ContainerEmpty,
    OrderContainer,
    RootEmpty,
    OrderBox,
    OrderImageContainer,
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
            {customer!.orders && customer!.orders.length > 0 ? (
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
                                        <Image
                                            src="/images/amazigh-art.jpg"
                                            alt="order"
                                            layout="fill"
                                        />
                                    </OrderImageContainer>
                                    <OrderImageContainer>
                                        <Image
                                            src="/images/amazigh-art-2.jpg"
                                            alt="order"
                                            layout="fill"
                                        />
                                    </OrderImageContainer>
                                    <OrderImageContainer>
                                        <Image
                                            src="/images/amazigh-art-3.jpg"
                                            alt="order"
                                            layout="fill"
                                        />
                                    </OrderImageContainer>
                                </div>
                                <DetailBtn>
                                    <span className="mr-2">View Details</span>
                                    <SiOpennebula />
                                </DetailBtn>
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
