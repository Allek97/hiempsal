import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { Ripple } from "..";
import { Root } from "./Button.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    isLoading?: boolean;
    href?: string;
    color?: string;
    during?: number;
}

const Button: FC<Props> = ({
    children,
    Component = "button",
    isLoading = false,
    color = "var(--accents-2)",
    during = 2000,
    ...rest
}) => {
    return (
        <Ripple color={color} during={during} className="w-full">
            <Root type="button" as={Component} isLoading={isLoading} {...rest}>
                {children}
            </Root>
        </Ripple>
    );
};

// NOTE defaultProps soon to be depreciated
Button.defaultProps = {
    Component: "button",
    isLoading: false,
    href: "/",
    color: "var(--accents-2)",
    during: 2000,
};

export default Button;
