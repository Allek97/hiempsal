import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode[];
}

const Grid: FC<Props> = ({ children }) => {
    return <div>{children}</div>;
};

export default Grid;
