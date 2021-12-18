import { FC, ReactNode } from "react";
import { RootGrid } from "./Grid.styled";

interface Props {
    children: ReactNode | ReactNode[];
    layout?: "A" | "B";
}

const Grid: FC<Props> = ({ children, layout = "A" }) => {
    return <RootGrid layout={layout}>{children}</RootGrid>;
};

Grid.defaultProps = {
    layout: "A",
};

export default Grid;
