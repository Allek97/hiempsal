import { ComponentType, FC, HTMLAttributes, ReactNode } from "react";

interface Props {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line react/require-default-props
    el?: ComponentType<HTMLAttributes<HTMLElement>>;
}

const Container: FC<Props> = ({ children, el: Component = "div" }) => {
    return <Component className="mx-auto max-w-8xl">{children}</Component>;
};

export default Container;
