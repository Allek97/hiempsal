import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiTwotoneFire } from "react-icons/ai";
import { SiOpennebula } from "react-icons/si";
import getSymbolFromCurrency from "currency-symbol-map";
import dateFormat from "dateformat";
import { setTextPlural } from "@lib/setTextPlural";

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

const placeholder = "product-image-placeholder.svg";

const Orders: FC = () => {
    const dataSwr = useCustomer();
    const { data: customer } = dataSwr;

    return (
        <Account>
            {customer && customer.orders && customer.orders.length > 0 ? (
                <OrderContainer>
                    <h2>Order History</h2>
                    {customer.orders.map((order) => {
                        const currency: string =
                            order.currencyCode === "CAD"
                                ? "C" +
                                  getSymbolFromCurrency(order.currencyCode)
                                : order.currencyCode +
                                  getSymbolFromCurrency(order.currencyCode);
                        const totalItems: number = order.lineItems.reduce(
                            (prev, curr) => prev + curr.quantity,
                            0
                        );
                        return (
                            <OrderBox key={order.id}>
                                <div className="hidden sm:block">
                                    <DecorationOneTop className="mt-5 lg:mt-6" />
                                    <DecorationOneBottom className="mt-5 lg:mt-6" />
                                </div>

                                <div>
                                    <h3>YOUR ORDER: {order.orderName}</h3>
                                    <span>
                                        {dateFormat(
                                            order.processedAt ?? Date.now(),
                                            "longDate"
                                        )}{" "}
                                        | {currency}{" "}
                                        {order.totalPrice.value.toFixed(2)} |{" "}
                                        {totalItems}{" "}
                                        {setTextPlural(
                                            "item",
                                            order.lineItems.length
                                        )}
                                    </span>
                                    <OrderContent>
                                        <div>
                                            {order.lineItems.map(
                                                (orderItem, idx) => (
                                                    <OrderImageContainer
                                                        key={
                                                            orderItem.variant
                                                                ?.id ?? idx
                                                        }
                                                    >
                                                        <QuantityIndicator>
                                                            <span>
                                                                {
                                                                    orderItem.quantity
                                                                }
                                                            </span>
                                                        </QuantityIndicator>
                                                        <Image
                                                            src={
                                                                orderItem
                                                                    .variant
                                                                    ?.image
                                                                    ?.url ??
                                                                placeholder
                                                            }
                                                            alt={
                                                                orderItem
                                                                    .variant
                                                                    ?.image
                                                                    ?.alt ??
                                                                "order variant"
                                                            }
                                                            layout="fill"
                                                            objectFit="contain"
                                                            quality={100}
                                                        />
                                                    </OrderImageContainer>
                                                )
                                            )}
                                        </div>
                                        <DetailBtnWrapper>
                                            <Link
                                                href={`/account/orders/${getShopifyId(
                                                    order.id
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
                        );
                    })}
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
