import { FC, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { BiReset } from "react-icons/bi";

import { ProductDimensions } from "@framework/types/product";

import { Container, Header } from "../commun";
import {
    Body,
    Box,
    ControllerBtn,
    Head,
    Table,
    TH,
    TR,
} from "./Dimensions.styled";

interface Props {
    dimensions: ProductDimensions;
}

const Dimensions: FC<Props> = ({ dimensions }) => {
    const [isDragged, setIsDragged] = useState(false);

    const x = useMotionValue(0);

    const ref = useRef(null);

    useEffect(() => {
        x.onChange((latest) => {
            if (latest < -15) setIsDragged(true);
            else setIsDragged(false);
        });
    }, [x]);

    return (
        <Container>
            <Header title="Dimensions" withBorder={false} />
            <div className="flex flex-col">
                <div className="w-full pr-4 mb-2 flex items-center justify-end">
                    <ControllerBtn
                        type="button"
                        style={
                            isDragged ? { color: "black" } : { color: "grey" }
                        }
                        onClick={() => x.set(0)}
                    >
                        <BiReset />
                    </ControllerBtn>
                </div>
                <Box
                    className="block w-full h-full"
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                >
                    <Table>
                        <Head $isDragged={isDragged}>
                            <TR>
                                {Object.entries(dimensions).map(
                                    ([__, value]) => (
                                        <TH
                                            key={value.description}
                                            style={{ backgroundColor: "white" }}
                                        >
                                            <span>{value.description}</span>
                                        </TH>
                                    )
                                )}
                            </TR>
                        </Head>
                        <Body ref={ref}>
                            <motion.div
                                drag="x"
                                dragConstraints={ref}
                                dragElastic={0}
                                className="flex flex-col"
                                id="dimensions-drag"
                                style={{ x }}
                            >
                                {Object.entries(dimensions).map(
                                    ([__, value]) => (
                                        <TR
                                            key={value.description}
                                            className="flex"
                                        >
                                            {value.content.map((el) => (
                                                <TH key={el}>
                                                    <div className="w-full">
                                                        {el}
                                                    </div>
                                                </TH>
                                            ))}
                                        </TR>
                                    )
                                )}
                                {/* {Array.from(Array(24).keys()).map((el) => (
                                    <>
                                        <TR key={el}>
                                            <TH>
                                                <div className="w-full">L</div>
                                            </TH>
                                        </TR>
                                        <TR key={el}>
                                            <TH>
                                                <div className="w-full">
                                                    72.4 cm
                                                </div>
                                            </TH>
                                        </TR>
                                    </>
                                ))}  */}
                            </motion.div>
                        </Body>
                    </Table>
                </Box>
            </div>
        </Container>
    );
};

export default Dimensions;
