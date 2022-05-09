import { FC } from "react";
import { motion, Variants } from "framer-motion";

import { useProductInfo } from "@components/product/context";

import { Root } from "./Features.styled";
import { Header, Item } from "../commun";

const Features: FC = () => {
    const { isProductOverviewOpen } = useProductInfo();

    const featureMotion: Variants = {
        hidden: { height: 0 },
        visible: { height: "auto", transition: { duration: 0.4, delay: 0.1 } },
        exit: {
            height: 0,
            overflowY: "hidden",
            transition: { duration: isProductOverviewOpen ? 0.3 : 0 },
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
                <Header title="Features" />

                {[0, 1, 2, 3, 4].map((el) => (
                    <Item
                        title="Item number"
                        content={`213123-${el}`}
                        key={el}
                    />
                ))}
                {[0, 1].map((el) => (
                    <Item
                        title="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque suscipit, illum aliquam vero ipsam commodi
                    veritatis officia est incidunt sunt, dignissimos tempore
                    tempora nemo blanditiis voluptatum deserunt perspiciatis
                    magnam nisi?"
                        key={el}
                    />
                ))}
            </motion.ul>
        </Root>
    );
};

export default Features;
