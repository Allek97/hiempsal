import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { Root } from "./Button.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    isLoading?: boolean;
    href?: string;
}

const Button: FC<Props> = ({
    children,
    Component = "button",
    isLoading = false,
    ...rest
}) => {
    return (
        <Root type="button" as={Component} isLoading={isLoading} {...rest}>
            {children}
        </Root>
    );
};

Button.defaultProps = {
    Component: "button",
    isLoading: false,
    href: "/",
};

export default Button;
