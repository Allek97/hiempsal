/* eslint-disable react/jsx-no-useless-fragment */
import { FC, ReactNode } from "react";
import Ticker from "react-ticker";
import { Container, Root } from "./Marquee.styled";

interface Props {
    children: ReactNode | ReactNode[];
    direction?: "toLeft" | "toRight";
    variant?: "clothing" | "technology";
}

const Marquee: FC<Props> = ({
    children,
    direction = "toLeft",
    variant = "clothing",
}) => {
    return (
        <Root variant={variant}>
            <Ticker speed={5} direction={direction}>
                {() => <Container>{children}</Container>}
            </Ticker>
        </Root>
    );
};

Marquee.defaultProps = {
    direction: "toLeft",
    variant: "clothing",
};

export default Marquee;
