import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";

import { Container, Header } from "../commun";
import { Body, Box, Head, Table, TH, TR } from "./Dimensions.styled";

const Dimensions: FC = () => {
    const [isDrag, setIsDrag] = useState(false);

    const ref = useRef(null);
    return (
        <Container>
            <Header title="Dimensions" withBorder={false} />
            <Box
                className="block w-full h-full"
                exit={{ opacity: 0, transition: { duration: 0 } }}
            >
                <Table>
                    <Head animate={isDrag && { scale: 1.2 }}>
                        <TR style={{ backgroundColor: "white" }}>
                            <TH>
                                <span>Size</span>
                            </TH>
                            <TH>
                                <span>Back length</span>
                            </TH>
                        </TR>
                    </Head>
                    <Body
                        ref={ref}
                        dragDirectionLock
                        onDirectionLock={(axis) => console.log(axis)}
                    >
                        <motion.div
                            drag="x"
                            dragConstraints={ref}
                            dragElastic={0}
                            className="flex"
                            dragDirectionLock
                            onDirectionLock={(axis) => console.log(axis)}
                        >
                            {Array.from(Array(24).keys()).map((el) => (
                                <TR key={el}>
                                    <TH>
                                        <div className="w-full">{el}</div>
                                    </TH>
                                    <TH>
                                        <div className="w-full">{el}</div>
                                    </TH>
                                </TR>
                            ))}
                        </motion.div>
                    </Body>
                </Table>
            </Box>
        </Container>
    );
};

export default Dimensions;
