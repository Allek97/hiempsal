import { FC } from "react";
import { motion, Variants } from "framer-motion";

import Close from "@components/icons/Close";

import { useProductInfo } from "@components/product/context";

import { CloseBtn, Feature, Root, Title } from "./Features.styled";

const Features: FC = () => {
    const { closeProductInformation, isProductOverviewOpen } = useProductInfo();

    const featureMotion: Variants = {
        hidden: { height: 0 },
        visible: { height: "auto", transition: { duration: 0.5 } },
        exit: {
            height: 0,
            overflowY: "hidden",
            transition: { duration: isProductOverviewOpen ? 0.4 : 0 },
        },
    };

    return (
        <Root
            initial="hidden"
            animate="visible"
            variants={featureMotion}
            exit="exit"
            key="features"
        >
            <motion.ul
                className="block w-full h-full overflow-y-auto"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                <Title>
                    <h1>Features</h1>
                    <CloseBtn
                        type="button"
                        onClick={() => {
                            closeProductInformation();
                        }}
                    >
                        <Close />
                    </CloseBtn>
                </Title>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque suscipit, illum aliquam vero ipsam commodi
                        veritatis officia est incidunt sunt, dignissimos tempore
                        tempora nemo blanditiis voluptatum deserunt perspiciatis
                        magnam nisi?
                    </span>
                </Feature>
                <Feature>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque suscipit, illum aliquam vero ipsam commodi
                        veritatis officia est incidunt sunt, dignissimos tempore
                        tempora nemo blanditiis voluptatum deserunt perspiciatis
                        magnam nisi?
                    </span>
                </Feature>
                <Feature>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque suscipit, illum aliquam vero ipsam commodi
                        veritatis officia est incidunt sunt, dignissimos tempore
                        tempora nemo blanditiis voluptatum deserunt perspiciatis
                        magnam nisi?
                    </span>
                </Feature>
                <Feature>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque suscipit, illum aliquam vero ipsam commodi
                        veritatis officia est incidunt sunt, dignissimos tempore
                        tempora nemo blanditiis voluptatum deserunt perspiciatis
                        magnam nisi?
                    </span>
                </Feature>
            </motion.ul>
        </Root>
    );
};

export default Features;
