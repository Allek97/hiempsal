import { FunctionalLink } from "@components/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { FC } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

import { Account } from "../commun";
import {
    Container,
    BrowsingBtn,
    DecorationOneBottom,
    DecorationOneTop,
    DecorationTwoBottom,
    DecorationTwoTop,
    RootEmpty,
} from "./Overview.styled";

const Overview: FC = () => {
    return (
        <Account>
            <Container>
                <RootEmpty>
                    <DecorationOneTop />
                    <DecorationOneBottom />
                    <DecorationTwoTop />
                    <DecorationTwoBottom />

                    <h2>
                        Welcome back. You have no orders yet, search for
                        <Link href="/" passHref>
                            <FunctionalLink>
                                <BrowsingBtn>
                                    <motion.span
                                        whileHover={{
                                            color: "black",
                                        }}
                                    >
                                        <HiArrowNarrowRight />
                                        inspiration
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
