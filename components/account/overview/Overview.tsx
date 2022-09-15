import { FunctionalLink } from "@components/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { FC, useMemo } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import useCustomer from "@framework/customer/use-customer";
import { setTextPlural } from "@lib/setTextPlural";

import { Account } from "../commun";
import { Container, RootEmpty } from "./Overview.styled";
import {
    BrowsingBtn,
    DecorationOneBottom,
    DecorationOneTop,
    DecorationTwoBottom,
    DecorationTwoTop,
} from "../commun/Commun.styled";

const Overview: FC = () => {
    const dataSwr = useCustomer();
    const { data: customer } = dataSwr;

    const nbPendingOrders: number = useMemo(() => {
        if (!customer || !customer.orders) return 0;
        return customer.orders.filter(
            (order) => order.fulfillmentStatus !== "FULFILLED"
        ).length;
    }, [customer]);

    return (
        <Account>
            <Container>
                <RootEmpty>
                    <DecorationOneTop />
                    <DecorationOneBottom />
                    <DecorationTwoTop />
                    <DecorationTwoBottom />

                    <h2>
                        Welcome back. You have
                        {nbPendingOrders > 0
                            ? ` ${nbPendingOrders} pending ${setTextPlural(
                                  "order",
                                  nbPendingOrders
                              )}`
                            : " no orders yet, search for"}
                        <Link
                            href={nbPendingOrders > 0 ? "/account/orders" : "/"}
                            passHref
                        >
                            <FunctionalLink>
                                <BrowsingBtn>
                                    <motion.span
                                        whileHover={{
                                            color: "black",
                                        }}
                                    >
                                        <HiArrowNarrowRight />
                                        {nbPendingOrders > 0
                                            ? "see orders"
                                            : "inspiration"}
                                    </motion.span>
                                </BrowsingBtn>
                            </FunctionalLink>
                        </Link>
                    </h2>
                </RootEmpty>
            </Container>
        </Account>
    );
};

export default Overview;
