import { FC } from "react";
import { motion } from "framer-motion";
import { VscCircleLargeFilled } from "react-icons/vsc";

import { ProductShipping } from "@framework/types/product";

import { Container, Header, Item } from "../commun";
import { ShipDetail } from "./Shipping.styled";

interface Props {
    shipping: ProductShipping;
}

const Shipping: FC<Props> = ({ shipping }) => {
    return (
        <Container>
            <Header title="Shipping Info" />
            <motion.ul
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                {Object.entries(shipping).map(([__, value]) => (
                    <Item
                        title={value.description}
                        content={value.content}
                        layout="D"
                        key={value.content}
                    >
                        {value.notice && (
                            <ShipDetail className="flex items-center">
                                <VscCircleLargeFilled
                                    className="mr-2 w-4 h-4"
                                    style={{ fill: "#4b9524" }}
                                />
                                {value.notice}
                            </ShipDetail>
                        )}
                    </Item>
                ))}
            </motion.ul>
        </Container>
    );
};

export default Shipping;
