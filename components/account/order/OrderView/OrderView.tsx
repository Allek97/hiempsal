/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { motion, Variants } from "framer-motion";
import dateFormat from "dateformat";
import { Account } from "@components/account/commun";
import { Order, OrderLineItem } from "@framework/types/order";
import { FC, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { FaTruckLoading, FaTruckMoving } from "react-icons/fa";
import getSymbolFromCurrency from "currency-symbol-map";

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

const placeholder = "product-image-placeholder.svg";

const OrderView: FC<Props> = ({ order }) => {
    const { openReview } = useUI();
    const [selectedProduct, setSelectedProduct] =
        useState<OrderLineItem | null>(null);

    const totalItems: number = useMemo(
        () => order.lineItems.reduce((prev, curr) => prev + curr.quantity, 0),
        [order]
    );

    const currency: string = useMemo(
        () =>
            order.currencyCode === "CAD"
                ? "C" + getSymbolFromCurrency(order.currencyCode)
                : order.currencyCode +
                  getSymbolFromCurrency(order.currencyCode),
        [order.currencyCode]
    );

    return (
        <>
            {selectedProduct && (
                <OrderReview
                    productId={selectedProduct.productId}
                    productImage={selectedProduct.variant?.image!}
                    productName={selectedProduct.name}
                    productPrice={selectedProduct.price}
                />
            )}
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

                    <h2>
                        {order.fulfillmentStatus === "FULFILLED"
                            ? "Your full order has arrived"
                            : "You order is being fulfilled"}
                    </h2>
                    <Content>
                        {order.lineItems.map((orderItem, idx) => {
                            const estimatedDeliveryDate: string =
                                order.processedAt
                                    ? dateFormat(
                                          new Date(order.processedAt).setDate(
                                              new Date(
                                                  order.processedAt
                                              ).getDate() + 14
                                          ),
                                          "ddd, mmmm dS"
                                      )
                                    : "T.B.D";

                            return (
                                <Package
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={`${orderItem.variant?.image?.url},${idx}`}
                                >
                                    <div className="mb-4">
                                        <h3 className="mb-2">
                                            Package {idx + 1}
                                        </h3>
                                        <span
                                            className="block mb-2"
                                            style={{
                                                color:
                                                    order.fulfillmentStatus ===
                                                    "FULFILLED"
                                                        ? "var(--green)"
                                                        : "orange",
                                            }}
                                        >
                                            {order.fulfillmentStatus ===
                                            "FULFILLED"
                                                ? "Delivered"
                                                : "On Delivery"}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="mb-2">
                                                Processed on:
                                            </span>
                                            <span className="mb-2 uppercase font-bold">
                                                {dateFormat(
                                                    order.processedAt ??
                                                        Date.now(),
                                                    "ddd, mmmm dS"
                                                )}
                                            </span>
                                            {order.fulfillmentStatus !==
                                                "FULFILLED" && (
                                                <span className="mb-2">
                                                    Estimated delivery:
                                                </span>
                                            )}
                                            {order.fulfillmentStatus !==
                                                "FULFILLED" && (
                                                <span className="uppercase font-bold">
                                                    {estimatedDeliveryDate}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <PackageContent>
                                        <div>
                                            <div className="relative h-28 w-28 mr-5 bg-accents-4">
                                                <Link
                                                    href={`/products/${orderItem.productSlug}`}
                                                    passHref
                                                >
                                                    <FunctionalLink>
                                                        <Image
                                                            placeholder="blur"
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
                                                                "package order"
                                                            }
                                                            layout="fill"
                                                            objectFit="contain"
                                                            priority
                                                        />
                                                    </FunctionalLink>
                                                </Link>
                                                <QuantityIndicator>
                                                    {orderItem.quantity}
                                                </QuantityIndicator>
                                            </div>
                                            <motion.button
                                                className="flex items-center mt-auto w-max p-0.5 underline"
                                                type="button"
                                                whileHover="hover"
                                                variants={textMotion}
                                                onClick={() => {
                                                    setSelectedProduct(
                                                        orderItem
                                                    );
                                                    openReview();
                                                }}
                                            >
                                                <IoMdChatbubbles className="mr-1.5" />
                                                Write a review
                                            </motion.button>
                                        </div>
                                        <div>
                                            <Link href="/" passHref>
                                                <FunctionalLink>
                                                    <motion.h2
                                                        className="mb-3.5 text-accents-9 uppercase tracking-normal"
                                                        style={{
                                                            transformOrigin:
                                                                "bottom center",
                                                        }}
                                                        whileHover={{
                                                            skewX: "-10deg",
                                                        }}
                                                    >
                                                        {orderItem.name}
                                                    </motion.h2>
                                                </FunctionalLink>
                                            </Link>

                                            {orderItem.variant?.options.map(
                                                (option) => (
                                                    <span
                                                        className="mb-0.5"
                                                        key={`${option.values[0].label}
                                                                ,${orderItem.variant?.image?.url}`}
                                                    >
                                                        {option.values[0].label}
                                                    </span>
                                                )
                                            )}

                                            <span className="mb-1">
                                                {currency}{" "}
                                                {orderItem.price.value.toFixed(
                                                    2
                                                )}
                                            </span>
                                            <span className="italic">
                                                This item cannot be returned or
                                                exchanged
                                            </span>
                                        </div>
                                    </PackageContent>
                                </Package>
                            );
                        })}
                        <OrderDetails>
                            <DetailBloc className="w-full">
                                <h2 className="font-bold uppercase mb-2">
                                    Details
                                </h2>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <p>Order</p>
                                        <span>{order.orderName}</span>
                                        <span>
                                            {dateFormat(
                                                order.processedAt ?? Date.now(),
                                                "isoDate"
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p>Carrier</p>
                                        {order.successfulFulfillments
                                            ?.trackingCompany ? (
                                            <>
                                                <span className="flex items-center capitalize">
                                                    <FaTruckMoving
                                                        className="mr-2"
                                                        style={{
                                                            fill: "var(--accents-7)",
                                                        }}
                                                    />
                                                    {order
                                                        .successfulFulfillments
                                                        ?.trackingCompany ??
                                                        "To be determined soon"}
                                                </span>
                                                <span>Standard Delivery</span>
                                                <span>
                                                    Tracking Number:{" "}
                                                    {order
                                                        .successfulFulfillments
                                                        ?.trackingNumber ??
                                                        "Not Issued Yet"}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="flex items-center capitalize">
                                                <FaTruckLoading
                                                    className="mr-2"
                                                    style={{
                                                        fill: "var(--accents-7)",
                                                    }}
                                                />
                                                {order.successfulFulfillments
                                                    ?.trackingCompany ??
                                                    "To be determined soon"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </DetailBloc>
                        </OrderDetails>
                        <OrderDetails>
                            <DetailBloc>
                                <h2 className="font-bold uppercase mb-2">
                                    Address
                                </h2>
                                <span>{order.shippingAddress?.name}</span>
                                <span>{order.shippingAddress?.address1}</span>
                                <span>
                                    {order.shippingAddress?.formattedArea},{" "}
                                    {order.shippingAddress?.zip}
                                </span>
                                <span>{order.shippingAddress?.phone}</span>
                                <span>{order.email}</span>
                            </DetailBloc>
                        </OrderDetails>
                        <OrderDetails className="border-b-0 md:(w-2/3 max-w-lg)">
                            <DetailBloc className="w-full">
                                <h2 className="font-bold uppercase mb-2">
                                    Order
                                </h2>
                                <div>
                                    <span>{totalItems} items</span>
                                    <span>
                                        {currency}{" "}
                                        {order.totalPrice.value.toFixed(2)}
                                    </span>
                                </div>
                                <div>
                                    <span>Subtotal (before taxes)</span>

                                    <span>
                                        {order.subtotalPrice &&
                                            order.subtotalPrice.value > 0 &&
                                            currency}{" "}
                                        {order.subtotalPrice &&
                                        order.subtotalPrice?.value > 0
                                            ? order.subtotalPrice?.value.toFixed(
                                                  2
                                              )
                                            : "Free"}
                                    </span>
                                </div>
                                <div>
                                    <span>Discounts</span>
                                    <span>No discounts</span>
                                </div>
                                <div>
                                    <span>Delivery</span>
                                    <span>
                                        {order.shippingPrice &&
                                            order.shippingPrice.value > 0 &&
                                            currency}{" "}
                                        {order.shippingPrice &&
                                        order.shippingPrice?.value > 0
                                            ? order.shippingPrice?.value.toFixed(
                                                  2
                                              )
                                            : "Free"}
                                    </span>
                                </div>
                                <div>
                                    <span>Sales tax</span>
                                    <span>
                                        {order.totalTax &&
                                            order.totalTax.value > 0 &&
                                            currency}{" "}
                                        {order.totalTax &&
                                        order.totalTax?.value > 0
                                            ? order.totalTax?.value.toFixed(2)
                                            : "Free"}
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <p>Amount</p>
                                    <span>
                                        {currency}{" "}
                                        {order.totalPrice.value.toFixed(2)}
                                    </span>
                                </div>
                            </DetailBloc>
                        </OrderDetails>
                        <div>
                            <span className="mr-2 leading-normal">
                                For more details about your order see:
                            </span>
                            <motion.a
                                className="p-0.5 underline"
                                href={order.statusUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover="hover"
                                variants={textMotion}
                            >
                                Order status
                            </motion.a>
                        </div>
                        {order.successfulFulfillments?.trackingUrl && (
                            <div>
                                <span className="mr-2 leading-normal">
                                    Looking for your package?
                                </span>
                                <motion.a
                                    className="p-0.5 underline"
                                    href={
                                        order.successfulFulfillments
                                            ?.trackingUrl
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover="hover"
                                    variants={textMotion}
                                >
                                    Track it
                                </motion.a>
                            </div>
                        )}
                    </Content>
                </Container>
            </Account>
        </>
    );
};

export default OrderView;
