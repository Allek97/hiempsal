import { FC, ReactNode } from "react";
import { GridRoot } from "./Grid.styled";

interface Props {
    children: ReactNode | ReactNode[];
    layout?: "clothing" | "technology";
}

const Grid: FC<Props> = ({ children, layout = "clothing" }) => {
    return <GridRoot layout={layout}>{children}</GridRoot>;
};

Grid.defaultProps = {
    layout: "clothing",
};

export default Grid;
